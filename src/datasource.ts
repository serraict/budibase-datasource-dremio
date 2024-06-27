import { IntegrationBase } from "@budibase/types"
import fetch from "node-fetch"
//@ts-ignore
import Dremio from 'dremio-sdk'

interface Query {
  method: string
  body?: string
  headers?: { [key: string]: string }
}

class CustomIntegration implements IntegrationBase {
  private readonly url: string
  private readonly username: string
  private readonly password: string
  private readonly version: string
  private readonly api: Dremio

  constructor(config: { url: string; username: string; password: string, version: string }) {
    this.url = config.url
    this.username = config.username
    this.password = config.password
    this.version = config.version
    this.api = new Dremio({
      origin: this.url,
      version: this.version,
      username: this.username,
      password: this.password
    })
  }

  async request(url: string, opts: Query) {
    throw new Error("Method not implemented.");
  }

  async create(query: { json: object }) {
    throw new Error("Only read operations are supported for now.");
  }
  async read(query: { queryString: string }) {
    var sql = this.api.SQL();
    var job_data = await sql.query(query);
    var job_id = job_data.id;

    var job_api = this.api.Job();

    // Array to store all retrieved jobs
    let jobsArray: any[] = [];

    var polling_interval_ms = 250;
    var timeout_ms = 30 * 1000;

    // Wrap our polling logic in a new Promise
    let intervalPromise = new Promise<void>((resolve, reject) => {

      let intervalId = setInterval(async () => {
        let job = await job_api.findById(job_id);
        jobsArray.push(job);
        if (job.jobState === "COMPLETED") {
          clearInterval(intervalId);
          resolve();
        }
      }, polling_interval_ms);

      setTimeout(() => {
        clearInterval(intervalId);
        console.log('Stopped retrieving after 30 seconds.');
        reject(new Error('Timed out'));
      }, timeout_ms);
    });

    try {
      await intervalPromise;
    } catch (error) {
      console.error(error);
    }

    return { "query": query, "data": jobsArray };
  }


  async update(query: { json: object }) {
    throw new Error("Only read operations are supported for now.");
  }

  async delete(query: { id: string }) {
    throw new Error("Only read operations are supported for now.");
  }
}

export default CustomIntegration
