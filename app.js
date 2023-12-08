const {Client}=require("pg");
var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,PUT,DELETE,HEAD,POST"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
const client=new Client({
    user:"postgres",
    password:"jyoti1308@#",
    database:"postgres",
    port:5432,
    host:"db.ncgivzzvprxthrbgqyse.supabase.co",
    ssl:{rejectUnauthorized:false},

});
client.connect(function(res,error){
    console.log("Connected!!!");
})

app.get("/users", function (req, res,next) {
    console.log("inside /users get api");
    const query=`SELECT * from users`;
   
        client.query(query, function (err, result) {
            console.log(query);
            if (err) {res.status(400).send(err);}
            res.send(result);
            client.end();
        });
    });

    app.post("/users", function (req, res,next) {
        console.log("inside /users post api");
        var values=Object.values(req.body);
        console.log(values);
        const query=`insert into users (email,firstname,lastname,age) values ($1,$2,$3,$4)`;
            client.query(query, values,function (err, result) {
                if (err) res.status(400).send(err);
                else {
                    res.send(`${result.rowCount} insertion successful`);
                    
                }
            });
        });
        app.put("/users/:id", function (req, res,next) {
            console.log("inside /users post api");
            let userID=req.params.id;
            let age=req.body.age;
            let values=[age,userID];
            console.log(values);
            const query=`update users set age=$1 where id=$2`;
                client.query(query, values,function (err, result) {
                    if (err) res.status(400).send(err);
                    else {
                        res.send(`${result.rowCount} updation successful`);
                        
                    }
                });
            });
// var express = require("express");
// var app = express();
// const cors = require('cors');
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Methods",
//         "GET,OPTIONS,PATCH,PUT,DELETE,HEAD,POST"
//     );
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
var port = process.env.PORT||2410;
app.listen(port, () => console.log(`Node App listening on port ${port}!`));
// let mysql = require("mysql");
// let connData = {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "jyoti",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// };

// app.get("/svr/resetData", function (req, res) {
//     let conn = mysql.createConnection(connData);
//     let sql = "delete from mobiles";
//     conn.query(sql, function (err, result) {
//         if (err) res.status(404).send(err);
//         else {
//             let { mobiles } = require("./mobileData2.js");
//             let arr = mobiles.map(ele => [ele.name, ele.price, ele.brand, ele.RAM, ele.ROM, ele.OS]);
//             let conn = mysql.createConnection(connData);
//             let sql = "insert into mobiles values ?";
//             conn.query(sql, [arr], function (err, result) {
//                 if (err) res.status(404).send(err);
//                 else {
//                     res.send(result);
//                 }
//             })
//         }
//     })
// })
// app.get("/svr/mobiles", function (req, res) {
//     let { brand = '', RAM = '', ROM = '' } = req.query;
//    console.log(req.query);
//     let {sortBy}=req.query;
//     let conn = mysql.createConnection(connData);
//     let sql = "select * from mobiles ";
//     if (brand || RAM || ROM) {
//         sql += " WHERE";
//         const conditions = [];

//         if (brand) {
//             conditions.push(" brand IN (?)");
//         }
//         if (RAM) {
//             conditions.push(" RAM IN(?)");
//         }
//         if (ROM) {
//             conditions.push(" ROM IN (?)");
//         }
//         sql += conditions.join(" AND");
//     }
//     if (brand || RAM || ROM) {
//         const params = [];
//         if (brand) {
//             let data1 = brand.split(',');
           
//             params.push(data1);
          
//         }
//         if (RAM) {
//             let data2 = RAM.split(',');
//             params.push(data2);
//         }
//         if (ROM) {
//             let data3 = ROM.split(',');
//             params.push(data3);
//         }
//        console.log(params.toString(),params);
//         conn.query(sql, params, function (err, result) {

//             if (err) {
                
//                 res.status(500).send(err);
//             } else {
//                 res.send(result);
//             }
//         });
//     }
//     else {

//         let conn = mysql.createConnection(connData);
//         let sql = sortBy?`select * from mobiles order by ${sortBy}`:"select * from mobiles";
//         conn.query(sql, function (err, result) {
//             if (err) res.status(404).send(err);
//             else res.send(result);
//         })
//     }
// })
// app.get("/svr/mobile/:name", function (req, res) {
//     let name = req.params.name;

//     let conn = mysql.createConnection(connData);
//     let sql = "select * from mobiles where name=?";
//     conn.query(sql, name, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result[0]);
//     })
// })
// app.get("/svr/mobiles/brand/:brand", function (req, res) {
//     let brand = req.params.brand;
//     let sortBy = req.query.sortBy;
//     let conn = mysql.createConnection(connData);
//     let sql = sortBy ? `select * from mobiles where brand=? order by ${sortBy}` :
//         "select * from mobiles where brand=?";
//     conn.query(sql, brand, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     })
// });

// app.get("/svr/mobiles/ram/:ram", function (req, res) {
//     let ram = req.params.ram;
//     let sortBy = req.query.sortBy;
//     let conn = mysql.createConnection(connData);
//     let sql = sortBy ? `select * from mobiles where RAM=? order by ${sortBy}` :
//         "select * from mobiles where RAM=?";
//     conn.query(sql, ram, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     })
// });

// app.get("/svr/mobiles/rom/:rom", function (req, res) {
//     let rom = req.params.rom;
//     let sortBy = req.query.sortBy;
//     let conn = mysql.createConnection(connData);
//     let sql = sortBy ? `select * from mobiles where ROM=? order by ${sortBy}` :
//         "select * from mobiles where ROM=?";
//     conn.query(sql, rom, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     })
// })
// app.get("/svr/mobiles/os/:os", function (req, res) {
//     let os = req.params.os;
//     let sortBy = req.query.sortBy;
//     let conn = mysql.createConnection(connData);
//     let sql = sortBy ? `select * from mobiles where OS=? order by ${sortBy}`
//         : "select * from mobiles where OS=?";
//     conn.query(sql, os, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     })
// })
// app.delete("/svr/mobiles/delete/:name", function (req, res) {
//     let name = req.params.name;

//     let conn = mysql.createConnection(connData);
//     let sql = "delete from mobiles where name=?";

//     conn.query(sql, name, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     })
// })

// app.post("/svr/mobiles", function (req, res) {
//     let { name, brand, price, RAM, ROM, OS } = req.body;
//     console.log(2);
//     let data = [name, price, brand, RAM, ROM, OS];
//     let conn = mysql.createConnection(connData);
//     let sql = "insert into mobiles values(?,?,?,?,?,?)";
//     conn.query(sql, data, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     })
// })

// app.put("/svr/mobile/:name", function (req, res) {
//     console.log(2);
//     let name = req.params.name;
//     let { brand, price, RAM, ROM, OS } = req.body;
//     console.log(req.body);
//     let data = [price, brand, RAM, ROM, OS, name];
//     console.log(data);
//     let conn = mysql.createConnection(connData);
//     let sql = "update mobiles set price=?,brand=?,RAM=?,ROM=?,OS=? where name=?";
//     conn.query(sql, data, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     })
// })