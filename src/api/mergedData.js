import { deleteBook, getSingleBook } from './bookData';
import { deleteSingleAuthor, getbooksByAuthor, getSingleAuthor } from './authorData';

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
      getbooksByAuthor(authorObject.firebaseKey)
        .then((bookObject) => {
          resolve({ bookObject, ...authorObject });
        });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId, uid) => new Promise((resolve, reject) => {
  getbooksByAuthor(authorId).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId, uid).then(resolve);
    });
  }).catch((error) => reject(error));
});
export {
  viewBookDetails,
  viewAuthorDetails,
  deleteAuthorBooks
};
