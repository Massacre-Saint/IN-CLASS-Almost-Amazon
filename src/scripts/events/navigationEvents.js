import { getAuthors, getFavoriteAuthor } from '../../api/authorData';
import { booksOnSale, getBooks } from '../../api/bookData';
import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';
import signOut from '../helpers/auth/signOut';

const navigationEvents = (uid) => {
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then((saleBooksArray) => showBooks(saleBooksArray));
  });

  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then((booksArray) => showBooks(booksArray));
  });

  document.querySelector('#favorite').addEventListener('click', () => {
    getFavoriteAuthor(uid).then((favoriteArray) => showAuthors(favoriteArray));
  });

  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then((authorsArray) => showAuthors(authorsArray));
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('input', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);
    if (e.keyCode === 13) {
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
