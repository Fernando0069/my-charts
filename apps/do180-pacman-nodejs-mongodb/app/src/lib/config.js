var service_host = ''
var mongo_database = ''
var mongo_port = ''
var use_ssl = false
var validate_ssl = true
var auth_details = ''
var connection_details = ''

/*
console.log("MONGO_SERVICE_HOST:", process.env.MONGO_SERVICE_HOST);
console.log("MONGO_DATABASE:", process.env.MONGO_DATABASE);
console.log("MONGO_PORT:", process.env.MONGO_PORT);
console.log("MONGO_AUTH_USER:", process.env.MONGO_AUTH_USER);
console.log("MONGO_AUTH_PWD:", process.env.MONGO_AUTH_PWD);
*/

if(process.env.MONGO_SERVICE_HOST) {
    service_host = process.env.MONGO_SERVICE_HOST
} else if(process.env.MONGO_NAMESPACE_SERVICE_HOST) {
    service_host = process.env.MONGO_NAMESPACE_SERVICE_HOST
}

if(process.env.MONGO_DATABASE) {
    mongo_database = process.env.MONGO_DATABASE
}

if(process.env.MONGO_PORT) {
    mongo_port = process.env.MONGO_PORT
}

if(process.env.MONGO_USE_SSL) {
    if(process.env.MONGO_USE_SSL.toLowerCase() == "true") {
        use_ssl = true
    }
}

if(process.env.MONGO_VALIDATE_SSL) {
    if(process.env.MONGO_VALIDATE_SSL.toLowerCase() == "false") {
        validate_ssl = false
    }
}

if(process.env.MONGO_AUTH_USER && process.env.MONGO_AUTH_PWD) {
    auth_details = `${process.env.MONGO_AUTH_USER}:${process.env.MONGO_AUTH_PWD}@`
}
/*
var hosts = service_host.split(',')

for (let i=0; i<hosts.length;i++) {
  connection_details += `${hosts[i]}:${mongo_port},`
}

connection_details = connection_details.replace(/,\s*$/, "");
*/

connection_details = `${service_host}:${mongo_port}`

var database = {
    url: `mongodb://${auth_details}${connection_details}/${mongo_database}`,
    options: {
        readPreference: 'secondaryPreferred'
    }
};
/*
if(process.env.MONGO_REPLICA_SET) {
    database.options.replicaSet = process.env.MONGO_REPLICA_SET
}

if(use_ssl) {
    database.options.ssl = use_ssl
    database.options.sslValidate = validate_ssl
}
*/
exports.database = database;
