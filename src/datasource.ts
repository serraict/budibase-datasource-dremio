import { IntegrationBase } from "@budibase/types"
//@ts-ignore
import Dremio from 'dremio-sdk'

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

  async read(query: { sql: string }) {
    const jobId = await this.executeQueryAndReturnJobId(query)
    console.log('Dremio SQL Job created with id:', jobId)
    const jobResult: any = await this.waitForJobToFinishAndGetJobResult(jobId)
    console.log('JobId:', jobId, 'Dremio Job result:', jobResult)
    return jobResult;
  }

  private async executeQueryAndReturnJobId(query: { sql: string }) {
    const sql = this.api.SQL()
    const jobData = await sql.query(query)
    const jobId = jobData.id
    return jobId
  }

  private async waitForJobToFinishAndGetJobResult(jobId: string) {
    const job_api = this.api.Job()

    // Array to store all retrieved jobs
    let lastJobStatus: any

    const polling_interval_ms = 250
    const timeout_ms = 30 * 1000

    // Wrap our polling logic in a new Promise
    const intervalPromise = new Promise<void>((resolve, reject) => {

      const intervalId = setInterval(async () => {
        const job = await job_api.findById(jobId)
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
}

export default CustomIntegration
