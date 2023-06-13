//child process is a node module used to create sub process within a script
//you can perform different tasks with your script by just using some methods

const cp =require('child_process')


// cp.execSync('calc')
//cp.execSync('start chrome')

// cp.execSync('start chrome https://www.scaler.com/topics/course/nodejs/video/973/')
console.log('output '+cp.execSync('node demo.js'))