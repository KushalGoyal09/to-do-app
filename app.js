const express = require('express');
const app = express();
const port = 5000;

let count = 1;
let tasks = [];  // id, task, done

app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/todo', (req,res) => {
    res.json({success:true,data:tasks});
})

app.post('/todo', (req,res) => {
    const {task} = req.body;
    tasks.push({id:count,task:task,done:false});
    count++;
    res.json({success:true,data:tasks});
})

app.put('/todo', (req,res) => {
    const {id, task} = req.body;
    tasks = tasks.map(e => {
        if(e.id === Number(id)) {
            e.task = task;
        }
        return e;
    })
    res.json({success:true,data:tasks});
})

app.post('/todoDelete', (req,res) => {
    const {id} = req.body;
    tasks = tasks.filter(e => {
        return e.id !== Number(id);
    })
    res.json({success:true,data:tasks});
})

app.put('/done', (req,res) => {
    const {id} = req.body;
    tasks = tasks.map(e => {
        if(e.id === Number(id)) {
            e.done = !e.done;
        }
        return e;
    })
    res.json({success:true,data:tasks});
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}...`);
})