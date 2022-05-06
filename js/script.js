/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
// Defining objects count 

const objectCount = 9

//This function will create and insert/append the elements needed to display a "page" of nine students

const displayPage = (list, page) => {
   const startIndex = page*objectCount - objectCount 
   const endIndex = page*objectCount
   const ul = document.querySelector(".student-list")
   ul.innerHTML = ""
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const info = list[i]
         const li = document.createElement("li")
         li.className = "student-item cf"
         li.insertAdjacentHTML("beforeend", `
            <div class="student-details">
            <img class="avatar" src=${info.picture.medium} alt="Profile Picture">
            <h3>${info.name.first} ${info.name.last}</h3>
            <span class="email">${info.email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${info.registered.date}</span>
            </div>`)
         ul.appendChild(li)
      }
   }
}

//This function will create and insert/append the elements needed for the pagination buttons

const displayButtons = (list) => {
   const numOfPages = list.length / objectCount 
   const ul = document.querySelector(".link-list")
   ul.innerHTML = ""
   for (let i = 0; i <= numOfPages; i++) {
      const li = document.createElement("li")
      li.insertAdjacentHTML("beforeend", `
         <button type="button">${i+1}</button>
      `)
      ul.appendChild(li)
   }
   document.querySelector("button").className = "active"
   ul.addEventListener("click", (e) => {
      if (e.target.type === "button") {
         document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"))
         e.target.className = "active"
         displayPage(list, e.target.innerHTML)
      }
   })
}

// Filter function - filtering first and last name based on input value

const filterInput = (list) => {
   const header = document.querySelector(".header")
   header.insertAdjacentHTML("beforeend", `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `)
   let inputValue = ""
   const input = document.querySelector("#search")
   input.addEventListener("keyup", e => {
      inputValue = e.target.value
      console.log(inputValue)
      const filteredList = list.filter(person => {return person.name.first.toLowerCase().includes(inputValue.toLowerCase()) ||
         person.name.last.toLowerCase().includes(inputValue.toLowerCase())})
      displayPage(filteredList, 1)
      if (filteredList.length == 0) {
         const ul = document.querySelector(".student-list")
         ul.innerHTML = "No results found."
      }
      if (filteredList.length > 9) {
         displayButtons(filteredList)
      } else {
         const ul = document.querySelector(".link-list")
         ul.innerHTML = ""
      }
      
   })
}

// Call functions

displayPage(data, 1)
displayButtons(data)
filterInput(data)