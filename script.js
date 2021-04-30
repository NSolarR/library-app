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

//Add a new book to library
function addBook () {
    //Create new Book object and add to library array
    let book = new Book (inputForm[0].value, inputForm[1].value, inputForm[2].value, inputForm[3].checked);
    library.push(book);

    //Create new elements
    const newBook = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const buttonHolder = document.createElement("div");

    //Set element content and styles
    deleteButton.textContent = "Delete";

    editButton.textContent = "Edit";

    newBook.textContent = `${book.info()}`
    newBook.style.backgroundColor = "gray";

    buttonHolder.style.display = "flex";
    buttonHolder.style.flexDirection = "row";

    //Append elements to the bookBar
    bookBar.appendChild(newBook);
    newBook.appendChild(buttonHolder);

    buttonHolder.appendChild(editButton);
    buttonHolder.appendChild(deleteButton);

    inputForm.classList.remove('active');

    mainBookView();
}

//Unhide add book form
function createNew() {
    inputForm.classList.add('active');
}

//Show full scale books in main view
function mainBookView() {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add('cover-view');

    rightSide.appendChild(bookDiv);
}