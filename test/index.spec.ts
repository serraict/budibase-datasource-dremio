import { default as DremioIntegration } from "../src"
import { describe, it, beforeAll, expect } from "@jest/globals"

// these test assume that we have a Dremio instance running with the following configuration:

describe("test the query types", () => {
  let cfg = {
    url: "http://127.0.0.1:9047",
    username: "bb", password: "budibase1",
    version: "3"
  }

  let integration: any
  beforeAll(() => {
    integration = new DremioIntegration.integration(cfg)
  })

  async function catchError(cb: any) {
    let error: any = null
    try {
      await cb()
    } catch (err: any) {
      error = err.message
    }
    expect(error).not.toBeNull()
  }

  const BUDIBASE_MAX_PLUGIN_EXECUTION_TIME = 15000  // I have read this somewhere, but i cannot recall where
  const TIMEOUT = BUDIBASE_MAX_PLUGIN_EXECUTION_TIME - 100


  it("should run the read query", async () => {
    const response = await integration.read({
      sql: "select name from Examples.vendor_lookup"
    })
    expect(response.rows).toBeInstanceOf(Array)
  }, TIMEOUT)

  // Internal working of the read query for Dremio
  // 1. Send query to dremio, which will start a job and return its id
  it("should start a sql query", async () => {
    let query = { sql: "select name from Examples.vendor_lookup" }
    const response = await integration.executeQueryAndReturnJobId(query)
    expect(response).toBeDefined()
  }, TIMEOUT)

  // 2. We can then poll the job to see if it has finished, and when it has, query the results
  let knownJobId = '197d8dd4-8c87-96b4-4b8c-38163f196d00'
  it("should retrieve the read job result", async () => {
    const response = await integration.waitForJobToFinishAndGetJobResult(knownJobId)
    expect(response.rowCount).toEqual(expect.any(Number))
    expect(response.rows).toBeInstanceOf(Array)
    expect(response.schema).toBeInstanceOf(Array)
  }, TIMEOUT)

})