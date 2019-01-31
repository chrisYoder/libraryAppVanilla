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
        }

        books.push(entry);
        localStorage.setItem('books', JSON.stringify(books));
    }


}

class UI {
    render(){
        let books;
        const bookList = document.getElementById("bookList");
        const frag = document.createDocumentFragment();



        if(localStorage.length === 1) {
            books = JSON.parse(localStorage.getItem('books'));
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

    deleteBook(target){


      if(target.className === 'delete'){
        let books = JSON.parse(localStorage.getItem('books'));

          books.forEach(book => {
            if(book.title === target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML){
              books.splice(book, 1);
              localStorage.setItem('books', JSON.stringify(books));
            }
          });

      }

    }

    clearAddBookFields(){
        document.getElementById('aTitleInput').value = '';
        document.getElementById('aAuthorInput').value = '';
        document.getElementById('aOwnerInput').value = '';
        document.getElementById('aTitleInput').focus();

    }

    clearSearchBookFields(){
        document.getElementById('sTitleInput').value = '';
        document.getElementById('sAuthorInput').value = '';
        document.getElementById('sOwnerInput').value = '';
        document.getElementById('sTitleInput').focus();
    }
}



class Search{
    titleSearch() {
        let index = 1;
        let books = JSON.parse(localStorage.getItem('books'));
        let filteredBooks = [];
        let searchValue = document.getElementById('sTitleInput').value;


        books.forEach(book => {
                if (book.title === searchValue) {
                    filteredBooks.push(book);
                }
        });

        localStorage.setItem('filteredBooks', JSON.stringify(filteredBooks));

        const ui = new UI();
        ui.render();

        localStorage.removeItem('filteredBooks');
    }

    authorSearch() {
        let index = 2;
        let books = JSON.parse(localStorage.getItem('books'));
        let filteredBooks = [];
        let searchValue = document.getElementById('sAuthorInput').value;


        books.forEach(book => {
                if (book.author === searchValue) {
                    filteredBooks.push(book);
                }
        });

        localStorage.setItem('filteredBooks', JSON.stringify(filteredBooks));

        const ui = new UI();
        ui.render();

        localStorage.removeItem('filteredBooks');
    }

    ownerSearch() {
        let index = 3;
        let books = JSON.parse(localStorage.getItem('books'));
        let filteredBooks = [];
        let searchValue = document.getElementById('sOwnerInput').value;


        books.forEach(book => {
                if (book.owner === searchValue) {
                    filteredBooks.push(book);
                }
        });

        localStorage.setItem('filteredBooks', JSON.stringify(filteredBooks));

        const ui = new UI();
        ui.render();

       localStorage.removeItem('filteredBooks');
    }
}

function setStorageAndTableData(){
    if(localStorage.hasOwnProperty('books') === false) {
        localStorage.setItem('books', '[]');
    }
    else{
        let ui = new UI();
        ui.render();
    }
}



document.getElementById('addSubmitBtn').addEventListener('click', function(e){
    const title = document.getElementById('aTitleInput').value;
    const author = document.getElementById('aAuthorInput').value;
    const owner = document.getElementById('aOwnerInput').value;

    const book = new Book(title, author, owner);
    const ui = new UI();

    if(title === '' || author === '' || owner === ''){
      ui.showAlert('Please fill in all fields', 'Error');
    }
    else{
      book.addBook(title, author, owner);
      ui.render();
      ui.clearAddBookFields();
    }
});

document.getElementById('searchSubmitBtn').addEventListener('click', function(e) {
    let search = new Search();

    if(document.getElementById('sTitleInput').value !== ''){
        search.titleSearch();
    }
    else if(document.getElementById('sAuthorInput').value !== ''){
        search.authorSearch();
    }
    else if(document.getElementById('sOwnerInput').value !== ''){
        search.ownerSearch();
    }
});

document.getElementById('bookList').addEventListener('click', function(e){
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.render();
});