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

    getBooks(){
        let books = JSON.parse(localStorage.getItem('books'));
    }
}

class UI {
    render(){
        let books = JSON.parse(localStorage.getItem('books'));
        const bookList = document.getElementById("bookList");
        const frag = document.createDocumentFragment();

        books.forEach( book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.owner}</td>
                <td><a href="" class="delete">X</td>`;
            frag.appendChild(row);
        });

        bookList.appendChild(frag);
    }

    showAlert(message, className){
        alert(`${this.className}: ${this.message}`);
    }

    delete(target){
        let books = JSON.parse(localStorage.getItem('books')); //should give an arr
        let targetIndex = books.indexOf(target);
        books.splice(targetIndex, 1);
        target.parentElement.parentElement.remove();
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




function setStorageAndTableData(){
    if(localStorage.hasOwnProperty('books') === false) {
        localStorage.setItem('books', '[]');
    }
    else{
        let ui = new UI;
        ui.render();
    }
}

document.getElementById('addSubmit').addEventListener('submit', function() {
    const title = document.getElementById('aTitleInput').value;
    const author = document.getElementById('aAuthorInput').value;
    const owner = document.getElementById('aOwnerInput').value;

    const book = new Book(title, author, owner);
    const ui = new UI;

    books.addBook(title, author, owner);
    ui.render();
})
