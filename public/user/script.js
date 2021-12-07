// CHANGE HEADER FORMAT OF DATE
// CHANGE WEEKLY DATE FORMAT
// import e = require("express");
// TAKE MODALS OFF

document.addEventListener('DOMContentLoaded', () => {
// CALLING SUPABASE
  const { createClient } = supabase;
  supabase = createClient('https://twphegmcopuxhufqbpfg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDc0NjI5NSwiZXhwIjoxOTUwMzIyMjk1fQ.uUoHk5B21XcyCpeJt_my-DunpgVaB0UVn3DqFXz7o1I')
  // TO DO LIST

  todoMain();

  function todoMain(){
  // SET TASKS SECTIONS
  let setTasks = document.getElementById('selectData');
  let monthCat = document.getElementById('dateValue')
  // let ulEl = document.getElementById('listOfTask');
  let taskBtn = document.getElementById('dataToCalendar');
  // let tableBtn = document.getElementById('dataToCalendar');
  let calendar;
  let todoList = [];
  initCalendar();
  // load();
  // renderRow();
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
      }
    load();
  // }
    // SAVE INPUT TO DATABASE
      function save() {
        fetch('http://localhost:3000/userdata', {
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
        fetch('http://localhost:3000/userdata')
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            let dataArray = data;
            // dataArray.forEach(todoObj => {
            //   let todo = todoObj.usertask
            //   let date = todoObj.date
            //   let userTaskid = todoObj.id
            //   return todo,date,userTaskid
            // })
            console.log("i am working?")
            dataArray.forEach(todoObj => {
              console.log("i am working?")
              let todo = todoObj.usertask
              let date = todoObj.date
              let userTaskid = todoObj.id
              // return todo,date,userTaskid
              let table = document.getElementById("todoTable");
              let tr = document.createElement("tr");
                table.appendChild(tr);
                // function renderRow(todo, date, userTaskid, done){
    
                //ADDING TAABLE TO LIST
                // console.log(todo)
    
                    //CHECKBOX
                    // let checkboxCell = document.createElement("input");
                    //   checkboxCell.type = "checkbox";
                    // //   checkboxCell.addEventListener("click", checkboxCallback, false);
                    //   // checkboxCell.dataset.id = id
                    // let td1 = document.createElement("td");
                    //   td1.appendChild(checkboxCell);
                      // tr.appendChild(td1);
    
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
                      // spanElem.id = id;
                      // console.log(spanElem.id = id)
            
                      // GET DATA FROM TABLE TO ADD TO CALENDAR 
                      addEvent({
                        // id: userTaskid,
                        title: todo, 
                        start: date
                      })
                      // IF CHECKBOX STATUS IS true/false strike through
                      // checkboxCell.checked = done;
                      // console.log(done)
                      // if(done){
                      //   tr.classList.add("strike"); 
                      // }else{
                      //   tr.classList.remove("strike");  
                      // }
                      // console.log(checkboxCell.done)
                      function deleteItem(){
                        // function dataDelete(){
                          // e.preventDefault();
                          fetch('http://localhost:3000/userdata', {
                            headers: {
                              'Accept':'application/json',
                              'Content-Type':'application/json'
                            },
                            method: 'DELETE',
                            body: JSON.stringify({id:userTaskid}) 
                          })
                          console.log("I have been deleted")
                          console.log({id:userTaskid})
                          // }
                          //event remove from calendar
                          calendar.getEventById(this.id).remove();
                          // save();
                          tr.remove();
                      // }
                  }
              })
            // renderRow(todo, date, userTaskid)
            
          })
        // function renderRow({ usertask: dataTask, date: dataDate, id, done}){
  
        // // adding table
        //   let table = document.getElementById("todoTable");
        //   let tr = document.createElement("tr");
        //     table.appendChild(tr);
        //   // checkbox
        //   // let checkboxCell = document.createElement("input");
        //   //   checkboxCell.type = "checkbox";
        //   //   checkboxCell.addEventListener("click", checkboxCallback, false);
        //     // checkboxCell.dataset.id = id
        //   // let td1 = document.createElement("td");
        //     // td1.appendChild(checkboxCell);
        //     // tr.appendChild(td1);
        //   // to-do cell
        //   let td2 = document.createElement("td");
        //     td2.innerText = dataTask;
        //     tr.appendChild(td2);
        //   // date cell
        //   let dateCell = document.createElement("td");
        //   let dateObj = new Date(dataDate)
        //   let dateFormat = dateObj.toLocaleDateString("en-GB", {
        //     day: "numeric",
        //     month: "short",
        //   })
        //   dateCell.innerText = dateFormat;
        //     tr.appendChild(dateCell);
        //   // delete cell
        //   let spanElem = document.createElement("span");
        //     spanElem.className = "far fa-trash-alt";
        //     spanElem.addEventListener("click", deleteItem, false);
        //     spanElem.dataset.id = id;
        //   let td4 = document.createElement("td");
        //     td4.appendChild(spanElem);
        //     tr.appendChild(td4);
  
        //     // GET DATA FROM TABLE TO ADD TO CALENDAR 
        //     addEvent({
        //       id: id,
        //       title: taskValue, 
        //       start: dateValue
        //     })
        //     // IF CHECKBOX STATUS IS true/false strike through
        //     // checkboxCell.checked = done;
        //     // console.log(done)
        //     if(done){
        //       tr.classList.add("strike"); 
        //     }else{
        //       tr.classList.remove("strike");  
        //     }
        //     // console.log(checkboxCell.done)
        //     function deleteItem(e){
        //       // function dataDelete(){
        //         e.preventDefault();
        //         fetch('http://localhost:3000/userdata', {
        //           headers: {
        //             'Accept':'application/json',
        //             'Content-Type':'application/json'
        //           },
        //           method: 'DELETE',
        //           body: JSON.stringify({id:this.dataset.id}) 
        //         })
        //         console.log("I have been deleted")
        //         console.log({id:this.dataset.id})
        //         // }
        //         //event remove from calendar
        //         calendar.getEventById(this.dataset.id).remove();
        //         // save();
        //         tr.remove();
        //       }
        // }
      }
// let todoObj= []
// console.log(todoObj)
    //RENDERING TASK TABLE
      // function renderRow({ usertask: taskValue, date: dateValue, id, done}){
        // console.log(dataArray)
      // function renderRow(){

      // // adding table
      //   let table = document.getElementById("todoTable");
      //   let tr = document.createElement("tr");
      //     table.appendChild(tr);
      //   // checkbox
      //   let checkboxCell = document.createElement("input");
      //     checkboxCell.type = "checkbox";
      //     checkboxCell.addEventListener("click", checkboxCallback, false);
      //     // checkboxCell.dataset.id = id
      //   let td1 = document.createElement("td");
      //     td1.appendChild(checkboxCell);
      //     tr.appendChild(td1);
      //   // to-do cell
      //   let td2 = document.createElement("td");
      //     td2.innerText = taskValue;
      //     tr.appendChild(td2);
      //   // date cell
      //   let dateCell = document.createElement("td");
      //   let dateObj = new Date(dateValue)
      //   let dateFormat = dateObj.toLocaleDateString("en-GB", {
      //     day: "numeric",
      //     month: "short",
      //   })
      //   dateCell.innerText = dateFormat;
      //     tr.appendChild(dateCell);
      //   // delete cell
      //   let spanElem = document.createElement("span");
      //     spanElem.className = "far fa-trash-alt";
      //     spanElem.addEventListener("click", deleteItem, false);
      //     spanElem.dataset.id = id;
      //   let td4 = document.createElement("td");
      //     td4.appendChild(spanElem);
      //     tr.appendChild(td4);

      //     // GET DATA FROM TABLE TO ADD TO CALENDAR 
      //     addEvent({
      //       id: id,
      //       title: taskValue, 
      //       start: dateValue
      //     })
      //     // IF CHECKBOX STATUS IS true/false strike through
      //     checkboxCell.checked = done;
      //     // console.log(done)
      //     if(done){
      //       tr.classList.add("strike"); 
      //     }else{
      //       tr.classList.remove("strike");  
      //     }
      //     // console.log(checkboxCell.done)
      //     function deleteItem(e){
      //       // function dataDelete(){
      //         e.preventDefault();
      //         fetch('http://localhost:3000/userdata', {
      //           headers: {
      //             'Accept':'application/json',
      //             'Content-Type':'application/json'
      //           },
      //           method: 'DELETE',
      //           body: JSON.stringify({id:this.dataset.id}) 
      //         })
      //         console.log("I have been deleted")
      //         console.log({id:this.dataset.id})
      //         // }
      //         //event remove from calendar
      //         calendar.getEventById(this.dataset.id).remove();
      //         // save();
      //         tr.remove();
      //       }
      //     //GETTING SUPABASE TO SAVE DONE STATUS
      //     // console.log(done)
      //     function checkboxCallback(){
      //       tr.classList.toggle("strike"); 
      //       if (todoList.id == this.dataset.id);
      //       // done = !done
      //       fetch('http://localhost:3000/userdata/${userdata.done}', {
      //         method: 'PUT',
      //         headers: {
      //           'Accept':'application/json',
      //           'Content-Type':'application/json'
      //         },
      //         body: JSON.stringify({done: done})
      //       })
      //       // update()
      //       // save()
      //       console.log(id)
      //       console.log(done)
      //       // console.log(save)
      //     }
      //   }
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
            // selectMirror: true,
            // editable:true,
            events: [],
          });
      
          calendar.render();
          // calendar.addEvent( data );
    }  
    // ADD EVENTS TO CALENDAR
    function addEvent(event){
      calendar.addEvent( event )
    }
  }

