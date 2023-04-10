const mysql = require("mysql2");
const pool = mysql.createPool(
{
    host: "localhost",
    user: "root",
    password: "---------",
    database:"policy_management_system"
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

