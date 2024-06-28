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

  async create(query: { json: object }) {
    throw new Error("Only read operations are supported for now.");
  }

  async read(query: { sql: string }) {
    var jobId = await this.executeQueryAndReturnJobId(query)
    let jobResult: any = await this.waitForJobToFinishAndGetJobResult(jobId)
    return jobResult;
  }

  private async executeQueryAndReturnJobId(query: { sql: string }) {
    var sql = this.api.SQL()
    var jobData = await sql.query(query)
    var jobId = jobData.id
    return jobId
  }

  private async waitForJobToFinishAndGetJobResult(jobId: any) {
    if (typeof jobId !== 'string' || jobId === '' || jobId === undefined) {
      throw new Error('jobId must be a string, but is `' + typeof jobId + '` with value `' + jobId + '`.')
    }
    var job_api = this.api.Job()

    // Array to store all retrieved jobs
    let lastJobStatus: any

    var polling_interval_ms = 250
    var timeout_ms = 30 * 1000

    // Wrap our polling logic in a new Promise
    let intervalPromise = new Promise<void>((resolve, reject) => {

      let intervalId = setInterval(async () => {
        let job = await job_api.findById(jobId)
        lastJobStatus = job;
        if (job.jobState === "COMPLETED" || job.jobState === "CANCELED" || job.jobState === "FAILED") {
          clearInterval(intervalId)
          resolve()
        }
      }, polling_interval_ms)

      setTimeout(() => {
        clearInterval(intervalId)
        reject(new Error('Job timed out'))
      }, timeout_ms)
    })

    // Do errors (like timeouts) get thrown here?
    await intervalPromise

    let jobResult: any

    if (lastJobStatus.jobState === "COMPLETED") {
      jobResult = await job_api.findById(jobId, { "limit": 500, "offset": 0 })
    } else {
      throw new Error(`Job failed with status: ${lastJobStatus.jobState}`)
    }

    return jobResult
  }

  async update(query: { json: object }) {
    throw new Error("Only read operations are supported for now.");
  }

  async delete(query: { id: string }) {
    throw new Error("Only read operations are supported for now.");
  }
}

export default CustomIntegration
