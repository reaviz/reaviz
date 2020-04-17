
const { parse } = require('semver');
const { execSync } = require('child_process');

(() => {
  const json = require('../package.json');
  const version = parse(json.version);
  const output = execSync(`yarn publish --access public --non-interactive --no-git-tag-version --new-version ${version} --tag latest`);

  console.info(`Published Prod /r/n -> ${output}`);
})();
