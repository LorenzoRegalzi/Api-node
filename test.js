const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { 
        id: 1, 
        name : 'first',
    },
    {
        id: 2, 
        name : 'second',
    }
]

//test serve connection

app.get('/', (req, res) => {
    res.send('hi here serve the api that you need');
})


//take all courses
app.get('/api/courses', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(courses);
})

//add new course
app.post('/api/courses', (req, res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send("don't respect the rules");

    const course = {
        id: courses.length + 1, 
        name : req.body.name,
    };

    courses.push(course);
    res.send(course);
});


//take only one course
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send('the id non exist');
    res.send(course);
});


//upload course
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send('the id non exist');


    const { error } = validate(req.body);
    if(error) return res.status(400).send("don't respect the rules");

    course.name = req.body.name;
    res.send(course);
});


//delete course
app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send('the id non exist');

    let index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


// function that validate a course 
function validate(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.listen(3000, () => console.log('listening on port 3000'))