//API FOR TO-DO LIST
  fetch('http://localhost:3000/tasks')
  .then(response =>response.json())
  .then(response =>{ 
    let data = response
    let selectData = document.getElementById('selectData')
      for (let i = 0; i < data.length; i++) {
        const el = data[i];
        selectData.innerHTML += `
            <option>${el.task}</option>  `
        }
      })

// EDIT TASKS
// add task to option
fetch('http://localhost:3000/tasks')
.then(response =>response.json())
.then(data =>{ 
  let editData = document.getElementById('editTaskList')
  data.forEach(task =>{
    editData.innerHTML += `
        <option id="${task.id}">${task.task}</option>`
    })
  })
// DELETE TASKS
let deleteBtn = document.getElementById('removeTask')
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(`You have clicked this button ${deleteBtn}`)
    // console.log(deleteBtn.parentElement.id)
    // let taskCall = document.getElementsByTagName()
    let taskId = document.getElementById(`${task.id}`)
    console.log(`ready to delete ${taskId}`)
    // fetch('http://localhost:3000/tasks/${el.id}', {
    //   METHOD: 'DELETE'
        // headers: {
        //   'Content-type': 'application/json'
        // }
    // })
      })

// ADD TASKS
let addTaskBtn = document.getElementById('addTaskBtn')
addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("i have been pressed:  added btn")
  const taskAdded = document.getElementById('taskAdded').value
  console.log(taskAdded)
  fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({task:taskAdded})
  })
  .then(res => res.json())
  .then(data => console.log(data))
})


// LOGOUT
// error coming out null in console log
  const logoutButton = document.getElementById('logoutBtn')
  console.log(logoutButton)
  logoutButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const { error } = await supabase.auth.signOut(
        {redirectTo:"backEnd/html/login.html"}
      )
      console.log("bye")
      console.log(error)
  })

// end of DOM load
})
