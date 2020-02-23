class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //Create TR element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));
    //Get a parrent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(div, form);
    //Disapear after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

/Add Event Listners for add book
document.getElementById('book-form').addEventListener('submit',
  function (e) {
    //Get form values
    const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if (title === '' || author === '' || isbn === '') {
      //Error Alert
      ui.showAlert('Please fill in all fields', 'error')
    } else {
      //Addd book to list
      ui.addBookToList(book);

      //Show Sucsess
      ui.showAlert('Book Added!', 'success');

      //Cleat Fields
      ui.clearFields();
    }

    e.preventDefault();
  });

//Add event listner for delete
document.getElementById('book-list').addEventListener('click', function (e) {

  const ui = new UI();
  //Delete book
  ui.deleteBook(e.target);

  //Showw message
  ui.showAlert('Book removed', 'success')

  e.preventDefault();
})


