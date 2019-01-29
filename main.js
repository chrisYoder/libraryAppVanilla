class Book {
    constructor(title, author, owner) {
        this.title = title;
        this.author = author;
        this.owner = owner;
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


function setStorage(){
    if(localStorage.hasOwnProperty('books') === false) {
        localStorage.setItem('books', '[]');
    }
    else{
        let ui = new UI;
        ui.render();
    }
}


