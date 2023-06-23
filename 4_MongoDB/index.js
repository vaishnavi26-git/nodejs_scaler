const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1/testDatabase")
  .then(() => console.log("connection is successful"))
  .catch((err) => console.log("could not connect to mongodb", err));

//schema
const courseSchema = new mongoose.Schema({
  name: {type:String,required:true},
  tags:{type:Array,validate:{
    validator:function(tags){
      return tags.length>1}
  }},
  category:{
    type:String,
    required:true,
    enum:['DSA','web','mobile','data science']
  },
  creator: {type:String,required:true},
  publishDate: { type: Date, default: Date.now },
  isPublished: {type:String,required:true},
  rating:{type:Number,required:function(){return this.isPublished}}
});

//classes,objects

const Course = mongoose.model("Course", courseSchema);


async function createCourse() {
  const course = new Course({
    name: 'MongoDB',
    tags:['express','mongo'],
    category:'web' ,
    creator: "adamI",
    isPublished: true,
    rating:3
  });

  try {
   await course.validate()
    //const result = await course.save(); // asynchronous method
    //console.log(result);

  } catch (error) {
    for(field in error.errors){
          // console.error(error.message);
     console.error(error.errors[field]);

    }

  }
}  //create


//comparision operator
//eq(equal)
//gt(greater)
//gte(greater than and equal to)
//in 
//not in



//logical operator
//or, and
async function getCourses(){
    const  courses= await Course.find({rating:{$in:[3,4,]}}).select({name:1,publishDate:1}).sort({name:1})
     .or([{creator:'tutu'} ,{rating:4.5}],)

   console.log(courses)
}//reading data

// getCourses()

// createCourse();


 async function updateCourse(id){
    let course =await Course.findById(id)
     if (!course) return;
     course.name="python"
 course.creator="steve"
 const updatedCourse= await course.save()
     console.log(updatedCourse)
 }//updating data
//  updateCourse('648ff893e1a93bc4cba75eb9'
//  )



 //deleting
 async function deleteCourse(id){
    let course =await Course.findByIdAndDelete(id)
    if (!course) return;
     console.log(course)
 }//deleting data
// deleteCourse('648ff893e1a93bc4cba75eb9' )



createCourse()