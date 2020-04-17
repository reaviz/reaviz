
const { parse } = require('semver');
const { execSync } = require('child_process');

(() => {
  const json = require('../package.json');

  // determine commit from either circle ci or last git commit
  let commit = process.env.CIRCLE_SHA1;
  if (!commit) {
    const lastCommit = execSync('git rev-parse HEAD');
    commit = lastCommit.toString().trim();
  }

  // shorten commit
  commit = commit.slice(0, 7);

  // construct new version from base version 2.0.0 to become 2.0.0+dev.shortsha
  const version = parse(json.version);
  const newVersion = `${version.major}.${version.minor}.${version.patch}-dev.master-${commit}`;
  console.info('Publishing new version', newVersion);

  const output = execSync(`yarn publish --access public --non-interactive --no-git-tag-version --new-version ${newVersion} --tag dev`);
  console.info(`Published Dev /r/n -> ${output}`);
})();
