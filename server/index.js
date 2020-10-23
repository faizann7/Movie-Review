const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCT_QUERY = 'SELECT * FROM movie_reviews';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "CRUDDataBase"
})

connection.connect(err =>{
    if(err){
        return err;
    }
});
console.log(connection);

app.use(cors());


app.get('/', (req,res) =>{
    res.send('go to /reviews to see reviews');
})

app.get('/reviews/add', (req, res) =>{
    const {movieName, movieReview} = req.query;
    

    const INSERT_PRODUCT_QUERY = `INSERT INTO movie_reviews (movieName,movieReview) VALUES ('${movieName}', '${movieReview}') `;
    connection.query(INSERT_PRODUCT_QUERY, (err, results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('successfully added review!');
        }
    })

})

app.get('/reviews', (req,res) =>{
    connection.query(SELECT_ALL_PRODUCT_QUERY, (err, results)=> {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.listen(4000, ()=>{
    console.log(`Products server listening on port 4000`);
})














// var mysql=(require("mysql"));
// const bodyParser = require('body-parser');
// // const { createPool } = require('mysql'); 
// // const pool = createPool({
// //     host: "localhost",
// //     user: "root",
// //     password: "password",
// //     database: "CRUDDataBase"
// // })

// var db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "CRUDDataBase" 
// })
// app.use(cors);
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}))

// app.post('/api/insert', (req,res) =>{

//     const movieName = req.body.movieName
//     const movieReview = req.body.movieReview

//     const sqlInsert = "INSERT INTO movie_reviews (id,movieName, movieReview) VALUES (?,?)" 
//     db.query(sqlInsert, (movieName, movieReview), (err, result)=>{
//         console.log(err);
//     });
// });


// // var mysql = require('mysql');  
// // var con = mysql.createConnection({  
// //     host: "localhost",
// //         user: "root",
// //         password: "password",
// //         database: "CRUDDataBase"
// // });  
// // con.connect(function(err) {  
// //     if (err) throw err;  
// //     console.log("Connected!");  
// //     var sql = "INSERT INTO registration (id, firstName, lastName) VALUES (2, 'faizan', 'altaf')"; 
// //     con.query(sql, function (err, result) {  
// //     if (err) throw err;  
// //     console.log("1 record inserted");  
// // });  
// // })
// app.listen(3001, ()=> {
//     console.log("running on port 3001");
// });




// const cors = require('cors')
// const app = express();

