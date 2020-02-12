// Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);

}

// Get Books From Local Storage
UI.prototype.getBooksFromLocalStorage = function () {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

// Store Books To Local Storage
UI.prototype.storeBooksInLocalStorage = function(book) {
    // Instantiate UI
    const ui = new UI();

    const books = ui.getBooksFromLocalStorage();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

// Display books from Local Storage
UI.prototype.displayBooks = function() {
    // Instantiate UI
    const ui = new UI();
    const books = ui.getBooksFromLocalStorage();

    books.forEach(function(book) {
        const ui = new UI;

        // Add book to UI
        ui.addBookToList(book);
    });
}

// Remove books from Local Storage
UI.prototype.removeBook = function(isbn) {
    // Instantiate UI
    const ui = new UI();

    const books = ui.getBooksFromLocalStorage();

    books.forEach(function(book, index) {
        if(book.isbn === isbn) {
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}



// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add Book to list
        ui.addBookToList(book);

        // Add to Local Storage
        ui.storeBooksInLocalStorage(book);

        // Show success
        ui.showAlert('Book Added', 'success');
        // Clear Fields
        ui.clearFields();
    }



    e.preventDefault();
});


// Event listener for delete 
document.getElementById('book-list').addEventListener('click', function(e) {
    
    // Instantiate UI
    const ui = new UI();
    
    if(e.target.className === 'delete') {
        ui.deleteBook(e.target);

        // Remove from local storage
        ui.removeBook(e.target.parentElement.previousElementSibling.textContent);

        //Show Alert
        ui.showAlert('Book Removed', 'success');
    }
    

    e.preventDefault();
});


// DOM load event
document.addEventListener('DOMContentLoaded', function () {
    // Instantiate UI
    const ui = new UI();
    ui.displayBooks();
});