import { generate } from 'multiple-cucumber-html-reporter'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const runFolder = path.join(__dirname, '..', 'reports', 'history', timestamp)
fs.mkdirSync(runFolder, { recursive: true })

generate({
  jsonDir: path.join(__dirname, '..', 'reports'),
  reportPath: runFolder,
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'CI Runner',
    platform: { name: process.platform, version: process.version },
  },
})

const historyDir = path.join(__dirname, '..', 'reports', 'history')
const allRuns = fs
  .readdirSync(historyDir)
  .filter((name) => fs.statSync(path.join(historyDir, name)).isDirectory())
  .sort()
  .reverse()

const indexHtml = `
<!DOCTYPE html>
<html>
<head><title>Test Report History</title></head>
<body>
  <h1>Test Report History (latest first)</h1>
  <ul>
    ${allRuns
      .map(
        (run, i) =>
          `<li><a href="history/${run}/index.html">${run}</a>${i === 0 ? ' — <strong>LATEST</strong>' : ''}</li>`
      )
      .join('\n    ')}
  </ul>
</body>
</html>
`

fs.writeFileSync(path.join(__dirname, '..', 'reports', 'index.html'), indexHtml)
console.log(`Report generated: reports/history/${timestamp}/index.html`)
console.log(`Full history list: reports/index.html`)