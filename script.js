let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead
}

Book.prototype.toggleRead = function() {
    this.hasRead = !this.hasRead;
}

//addBook('The Hobbit', 'J.R.R. Tolkien', 295, false);
//addBook('Lord of the Rings', 'J.R.R. Tolkien', 4999, true);

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('book-add').addEventListener('click', (event) => {
        // Add form validation
        let title = document.getElementById('book-title').value;
        let author = document.getElementById('book-author').value;
        let pages = document.getElementById('book-pages').value;
        let read = document.getElementById('book-read').checked;
    
        clearForm();
        addBook(title, author, pages, read);
        displayBooks();
    });

    document.getElementById('sample-add').addEventListener('click', (event) => {
        clearForm();
        addSampleBook();
        displayBooks();
    });

    document.getElementById('show-hide').addEventListener('click', showAddDialog);
}

function addSampleBook() {
    addBook(`You Don't Know JS Yet: Get Started`, 'Kyle Simpson', 143, false);
    addBook(`You Don't Know JS Yet: Scope & Closures`, 'Kyle Simpson', 279, false);
    addBook(`Lokal Digital Unschlagbar: Wie Sie Ihr Unternehmen mit digitalem Marketing vor Ort an die Spitze führen`, 'Patrick Hünemohr', 256, true);
}

function addBook(title, author, pages, hasRead) {
    let mandatoryFieldMissing = false;

    if (!title) {
        document.getElementById('book-title-hint').innerText = 'Please enter a title';
        mandatoryFieldMissing = true;
    } else {
        document.getElementById('book-title-hint').innerText = null;
    }

    if (!author) {
        document.getElementById('book-author-hint').innerText = 'Please enter an author';
        mandatoryFieldMissing = true;
    } else {
        document.getElementById('book-author-hint').innerText = null;
    }

    if (!pages) {
        document.getElementById('book-pages-hint').innerText = 'Please enter the number of pages'
        mandatoryFieldMissing = true;
    } else {
        document.getElementById('book-pages-hint').innerText = null;
    }

    if (mandatoryFieldMissing) {
        return;
    }

    let newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
}

function clearForm() {
    document.getElementById('book-form').reset();
}

function clearList() {
    // Clear the list of books
    if (document.getElementById('books-anchor') != null) {
        document.getElementById('books-anchor').remove();
    }
}

// EVENT HANDLERS

function showAddDialog(event) {
    let upperLayer = document.querySelector('.entry');
  
    if (upperLayer.style.maxHeight) {
        upperLayer.style.maxHeight = null;
        upperLayer.style.padding = null;
    } else {
        upperLayer.style.maxHeight = upperLayer.scrollHeight + "px";
        upperLayer.style.padding = "25px";
    }

    document.getElementById('show-hide-icon').classList.toggle('turned');
}

function removeBook(event) {
    let index = event.target.parentElement.parentElement.getAttribute('data-index');
    myLibrary.splice(index, 1);
    displayBooks();
}

function updateReadStatus(event) {
    let index = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
    myLibrary[index].toggleRead();

    if (myLibrary[index].hasRead) {
        event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle('has-been-read')
    } else {
        event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle('has-been-read')
    }

    event.target.parentElement.querySelector('span').innerText = myLibrary[index].hasRead ? 'Book has been read' : 'Book has not been read';
}

function displayBooks() {
    clearList();

    let domElemAnchor = document.createElement('div');
    domElemAnchor.id = 'books-anchor';

    myLibrary.forEach((book, index) => {
        // Book general
        let domElemBook = document.createElement('div');
        domElemBook.classList.add('book');
        if (book.hasRead) {
            domElemBook.classList.add('has-been-read')
        }
        domElemBook.setAttribute('data-index', index);

        // FIRST ROW

        // Title
        let domElemBookTitle = document.createElement('span');
        
        domElemBookTitle.innerText = book.title;

        domElemBookTitle.classList.add('title');

        // SECOND ROW

        let domElemSecondRowContainer = document.createElement('div');
        domElemSecondRowContainer.classList.add('second-row-container');

        // Author
        let domElemBookAuthorContainer = document.createElement('div');
        let domElemBookAuthorLabel = document.createElement('span');
        let domElemBookAuthorValue = document.createElement('span');        
                
        domElemBookAuthorLabel.innerText = "AUTHOR"
        domElemBookAuthorValue.innerText = book.author;

        domElemBookAuthorContainer.classList.add('author');
        domElemBookAuthorContainer.appendChild(domElemBookAuthorLabel);
        domElemBookAuthorContainer.appendChild(domElemBookAuthorValue);

        // Pages
        let domElemBookPagesContainer = document.createElement('div');
        let domElemBookPagesLabel = document.createElement('span');
        let domElemBookPagesValue = document.createElement('span');

        domElemBookPagesLabel.innerText = "PAGES"
        domElemBookPagesValue.innerText = book.pages;

        domElemBookPagesContainer.classList.add('pages');
        domElemBookPagesContainer.appendChild(domElemBookPagesLabel);
        domElemBookPagesContainer.appendChild(domElemBookPagesValue);

        domElemSecondRowContainer.appendChild(domElemBookAuthorContainer);
        domElemSecondRowContainer.appendChild(domElemBookPagesContainer);

        // THIRD ROW

        let domElemThirdRowContainer = document.createElement('div');
        domElemThirdRowContainer.classList.add('third-row-container');

        // Read status
        let domElemBookReadContainer = document.createElement('div');
        let domElemBookReadLabel = document.createElement('label');
        let domElemBookReadLabelText = document.createElement('span');
        let domElementMarkRead = document.createElement('input');

        domElemBookReadLabelText.innerText = book.hasRead ? 'Has been read' : 'Has not been read';
        domElementMarkRead.checked = book.hasRead;

        domElemBookReadContainer.classList.add('read');
        domElemBookReadLabel.classList.add('read-label');
        domElemBookReadLabel.setAttribute('for', 'checkbox' + index);
        domElementMarkRead.classList.add('read-toggle');
        domElementMarkRead.id = 'checkbox' + index;

        domElementMarkRead.setAttribute('type', 'checkbox');

        domElementMarkRead.addEventListener('click', updateReadStatus);

        domElemBookReadLabel.appendChild(domElementMarkRead);
        domElemBookReadLabel.appendChild(domElemBookReadLabelText);
        domElemBookReadContainer.appendChild(domElemBookReadLabel);

        // Remove 
        let domElemBookRemove = document.createElement('button');

        domElemBookRemove.classList.add('remove');
        domElemBookRemove.classList.add('material-icons');
        domElemBookRemove.classList.add('md-24');
        domElemBookRemove.innerText = 'delete';

        domElemBookRemove.addEventListener('click', removeBook);

        domElemThirdRowContainer.appendChild(domElemBookReadContainer);
        domElemThirdRowContainer.appendChild(domElemBookRemove);

        domElemBook.appendChild(domElemBookTitle);
        domElemBook.appendChild(domElemSecondRowContainer);
        domElemBook.appendChild(domElemThirdRowContainer);

        domElemAnchor.appendChild(domElemBook);
    });

    document.querySelector('.list').appendChild(domElemAnchor);
}

