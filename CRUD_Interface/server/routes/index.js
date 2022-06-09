//Import Files
const express = require('express')
const db = require('../MySql')
const cors = require('cors')
/** Routing refers to determining how an application responds to a client request to a particular endpoint,
* which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
*/

//creating a router
const router = express.Router();

//HTTP request GET method that uses Async and will return all Student
router.get('/', async(req, res) => {
    try{
        res.json(await db.getAllStudent());
    }catch(err){
        console.log(err);
        res.sendStatus(500);

    }
});

//HTTP request GET method that uses Async and will return all Student
router.get('/student/:id', async(req, res) => {
    try{
        res.json(await db.getStudent(req.params.id));
    }catch(err){
        console.log(err);
        res.sendStatus(500);

    }
});

//HTTP request DELETE  method that uses Async and will DELETE student
router.delete('/delete/:id', async(req, res) => {
    try{
        res.json(await db.deleteStudent(req.params.id));
    }catch(err){
        console.log(err);
        res.sendStatus(500);

    }
});

//HTTP request POST method that uses Async and will Create student
router.post('/create', async(req, res) => {
    try{
        res.json(await db.CreateStudent(req.body));
    }catch(err){
        console.log(err);
        res.sendStatus(500);

    }
});

//HTTP request PUT method that uses Async and will update student
router.put('/update/:id', async(req, res) => {
  try{
      const id = req.params.id;
      res.json(await db.UpdateStudent(req.body, id));
  }catch(err){
      console.log(err);
      res.sendStatus(500);
  }
});

//exporting router
module.exports = router;

