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
        let books = JSON.parse(localStorage.getItem('books'));
        const bookList = document.getElementById("bookList");
        const frag = document.createDocumentFragment();



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
      //broken

      if(target.className === 'delete'){
        let books = JSON.parse(localStorage.getItem('books'));

          books.forEach(book => {
            if(book['title'] === target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML){
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

// var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("myTable");
//   tr = table.getElementsByTagName("tr");

//   // Loop through all table rows, and hide those who don't match the search query
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     if (td) {
//       txtValue = td.textContent || td.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }

class Search{
  titleSearch(){
    let input = document.getElementById('sTitleInput');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('bookTable');
    let tr = table.getElementsByTagName('tr');
    let textValue;

    for(let i = 0; i < tr.length; i++){
      td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
          tr[i].style.display='';
        }
        else{
          tr[i].style.display = 'none';
        }
      }
    }
  }

  authorSearch(){
    let input = document.getElementById('sAuthorInput');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('bookTable');
    let tr = table.getElementsByTagName('tr');
    let textValue;

    for(let i = 0; i < tr.length; i++){
      td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
          tr[i].style.display='';
        }
        else{
          tr[i].style.display = 'none';
        }
      }
    }
  }

  ownerSearch(){
    let input = document.getElementById('sOwnerInput');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('bookTable');
    let tr = table.getElementsByTagName('tr');
    let textValue;

    for(let i = 0; i < tr.length; i++){
      td = tr[i].getElementsByTagName('td')[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
          tr[i].style.display='';
        }
        else{
          tr[i].style.display = 'none';
        }
      }
    }
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



document.getElementById('bookList').addEventListener('click', function(e){
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.render();
})