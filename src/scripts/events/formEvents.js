import { createAuthor, getAuthors, updateAuthor } from '../../api/authorData';
import { createBook, getBooks, updateBook } from '../../api/bookData';
import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.id.includes('submit-book')) {
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        uid
      };
      createBook(bookObject, uid).then((booksArray) => showBooks(booksArray));
    }

    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const bookObj = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        firebaseKey,
        uid
      };
      updateBook(bookObj, uid).then(() => {
        getBooks(uid).then((response) => showBooks(response));
      });
    }

    if (e.target.id.includes('submit-author')) {
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favAuthor').checked,
        uid
      };
      createAuthor(authorObject, uid).then((authorsArray) => showAuthors(authorsArray));
    }
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      const authorObj = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favAuthor').checked,
        firebaseKey,
        uid
      };
      updateAuthor(authorObj, uid).then(() => {
        getAuthors(uid).then((response) => showAuthors(response));
      });
    }
  });
};

export default formEvents;
