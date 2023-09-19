const mysql = require("mysql2");
require('dotenv').config();
const pool = mysql.createPool(
{
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
},
console.log("connected to dbms..."));
function query(sql, values)
{
    return new Promise((resolve, reject)=> 
    {
        pool.getConnection((err, connection) => {
            if(err)
            {
                return reject(err);
            }
            connection.query(sql, values, (error, results, fields) => {
                connection.release();
                if(error){
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
}
module.exports = {
    query
};

