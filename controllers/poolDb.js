const { Pool, Client } = require('pg')
const connectionString = "postgres://lnrctabtlkecoo:041e5ec3b129dcd4e9a949c8a43086fd4653d2e0569b94f40513e08796a97fff@ec2-18-203-62-227.eu-west-1.compute.amazonaws.com:5432/datjetqeeg722g";
//postgres://user:password@host:port/database
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;