const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const connectionPool = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        return pool;
    })
    .catch(err => {
        throw(err);
    });


async function executeQuery(query, params = []) {
    const pool = await connectionPool;
    const request = pool.request();
    params.forEach(({name, type, value}) => {
        request.input(name, type, value);
    });

    const result = await request.query(query);
    return result.recordset;
}

module.exports = executeQuery();
