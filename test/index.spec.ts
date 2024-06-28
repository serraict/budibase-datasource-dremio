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
    let error: any
    try {
      await cb()
    } catch (err: any) {
      error = err.message
    }
    expect(error).not.toBeNull()
  }


  it("should run the create query", async () => {
    await catchError(() => {
      return integration.create({
        json: { a: 1 }
      })
    })
  })

  // it("should run the read query", async () => {
  //   const response = await integration.read({
  //     queryString: "select name from Examples.vendor_lookup"
  //   })
  //   console.log(response)
  // }, 15000)

  it("should run the update query", async () => {
    await catchError(() => {
      return integration.update({
        json: { a: 1 }
      })
    })
  })

  it("should run the delete query", async () => {
    await catchError(() => {
      return integration.delete({
        id: 1
      })
    })
  })


  // details
  let knownJobId = '1981844c-de96-38ba-7fbf-450c986b1e00'
  it("should retrieve the read job result", async () => {
    const response = await integration.waitForJobToFinishAndGetJobResult(knownJobId)
    expect(response.rowCount).toEqual(expect.any(Number))
    expect(response.rows).toBeInstanceOf(Array)
    expect(response.schema).toBeInstanceOf(Array)
  }, 15000)

  it("should start a sql query", async () => {
    let query = { sql: "select name from Examples.vendor_lookup" }
    const response = await integration.executeQueryAndReturnJobId(query)
    expect(response).toBeDefined()
  }, 15000)
})