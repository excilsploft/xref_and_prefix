const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {

  const buildFile = core.getInput('buildinfo');
  console.log('reading %s', buildFile);

  fs.readFile(buildFile, (err, jsonString) => {
    if (err) {
      console.log("Read file failed:", err);
      return 
    }
    try {
      const buildInfo = JSON.parse(jsonString);
      core.setOutput("pathprefix", buildInfo.pathPrefix);
      core.setOutput("xref", buildInfo.xRefs);
    } catch(err) {
      console.log("Error parsing JSON:", err);
    }
  })

} catch(error) {
  core.setFailed(error.message);
}

