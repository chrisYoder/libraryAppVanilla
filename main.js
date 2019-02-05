'use strict';

class Book {
    constructor(title, author, owner) {
        this.title = title;
        this.author = author;
        this.owner = owner;
    }

    addBook(){
        let books = JSON.parse(localStorage.getItem('books'));
        let entry = {
            'title' : this.title,
            'author': this.author,
            'owner' : this.owner
        };

        books.push(entry);
        localStorage.setItem('books', JSON.stringify(books));
    }

    deleteBook(target){ //this is broken
        console.log(target.rowIndex);
      if(target.className === 'delete'){
        let books = JSON.parse(localStorage.getItem('books'));
        
        books.forEach(book => {
            
            if(book.title === target.previousElementSibling.previousElementSibling.previousElementSibling.innerText){
                
                // books.splice(book, 1);
                // localStorage.setItem('books', JSON.stringify(books));
            }
          });
        
        
        }
    }
}

class UI {
    render(){
        let books;
        const bookList = document.getElementById("bookList");
        const frag = document.createDocumentFragment();

        if(localStorage.length === 1) {
            books = JSON.parse(localStorage.getItem('books'));
            console.log(books.length);
        }
        else{
            books = JSON.parse(localStorage.getItem('filteredBooks'));
        }

        bookList.innerHTML = '';
        books.forEach( book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="bookTitle">${book.title}</td>
                <td>${book.author}</td>
                <td>${book.owner}</td>
                <td class="delete">X</td>`;
            frag.appendChild(row);
        });

        bookList.appendChild(frag);
        
    }

    showAlert(message, className){
        alert(`${className}: ${message}`);
    }

    clearAddBookFields(){
        document.getElementById('aTitleInput').value = '';
        document.getElementById('aAuthorInput').value = '';
        document.getElementById('aOwnerInput').value = '';
        document.getElementById('aTitleInput').focus();
    }
}



class Search{
    static search(elementId, field) {
        const books = JSON.parse(localStorage.getItem("books"));
        const searchValue = document.getElementById(elementId).value;
        const totalBooks = books.length;
        const filteredBooks = books.filter(book => book[field].toLowerCase().includes(searchValue.toLowerCase()));
        
        
        localStorage.setItem("filteredBooks", JSON.stringify(filteredBooks));
    
    
        ui.render();
    
         localStorage.removeItem("filteredBooks");
    
        if (elementId.value === '') { ui.render }
    }
    

    static titleSearch() {
        this.search("sTitleInput", "title");
    }

    static authorSearch() {
        this.search("sAuthorInput", "author");
    }

    static ownerSearch() {
        this.search("sOwnerInput", "owner");
    }
}


/*Main Script*/

const ui = new UI();
// const book = new Book(title, author, owner);

// good
window.addEventListener('load', () => {
  if(localStorage.hasOwnProperty('books') === false) {
        localStorage.setItem('books', '[]');
    }
    else{
        
        ui.render();
    }
});
    



// good
document.getElementById('addSubmitBtn').addEventListener('click', () => {
    const title = document.getElementById('aTitleInput').value;
    const author = document.getElementById('aAuthorInput').value;
    const owner = document.getElementById('aOwnerInput').value;

    const book = new Book(title, author, owner);

    if(title === '' || author === '' || owner === ''){
      ui.showAlert('Please fill in all fields', 'Error');
    }
    else{
      book.addBook(title, author, owner);
      ui.render();
      ui.clearAddBookFields();
    }
});


// good
document.getElementById('bookList').addEventListener('click', (e) => {
    const book = new Book();
    book.deleteBook(e.target);
    ui.render();
    
});

/*Search functionality*/

/*Title*/
document.getElementById('sTitleInput').addEventListener('keyup', () => Search.titleSearch());

/*Author*/
document.getElementById('sAuthorInput').addEventListener('keyup', () => Search.authorSearch());

/*Owner*/
document.getElementById('sOwnerInput').addEventListener('keyup', () => Search.ownerSearch());

