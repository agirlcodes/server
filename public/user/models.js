// export 
//     default 
    class userEnter{
        constructor(name){
            this.name=name
        }
        messageToUser(){
            console.log(`Welcome ${this.name}, ready to organise? `)
        }
    }
        
let userMessage = new userEnter(userName)