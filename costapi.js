const PORT = process.env.PORT || 4200
const express = require('express');
const app = express();
const fs = require("fs"); //read file
const mysql = require('mysql')
const router = express.Router()

router.get('/costTypeID', (req, res) => {
    //console.log("costTypeID: " + req.params.id)
    const connect = getConnection()
    const queryString = "SELECT * FROM coststype"
    connect.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("Failed to query for users:" + err)
            res.sendStatus(500)
           return
        }
        console.log("fetch Success")

        const costJson = rows.map((row)=>{
        return {CostTypeID: ~~(row.CostTypeID/10)+1,CostTypeName: row.CostTypeName}
        })
        
        res.json(costJson)
    })
    //res.end()
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b30ea52d3aa952',
    password: '918a5c13',
    database: 'heroku_1c39a65d43a5546'
})

function getConnection(){ 
    return pool
}


app.listen(PORT, function () {
    console.log("server is listening on :" + PORT)
});
