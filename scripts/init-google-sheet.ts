import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env') })

async function main() {
  const { initializeGoogleSheetHeaders } = await import('../src/lib/google-sheets')
  const result = await initializeGoogleSheetHeaders()
  console.log(result.message)
  process.exit(result.ok ? 0 : 1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
