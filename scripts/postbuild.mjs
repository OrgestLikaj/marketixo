/** Runs after `astro build`: static QA of dist/ (see check-site.mjs). */
import { spawnSync } from 'node:child_process';

const r = spawnSync(process.execPath, ['scripts/check-site.mjs', 'dist'], { stdio: 'inherit' });
process.exit(r.status ?? 1);
