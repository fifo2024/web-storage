import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// 使用 tsc 检查，通过后才会进行打包
const checkWorker = execSync('pnpm build', { stdio: 'inherit' });

// 升级 package.json
const packageJson = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
const { version } = packageJson;
const newVersion = version
    .split('.')
    .map((v, i) => (i === 2 ? parseInt(v) + 1 : v))
    .join('.');
packageJson.version = newVersion;
writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// git commit
// execSync("git add .", { stdio: "inherit" });
// execSync(`git commit -m "chore: upgrade version to ${newVersion}"`, {
//     stdio: "inherit",
// });

// npm 发布
execSync(`npm publish --registry http://127.0.0.1:4873 --access public`, {
    stdio: 'inherit',
});

/**
--registry 参数以防止本地替换过 npm 源
--no-git-checks 防止 npm 因为 git 仓库没有保存提交而报错
--access public：当包名使用组织前缀时，发布需要带上这个参
 */

// 上传 git
// execSync("git push", { stdio: "inherit" });
