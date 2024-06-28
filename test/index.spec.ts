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

  it("should run the read query", async () => {
    const response = await integration.read({
      queryString: "select * from Examples.vendor_lookup"
    })
    expect(typeof response).toBe("string")
  }, 15000)

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
})