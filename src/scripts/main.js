import checkLoginStatus from './helpers/checkLoginStatus';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  checkLoginStatus();
};

init();
