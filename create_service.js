const fs = require('fs');
const path = require('path');
var copydir = require('copy-dir');

const myArgs = process.argv.slice(2);
let joinedArgs = myArgs.join('|');
if (joinedArgs.indexOf("--name=") < 0 || joinedArgs.indexOf("--port=") < 0) {
  console.log("Missing params \n" + (joinedArgs.indexOf("--name=") == -1 ? "--name=\n" : "") + (joinedArgs.indexOf("--port=") == -1 ? "--port=\n" : ""));
  return;
}
let service_name = myArgs.find(arg => arg.indexOf('--name=') != -1).split('=')[1];
let service_port = myArgs.find(arg => arg.indexOf('--port=') != -1).split('=')[1];

if (fs.existsSync(path.join(__dirname, service_name))) {
  console.log(`Microservice with name ${service_name} already exists.`);
  return false;
};
fs.rmdirSync(path.join(__dirname, service_name), {
  recursive: true
});

console.log(`Dir ${path.join(__dirname, service_name)} has been deleted.`);

let dirName = path.join(__dirname, `${service_name}`);

copydir.sync(path.join(__dirname, 'filetemplates'), dirName, {
  filter: function (stat, filepath, filename) {
    if (stat === 'file' && path.extname(filepath) === '.html') {
      return false;
    }
    if (stat === 'directory' && filename === '.svn') {
      return false;
    }
    if (stat === 'symbolicLink') {
      return false;
    }
    return true;
  }
});

/**
 * Main files
 */
//index.js
let express_ms_index_file = fs.readFileSync(`${service_name}/index.js`, 'utf8');
express_ms_index_file = express_ms_index_file.replace(/microservice_name/g, service_name);
express_ms_index_file = express_ms_index_file.replace(/microservice_port/g, service_port);
fs.writeFileSync(`${service_name}/index.js`, express_ms_index_file);

//express-app.js
let express_app = fs.readFileSync(`${service_name}/src/express-app.js`, 'utf8');
express_app = express_app.replace(/microservice_name/g, service_name);
fs.writeFileSync(`${service_name}/src/express-app.js`, express_app);

//package.json
let package_json = JSON.parse(fs.readFileSync(`${service_name}/package.json`, 'utf8'));
package_json.name = service_name;
fs.writeFileSync(`${service_name}/package.json`, JSON.stringify(package_json, null, 2));

//.env.dev
let dot_env = fs.readFileSync(`${service_name}/.env.dev`, 'utf8');
dot_env = dot_env.replace(/microservice_name/g, service_name);
dot_env = dot_env.replace(/microservice_port/g, service_port);
fs.writeFileSync(`${service_name}/.env.dev`, dot_env);

//template-service.js
let template_service = fs.readFileSync(`${service_name}/src/services/template-service.js`, 'utf8');
template_service = template_service.replace(/microservice_name/g, service_name);
template_service = template_service.replace(/Microservice_name/g,  service_name.charAt(0).toUpperCase() + service_name.slice(1));
fs.writeFileSync(`${service_name}/src/services/${service_name}-service.js`, template_service);

/**
 * Database files
 */
//database_index.js
let database_index = fs.readFileSync(`${service_name}/src/database/index.js`, 'utf8');
database_index = database_index.replace(/microservice_name/g, service_name);
database_index = database_index.replace(/Microservice_name/g, service_name.charAt(0).toUpperCase() + service_name.slice(1));
fs.writeFileSync(`${service_name}/src/database/index.js`, database_index);

//database_repository.js
let database_repository = fs.readFileSync(`${service_name}/src/database/repository/test-repository.js`, 'utf8');
database_repository = database_repository.replace(/Microservice_name/g, service_name.charAt(0).toUpperCase() + service_name.slice(1));
database_repository = database_repository.replace(/microservice_id/g, `${service_name}Id`);
database_repository = database_repository.replace(/Microservice_model/g, `${service_name}Model`);
database_repository = database_repository.replace(/microservice_names/g, `${service_name}s`);
database_repository = database_repository.replace(/Microservice_method/g, `Get${service_name.charAt(0).toUpperCase() + service_name.slice(1)}s`);
fs.writeFileSync(`${service_name}/src/database/repository/test-repository.js`, database_repository);
fs.renameSync(`${service_name}/src/database/repository/test-repository.js`, `${service_name}/src/database/repository/${service_name}-repository.js`);

//database_model_index.js
let database_model_index = fs.readFileSync(`${service_name}/src/database/models/index.js`, 'utf8');
database_model_index = database_model_index.replace(/Microservice_name/g, service_name.charAt(0).toUpperCase() + service_name.slice(1));
database_model_index = database_model_index.replace(/Microservice_model/g, `${service_name}Model`);
fs.writeFileSync(`${service_name}/src/database//models/index.js`, database_model_index);

//database_model_test.js
let database_model_test = fs.readFileSync(`${service_name}/src/database/models/Test.js`, 'utf8');
database_model_test = database_model_test.replace(/Microservice_name/g, service_name.charAt(0).toUpperCase() + service_name.slice(1));
database_model_test = database_model_test.replace(/microservice_name/g, service_name);
database_model_test = database_model_test.replace(/microservice_id/g, `${service_name}Id`);
fs.writeFileSync(`${service_name}/src/database/models/Test.js`, database_model_test);
fs.renameSync(`${service_name}/src/database/models/Test.js`, `${service_name}/src/database/models/${service_name.charAt(0).toUpperCase() + service_name.slice(1)}.js`);

/**
 * API files
 */
//api_app_events.js
let api_app_events = fs.readFileSync(`${service_name}/src/api/app-events.js`, 'utf8');
api_app_events = api_app_events.replace(/Microservice_name/g, service_name.charAt(0).toUpperCase() + service_name.slice(1));
api_app_events = api_app_events.replace(/microservice_name/g, service_name);
fs.writeFileSync(`${service_name}/src/api/app-events.js`, api_app_events);

//test.js
let api_test = fs.readFileSync(`${service_name}/src/api/test.js`, 'utf8');
api_test = api_test.replace(/Microservice_name/g, service_name.charAt(0).toUpperCase() + service_name.slice(1));
api_test = api_test.replace(/microservice_name/g, service_name);
fs.writeFileSync(`${service_name}/src/api/test.js`, api_test);
fs.renameSync(`${service_name}/src/api/test.js`, `${service_name}/src/api/${service_name}.js`);

//index.js
let api_index = fs.readFileSync(`${service_name}/src/api/index.js`, 'utf8');
api_index = api_index.replace(/microservice_name/g, service_name);
fs.writeFileSync(`${service_name}/src/api/index.js`, api_index);

/**
 * GATEWAY
 */
//gateway_index.js
let gateway_index = fs.readFileSync(`gateway/index.js`, 'utf8');
if (gateway_index.indexOf(`app.use('/${service_name}', proxy('http://localhost:${service_port}'))`) < 0) {
  gateway_index = gateway_index.replace(/app.listen/g, `app.use('/${service_name}', proxy('http://localhost:${service_port}'));\r\napp.listen`);
}
fs.writeFileSync(`gateway/index.js`, gateway_index);

console.log(`Go to ${path.join(__dirname, service_name)} and start code your service.`);
