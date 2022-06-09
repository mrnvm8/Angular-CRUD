//importing mysql
const mysql = require('mysql');

//Creating a pool
//A pool will allows connect to database
//and it will manage a list of connection  to the database
const db = mysql.createPool({
    connectionLimit : 10,    //0 users allowed at a time
    password :'password',
    user: 'root',
    database:'SchoolDB',
    host: 'localhost',
    port: '3306'
});

//Creating an empty object to be exported with database inform
let student = {};

student.getAllStudent = () =>{
    //mysql does a callback back when querying
    //will return a promises in here because i want to use Async.
    return new Promise((resolve, reject) =>{

        db.query("SELECT * FROM Student", (err, result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    });
}

//for get a student by ID
student.getStudent = (id) =>{
    //mysql does a callback back when querying
    //will return a promises in here because i want to use Async.
    return new Promise((resolve, reject) =>{

        db.query("SELECT * FROM Student WHERE Student_Id = ?",
            [id], (err, result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result[0]);
        })
    });
}

//For deleting student by Id
student.deleteStudent = (id) =>{
    //mysql does a callback back when querying
    //will return a promises in here because i want to use Async.
    return new Promise((resolve, reject) =>{

        db.query("DELETE FROM Student WHERE Student_Id = ?",
            [id], (err, result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    });
}

//For Create student information
student.CreateStudent = (value) =>{
    //mysql does a callback back when querying
    //will return a promises in here because i want to use Async.
    return new Promise((resolve, reject) =>{
        let FirstName = value.FirstName;
        let LastName = value.LastName;
        let Gender = value.Gender;
        let Grade = value.Grade;

        db.query('INSERT INTO Student (FirstName, LastName, Gender, Grade) VALUES(?, ?, ?, ?)',
            [FirstName , LastName, Gender, Grade], (err, result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    });
}
// method for updating student on the database
student.UpdateStudent =(value, id) =>{
  return new Promise((resolve, reject) =>{
    let FirstName = value.FirstName;
    let LastName = value.LastName;
    let Gender = value.Gender;
    let Grade = value.Grade;

    db.query('UPDATE Student SET FirstName =?, LastName =?, Gender =?, Grade =? WHERE Student_Id =?',
        [FirstName , LastName, Gender, Grade, id], (err, result)=>{
        if(err){
            return reject(err);
        }
        return resolve(result);
    })
});
}
module.exports = student;
