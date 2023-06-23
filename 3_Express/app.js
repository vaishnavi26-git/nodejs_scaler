const express=require('express')
const app =express()    //to access all the methods,get,put,post,delete
const myMiddlewareFunction=require('./middlewares/middle')
const myMiddlewareFunction2=require('./middlewares/middle2')
const morgan =require('morgan')

//get,put post,delete

app.use(express.json())
app.use(myMiddlewareFunction)
app.use(myMiddlewareFunction2)
app.use(morgan("tiny"))
let courses=[
    {id:1, name:'javascript'},
    {id:2, name:'java'},
    {id:3, name:'Python'},

]


app.get('/',(req,res)=>{
    res.send('hello from tuttu')
}) 
app.get('/about',(req,res)=>{
    res.send('we create impact')
})
app.get('/contact',(req,res)=>{
    res.send('contact me at 123456')
})
app.get('/courses',(req,res)=>{
    res.send(courses)
}) //read data

app.post('/courses',(req,res)=>{
    const course={
        id:courses.length +1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})//create

//put method
app.put('/courses/:coursename',(req,res)=>{
    let course =courses.find(course=>course.name===req.params.coursename)
    if(!course)res.status(404).send('course does not exist')
course.name=req.body.name
res.send(course)

})//update data

//delete method
// app.delete('/courses/:coursename',(req,res)=>{
//     let UpdatedCourses=courses.filter(course=>course.name !==req.params.coursename)
//     courses=UpdatedCourses
//     res.send(courses)
// })

app.delete('/courses/:id',(req,res)=>{
    let course =courses.find(course=>course.id===parseInt(req.params.id))
    if(!course)res.status(404).send('course does not exist')
const index =courses.indexOf(course)
courses.splice(index,1)
    res.send(courses)
})


//Routes parameters
app.get('/courses/:coursename',(req,res)=>

{
    console.log(req.params.coursename)
    let course =courses.find(course=>course.name===req.params.coursename)
    if(!course)res.status(404).send('course does not exist')
    res.send(course)

})



const port =process.env.port || 3000

app.listen(port,()=>console.log('port running on ${port}'))