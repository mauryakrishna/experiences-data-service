/*
  This module was created as result of env2 not loading the env's in sync manner.
  It let the othe line to happen before the all the envs has been loaded.
*/

const fs = require('fs');

function get_JSON(path) {
  return JSON.parse(fs.readFileSync(path))
}

var loadenv = async function (path) {
  if (!path) { 
    console.error('Env file required, got', path);
  }

  console.log('loadenv', path);

  const env = get_JSON(path);
  console.log('env', env);

  await Object.keys(env).forEach(function (k) {
    if(!process.env[k]) { // allow enviroment to take precedence over env.json
      process.env[k] = env[k]; // only set if not set by environment
    }
  });    

}

module.exports = loadenv;