import { spawnSync } from 'node:child_process'

const parallel = process.env.PARALLEL || '2'

const result = spawnSync(
  'npx',
  ['cucumber-js', '--config', 'cucumber.json', '--parallel', parallel],
  { stdio: 'inherit', shell: true }
)

process.exit(result.status ?? 1)