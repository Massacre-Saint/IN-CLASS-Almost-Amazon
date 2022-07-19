import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createAuthor = (authorObj, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(() => {
          getAuthors(uid).then(resolve);
        });
    }).catch(reject);
});

const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getFavoriteAuthor = (uid) => new Promise((resolve, reject) => {
  getAuthors(uid)
    .then((userAuthors) => {
      const favAuthors = userAuthors.filter((author) => author.favorite);
      resolve(favAuthors);
    }).catch((error) => reject(error));
});

const deleteSingleAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors(uid).then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

const updateAuthor = (authorObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj)
    .then(() => getAuthors(uid).then(resolve))
    .catch(reject);
});

const getbooksByAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`)
    .then((response) => {
      const filteredResponse = Object.values(response.data).filter((item) => item.uid === uid);
      resolve(filteredResponse);
    })
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  getFavoriteAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getbooksByAuthor
};
