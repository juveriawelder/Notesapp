console.log("Welcome to Notesapp. This is app.js");

// Show notes on initial load
shownotes();

// Event listener for adding a note
let addButtonElement = document.getElementById("addBtn");
addButtonElement.addEventListener("click", function (e) {
let addTextAreaElement = document.getElementById("addText");
let addTitleElement = document.getElementById("addTitle");
let notesObj = getNotes();
let myObj = {
    title: addTitle.value,
    text: addText.value,
    timestamp: new Date().toLocaleString(),
  };

  if (addText.value.length == "") {
    alert("Please enter something to note down");
  } else {
    notesObj.push(myObj);
    saveNotes(notesObj);
    addTitle.value = "";
    addText.value = "";
    shownotes();
  }
});

//function to get notes from local storage
function getNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      return []; //blank array
    } else {
      return JSON.parse(notes);
    }
}
 // Function to save a note to local storage
 function saveNotes(notesObj){
    localStorage.setItem("notes", JSON.stringify(notesObj));
 }

 
//function to show notes from local storage and display them
function shownotes() {
  let notesObj = getNotes();
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-3 mx-2 card ${
      element.bookmarked ? "bookmarked-card" : ""
    }" style="width: 16.3rem;">
                    <div class="card-body">
                        <span class="bookmark-icon" onclick="bookmarkNoteFunc(${index})">${
      element.bookmarked ? "🔖" : "📑"
    }</span>
                        <h6 class="card-title">Note ${index + 1}</h6>
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <p class="card-timestamp">${element.timestamp}</p>
                        <div class="d-flex">
                            <button id="${index}" onclick="editNoteFunc(this.id)" class="btn btn-dark btn-sm me-2">Edit Note</button>
                            <button id="${index}" onclick="deleteNoteFunc(this.id)" class="btn btn-dark btn-sm">Delete Note</button>
                        </div>
                    </div>
                </div>`;
  });
  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `Nothing to show, Use Add Note to create a Note.`;
  }
}

//function to delete a note
function deleteNoteFunc(index) {
  let notesObj = getNotes();
  notesObj.splice(index, 1);
  saveNotes(notesObj);
  //localStorage.setItem("notes", JSON.stringify(notesObj));
  shownotes();
}
// Function to edit a note
function editNoteFunc(index) {
  let notesObj = getNotes();
   let note = notesObj[index];
  addTitleElement.value = note.title;
  addTextAreaElement.value = note.text;
  notesObj.splice(index, 1);
  saveNotes(notesObj);
  shownotes();
}

// Function to bookmark a note
function bookmarkNoteFunc(index) {
  let notesObj = getNotes();
  notesObj[index].bookmarked = !notesObj[index].bookmarked;
  saveNotes(notesObj);
  shownotes();
}

//function to search a note
searchInputText = document.getElementById("searchInputText");
searchInputText.addEventListener("input", function () {
  let inputVal = searchInputText.value.toLowerCase();
  console.log("Input Event Fired", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
