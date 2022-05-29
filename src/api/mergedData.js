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
      getbooksByAuthor(authorObject.firebaseKey) /* need to dot notate to access */
        .then((bookObject) => {
          resolve({ bookObject, ...authorObject }); /* Look this spread up in the video */
        });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getbooksByAuthor(authorId).then((booksArray) => {
    console.warn(booksArray, 'Author Books');
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => { /* we don't need anything in then() because we aren't doing anything with the deleted books */
      deleteSingleAuthor(authorId).then(resolve);
    // deleteSingleAuthor(authorId).then((response) =>resolve(response));
    });
  }).catch((error) => reject(error));
});
export {
  viewBookDetails,
  viewAuthorDetails,
  deleteAuthorBooks
};
