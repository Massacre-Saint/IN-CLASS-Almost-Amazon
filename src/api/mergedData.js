import { getSingleBook } from './bookData';
import { getbooksByAuthor, getSingleAuthor } from './authorData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getbooksByAuthor(authorObject.firebaseKey) /* need to dot notate to access */
        .then((bookObject) => {
          resolve({ bookObject, ...authorObject }); /* Look this spread up in the video */
        });
    }).catch((error) => reject(error));
});

export {
  viewBookDetails,
  viewAuthorDetails
};
