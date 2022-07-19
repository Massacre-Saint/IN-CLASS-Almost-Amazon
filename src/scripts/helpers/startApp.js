import { getBooks } from '../../api/bookData';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import { showBooks } from '../components/pages/books';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';

const startApp = (user) => {
  domBuilder();
  domEvents(user.uid);
  formEvents(user.uid);
  navBar();
  logoutButton();
  navigationEvents(user.uid);
  getBooks(user.uid).then((booksArray) => showBooks(booksArray));
};

export default startApp;
