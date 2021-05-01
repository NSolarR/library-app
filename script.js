//Create our library
let library = [];

//Get reference to input
const inputForm = document.getElementById("input-form");
const bookBar = document.getElementById("left");
const rightSide = document.getElementById("right");

//Create book constructor
function Book (title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
}

//Adds a function to book constructor that returns a string of information on your book.
Book.prototype.info = function () {
    let read;
  
    if (this.readStatus === true) {
        read = "Finished";
    } else {
        read =  "Still Reading"
    }

    return (`${this.title}, by ${this.author}. # of Pages: ${this.pageCount}. Status: ${read}`);
};

//Adds a function to books to toggle read status
Book.prototype.readToggle = function() {
    if (this.readStatus === true) {
        this.readStatus = false;
    } else {
        this.readStatus = true;
    }
}

//Add a new book to library
function addBookToLibrary () {
    //Create new Book object and add to library array
    let book = new Book (inputForm[0].value, inputForm[1].value, inputForm[2].value, inputForm[3].checked);
    library.push(book);

    render();
}

function render(){
    //Destroys all book id elements when run and then remakes them
    document.querySelectorAll('#book').forEach(e => e.remove());

    library.forEach(book => {
        createBook(book);
    });
}

function createBook (book) {
    //Create new elements
    const newBook = document.createElement("p");
    const statusButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const buttonHolder = document.createElement("div");

    //Set element content and styles
    deleteButton.textContent = "Delete";
    deleteButton.id = "book";
    deleteButton.addEventListener('click', () => {removeBook(book);})
    
    statusButton.textContent = "Toggle read Status";
    statusButton.id = "book";
    statusButton.addEventListener('click', () => {book.readToggle();
        render(book);});

    newBook.textContent = `${book.info()}`
    newBook.style.backgroundColor = "gray";
    newBook.id = "book";

    buttonHolder.style.display = "flex";
    buttonHolder.style.flexDirection = "row";
    buttonHolder.id = "book";

    //Append elements to the bookBar
    bookBar.appendChild(newBook);
    newBook.appendChild(buttonHolder);

    buttonHolder.appendChild(statusButton);
    buttonHolder.appendChild(deleteButton);

    //Right side
    const bookDiv = document.createElement("div");
    const title = document.createElement("h1");

    bookDiv.classList.add('cover-view');
    bookDiv.id = "book";

    title.textContent = `${book.title}`;
    title.id = "book";

    rightSide.appendChild(bookDiv);
    bookDiv.appendChild(title);

    inputForm.classList.remove('active');

}

//Unhide add book form
function createNew() {
    inputForm.classList.add('active');
}

///Removes book and dom elements at the index of x in library
function removeBook(book) {
    library.splice(library.indexOf(book), 1);
    render(book);
    saveData();
}

function saveData() {

}