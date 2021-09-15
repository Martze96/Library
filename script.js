// Form noch schön machen
const main = document.querySelector('.main');
const readCheckBox = document.querySelector(".readCheckBox");
const addBookButton = document.querySelector(".addBookButton");

const formWindow = document.querySelector(".form");
const formAbortButton = document.querySelector(".formAbortButton");
const formCreateButton = document.querySelector(".formCreateButton");

const inputTitle = document.querySelector("#inputTitle");
const inputAuthor = document.querySelector("#inputAuthor");
const inputPages = document.querySelector("#inputPages");
const inputRead = document.querySelector("#inputRead");

let myLibrary = [];

//Book Constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
// Load Data if Local Storage not empty
if(window.localStorage.length != 0) {
    let data = JSON.parse(window.localStorage.getItem('Library'));
    console.log(data);
    for( let i = 0; i < data.length; i++){
        addBookToLibrary(data[i].title,data[i].author,data[i].pages,data[i].read);
    }
} else {
    addBookToLibrary("The Pragmatic Programmer","David Thomas",308,true);
}


addBookButton.addEventListener("click", () => {
    // add transition?
    openForm();
})

formCreateButton.addEventListener("click", () => {
    addBookToLibrary(inputTitle.value,inputAuthor.value,inputPages.value,inputRead.checked);
    formWindow.style.display = "none";
    resetForm();
    displayBooks();
})

formAbortButton.addEventListener("click", () => {
    formWindow.style.display = "none";
    resetForm();
})

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    updateLocalDB();
}
/*
addBookToLibrary('Die Bibel', 'Jesus', 980, true);
addBookToLibrary('Clean Code', 'Steve Wozniak', 350, false);
addBookToLibrary('Superbook', 'Superman', 99, false);
addBookToLibrary('Handbuch', 'OBI', 19, true);
*/
function deleteBook(index) {
    myLibrary.splice(index,1);
    updateLocalDB();
    displayBooks();
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    updateLocalDB();
}


function displayBooks() {

    main.innerHTML = "";

    for( let j = 0; j < myLibrary.length; j++){
        if(myLibrary[j] == null){
            continue;
        }
        card = document.createElement("div");
        card.setAttribute('class','card');
        card.style.backgroundImage = 
        
        title = document.createElement("div");
        title.setAttribute("class","title");
        title.innerHTML = '"' + myLibrary[j].title + '"';
        
        author = document.createElement("div");
        author.setAttribute("class","author");
        author.innerHTML = myLibrary[j].author;
        
        pages = document.createElement("div");
        pages.setAttribute("class","pages");
        pages.innerHTML = 'Pages: ' + myLibrary[j].pages;
        
        readToggle = document.createElement("input");
        readToggle.setAttribute("type","checkbox");
        readToggle.setAttribute("class","readCheckBox");
        readToggle.setAttribute("data-index",j);
        readToggle.checked = myLibrary[j].read;
    

        read = document.createElement("div");
        read.setAttribute("class","read");
        read.innerHTML = 'Read: ';

        deleteButton = document.createElement("span");
        deleteButton.setAttribute("class","button deleteButton");
        deleteButton.setAttribute("data-delete-index",j);
        deleteButton.innerHTML = "Delete Book";
        
        
        deleteButton.addEventListener("click", (e) => {
            deleteBook(e.target.getAttribute('data-delete-index'));
        })

        readToggle.addEventListener("change", (e) => {
            toggleRead(e.target.getAttribute("data-index"));
        })

        read.append(readToggle);
        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(read);
        card.append(deleteButton);
        main.append(card);
    }

}

function resetForm(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = null;
    inputRead.checked = false;
}


function openForm() {
    formWindow.style.display = "block";
}

function updateLocalDB(){
    localStorage.setItem('Library',JSON.stringify(myLibrary));
}

displayBooks();

