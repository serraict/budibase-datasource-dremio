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
    var data = await sql.query(query);

    return { "query": query, "some": data };
  }

  async update(query: { json: object }) {
    throw new Error("Only read operations are supported for now.");
  }

  async delete(query: { id: string }) {
    throw new Error("Only read operations are supported for now.");
  }
}

export default CustomIntegration
