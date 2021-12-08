export 
    default 
    // class Task{
    //     constructor(taskName, dateValue, done){
    //     this.taskName = taskName;
    //     this.dateValue = dateValue; 
    //     this.done = false      
    //     console.log("task being Created");
    // }
    // completed(){
    //     this.done = true
    //     return this;
    //     // let this.taskName = {
    //     //     color:red;
    //     // }, this.dateValue;
    //     }
    // }
    class Task{
        constructor(taskValue, dateValue){
        this.taskValue = taskValue;
        this.dateValue = dateValue; 
        // this.done = done
        console.log("task being Created");
    }
    alertMessage(){
        let date = new Date();
        return date.getFullYear() - this.year;
        
      
        // console.log(`welcome tasks, you have ${this.taskValue} deadline coming up and only ${this.dateValue} to do it!`)
        // return this;
        // let this.taskName = {
        //     color:red;
        // }, this.dateValue;
        }
    }
let myTask = new Task("babysitting", 8/12/21);
// console.log(myTask)
// task will have something in common
// those fields will be there when
// look at how to impliment item
myTask.alertMessage()
console.log(myTask)
