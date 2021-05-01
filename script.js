//Create our library
let library = [];
let canStore;

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

    return (`${this.title}, by ${this.author}. \n Number of Pages: ${this.pageCount}. \n Status: ${read}`);
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

    if (canStore) {
        saveData();
    }
    
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
    if (book.readStatus === true) {
        newBook.classList.add("read");
        newBook.classList.remove("not-read");
    } else {
        newBook.classList.remove("read");
        newBook.classList.add("not-read");
    }


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
    const author = document.createElement("h2");
    const numPages = document.createElement("h2");
    const dividerLine = document.createElement("div");
    
    if (book.readStatus === true) {
        bookDiv.classList.add('cover-view-read');
    } else {
        bookDiv.classList.add('cover-view');
    }
    
    bookDiv.id = "book";

    title.textContent = `${book.title}`;
    title.id = "book";

    author.textContent = `Written by \n ${book.author}`;
    author.id = "book";

    numPages.textContent = `Page Count: ${book.pageCount}`;
    numPages.id = "book";

    dividerLine.classList.add('bar');
    dividerLine.id = "book";

    rightSide.appendChild(bookDiv);
    bookDiv.appendChild(title);
    bookDiv.appendChild(dividerLine);
    bookDiv.appendChild(author);
    bookDiv.appendChild(numPages);

    inputForm.classList.remove('active');

}

//Unhide add book form
function createNew() {
    inputForm.classList.add('active');
}

///Removes book and dom elements at the index of x in library
function removeBook(book) {
    library.splice(library.indexOf(book), 1);
    saveData();
    render(book);
    
}

//Save local data
function saveData() {
    localStorage.setItem("library", JSON.stringify(library));
}


//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.library) {
        render();
    }else {
        let objects = localStorage.getItem('library')
        objects = JSON.parse(objects);
        library = objects;
        render();
    }
}
