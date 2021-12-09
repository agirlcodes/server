// TAKE MODALS OFF
document.addEventListener('DOMContentLoaded', () => {
  // CALLING SUPABASE
    const { createClient } = supabase;
    supabase = createClient('https://twphegmcopuxhufqbpfg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDc0NjI5NSwiZXhwIjoxOTUwMzIyMjk1fQ.uUoHk5B21XcyCpeJt_my-DunpgVaB0UVn3DqFXz7o1I')

    // TO DO LIST
    todoMain();
    // JS CLASSES 
    let messageLocation = document.getElementById('welcomeMessage')
    let currentUser = supabase.auth.user()
    let userName = currentUser.identities[0].identity_data.name
    class userEnter{
      constructor(name){
        this.name=name
      }
      messageToUser(){
        `Welcome ${this.name}, ready to organise?`
      }
    }
    let userMessage = new userEnter(userName)
    messageLocation.innerHTML = `Welcome <i>${userMessage.name}</i>, ready to organise?`
  
    
    function todoMain(){
      // SET TASKS SECTIONS
      let setTasks = document.getElementById('selectData');
      let monthCat = document.getElementById('dateValue')
      let taskBtn = document.getElementById('dataToCalendar');
      let calendar;
      let todoList = [];
      initCalendar();
      load(); 
      
      taskBtn.addEventListener("click", addEntry, false)
      //RENDERING FUNCTIONS 
      function addEntry(event){
        event.preventDefault();
        console.log("task button is responding")
        // FORM THAT FEEDS DATA TO DATABASE
        let taskValue = setTasks.value;
        let dateValue = monthCat.value;
        let obj = {
          // id: todoList.length,
          user_id:supabase.auth.user().id,
          usertask: taskValue,
          date: dateValue,
          done: false
        };
        todoList.push(obj);
        save();
      // RELOADS PAGE ON INPUT
          location.reload()
        }
      // SAVE INPUT TO DATABASE
      function save() {
        fetch('http://68.183.39.213:3000/userdata', {
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body: JSON.stringify(todoList)
        })
      }
    // GETTING DATA FROM DATABASE 
      function load() {
        fetch('http://68.183.39.213:3000/userdata')
          .then(res => res.json())
          .then(data => {
            let dataArray = data;
            let table = document.getElementById("todoTable");
            dataArray.forEach(todoObj => {
              let todo = todoObj.usertask
              let date = todoObj.date
              let userTaskid = todoObj.id
              let done = todoObj.done                
                //ADDING TAABLE TO LIST
                let tr = document.createElement("tr");
                table.appendChild(tr);
                    //CHECKBOX
                    let checkboxCell = document.createElement("input");
                      checkboxCell.type = "checkbox";
                      checkboxCell.addEventListener("click", checkboxCallback, false);
                    let td1 = document.createElement("td");
                      td1.appendChild(checkboxCell);
                      tr.appendChild(td1);
    
                    // TODO CELL
                    let td2 = document.createElement("td");
                      td2.innerText = todo;
                      tr.appendChild(td2);
    
                    // DATE cell
                    let dateCell = document.createElement("td");
                    let dateObj = new Date(date)
                    let dateFormat = dateObj.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })
                    dateCell.innerText = dateFormat;
                      tr.appendChild(dateCell);
    
                    // DELETE cell
                    let spanElem = document.createElement("span");
                      spanElem.className = "far fa-trash-alt";
                      spanElem.addEventListener("click", deleteItem, false);
                      let td4 = document.createElement("td");
                      td4.appendChild(spanElem);
                      tr.appendChild(td4);
            
                      // GET DATA FROM TABLE TO ADD TO CALENDAR 
                      addEvent({
                        title: todo, 
                        start: date
                      })
                      // IF CHECKBOX STATUS IS true/false strike through
                      checkboxCell.checked = done;
                      if(true){
                        tr.classList.add("strike"); 
                      }else{
                        tr.classList.remove("strike");  
                      }
                      // console.log(checkboxCell)
                      function checkboxCallback(){
                              tr.classList.toggle("strike"); 
                              // if (todoList.id == userTaskid);
                              done = !done
                              console.log(done)
                              fetch('http://68.183.39.213:3000/userdata', {
                                method: 'PUT',
                                headers: {
                                  'Accept':'application/json',
                                  'Content-Type':'application/json'
                                },
                                body: JSON.stringify({done: done, id: userTaskid})
                              })
                              
                              // location.reload()
                              save()
                            }
                      function deleteItem(){
                          fetch('http://68.183.39.213:3000/userdata', {
                            headers: {
                              'Accept':'application/json',
                              'Content-Type':'application/json'
                            },
                            method: 'DELETE',
                            body: JSON.stringify({id:userTaskid}) 
                          })
                          location.reload()
                          console.log("I have been deleted")
                          console.log(userTaskid)
                          //event remove from calendar
                          calendar.getEventById(this.id).remove();
                          tr.remove();
                  }
              })   
          })
      }
      
    //CALENDAR API
    function initCalendar(){
      var calendarEl = document.getElementById('calendar');
      calendar = new FullCalendar.Calendar(calendarEl, 
            {
                // calendar layout
              initialView: 'dayGridMonth',
              headerToolbar: {
                  right: 'dayGridMonth dayGridWeek'
                },
              titleFormat:
              {year: 'numeric', month: 'long'},
              // time limits
              slotMinTime: "07:00:00",
              slotMaxTime: "19:00:00",
              nowIndicator:true,
              expandRows: false,
              handleWindowResize: true,
              height: 900,
              dayHeaderFormat:{
                  weekday:"short"},
              dayMaxEvents: true,
              events: [],
              displayEventEnd: true, 
              eventBackgroundColor: "pink",
              eventBorderColor: "white",
            });
        
            calendar.render();
            // calendar.addEvent( data );
      }  
    // ADD EVENTS TO CALENDAR
    function addEvent(event){
      calendar.addEvent( event )
    }
  }
  // JS CLASS

  // ADD TASKS
  let addTaskBtn = document.getElementById('addTaskBtn')
  addTaskBtn.addEventListener('click', () => {
    // e.preventDefault();
    console.log("i have been pressed:  added btn")
    const taskAdded = document.getElementById('taskAdded').value
    // CAPITALISING FIRST LETTER OF WORDS
    const taskFormat = taskAdded.charAt(0).toUpperCase() + taskAdded.slice(1)
    // NOT ALLOWING EMPTY INPUT FIELD
      if(taskFormat === ""){
        console.log("Missing input")
        alert("Please fill in a task name")
      }
      else{
        // ADDING TASK TO DATABASE
        console.log("adding to database")
        fetch('http://68.183.39.213:3000/tasks', {
            method: 'POST',
            headers: {
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body: JSON.stringify({task:taskFormat, user_id: supabase.auth.user().id})
        })
        .then(res => res.json())
        .then(data => alert("you have submitted a task"))
      }
    })
  
  //  // DELETE TASKS
  // // add task to option
  // console.log("has Ip address")
axios.get('http://68.183.39.213:3000/tasks')
.then(res => { 
  let getData = res.data
  deleteTaskList(getData)
  console.log(getData)
})
//.catch(err => console.error(err))

function deleteTaskList(data){
let editData = document.getElementById('editTaskList')
data.forEach(task =>{
      let taskId = task.id
      let taskName = task.task
      editData.innerHTML += `
         <option class="deleteData" value="${taskId}">${taskName}</option>`
  //     })  
      let deleteBtn = document.getElementById('removeTask')
      deleteBtn.addEventListener('click', () => {
        let taskId = document.getElementById("editTaskList").value
        console.log(taskId)
            fetch('http://68.183.39.213:3000/tasks', {
              headers: {
                'Content-type': 'application/json'
              },
                method: 'DELETE',
                body: JSON.stringify({id:taskId})
              })
              location.reload()
            })
          })
}







  // fetch('http://localhost:3000/tasks')
  // .then(response =>response.json())
  // .then(data =>{ 
  //   let editData = document.getElementById('editTaskList')
  //   data.forEach(task =>{
  //     let taskId = task.id
  //     let taskName = task.task
  //     editData.innerHTML += `
  //        <option class="deleteData" value="${taskId}">${taskName}</option>`
  // //     })  
  //     let deleteBtn = document.getElementById('removeTask')
  //     deleteBtn.addEventListener('click', () => {
  //       let taskId = document.getElementById("editTaskList").value
  //       console.log(taskId)
  //           fetch('/tasks/', {
  //             headers: {
  //               'Content-type': 'application/json'
  //             },
  //               method: 'DELETE',
  //               body: JSON.stringify({id:taskId})
  //             })
  //           })
        
  //     })
  // })

  
  //API FOR TO-DO LIST
  fetch('http://68.183.39.213:3000/tasks')
  .then(response =>response.json())
  .then(response =>{ 
    console.log("I am working")
    let data = response
    let selectData = document.getElementById('selectData')
      for (let i = 0; i < data.length; i++) {
        const el = data[i];
        selectData.innerHTML += `
            <option>${el.task}</option>  `
        }
      })
  
  // LOGOUT
  // error coming out null in console log
    const logoutButton = document.getElementById('logoutBtn')
    console.log(logoutButton)
    logoutButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const { error } = await supabase.auth.signOut()
          // {redirectTo:"backEnd/html/login.html"}
        // )
        console.log("bye")
        console.log({error})
    })
  
  // end of DOM load
  })
  