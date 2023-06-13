//files
const fs =require('fs')

// reading a file-->
// let fileContent=fs.readFileSync('f1.txt')   //work synchronously
// console.log('data of file 1-> '+ fileContent)


//writing in a file-->if the file name that not exist the new 
//if the file name that is passed doesnot exists the new file will be created with its name
//and data will be  written on that file
// fs.writeFileSync('f2.txt','this is file 2')
// console.log('file has been written')

//append a file

//appendSync method adds new data to a previously written file
// fs.appendFileSync('f3.txt',"   This is appended data")
// console.log('file has been appended')

//deleting a file
// fs.unlinkSync('f2.txt')
// console.log('file has been deleted')




//Directories
//create a directory i.e folder

fs.mkdirSync('myDirectory')

// check the content inside a directory


// let folderPath ='D:\\Coursera\\Nodejs_scaler\\_Node Module System\\myDirectory'
// let folderContent =fs.readdirSync(folderPath)
// console.log('folder Content' ,folderContent)        //in form of array

//check whether a directory or files exists or not
// let doesExist= fs.existsSync('myDirectory')
// console.log(doesExist)



//Remove directory-->delete a directory

// fs.rmdirSync('myDirectory')
// console.log('file deleted')



