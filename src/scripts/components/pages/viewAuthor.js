import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewAuthor = (authorObject) => {
  clearDom();
  const domString = `
  <div class="mt-5 d-flex flex-wrap">
    <div class="text-white ms-5 details d-flex flex-column">
      <h5>${authorObject.first_name} ${authorObject.last_name} ${authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
      Author Email: <a href="mailto:${authorObject.email}">${authorObject.email}</a>
      <div class="mt-5">
       <i id="update-author-btn--${authorObject.firebaseKey}" class="fas fa-edit btn btn-info"></i>
       <i id="delete-author-btn--${authorObject.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
      </div>
   </div>
  </div>;
  <hr>;
  <h5>Books</h5>`;
  renderToDOM('#view', domString);
  const book = authorObject.bookObject;
  console.warn(authorObject);
  let bookString = '';
  book.forEach((item) => {
    bookString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
        </div>
      </div>`;
  });
  renderToDOM('#store', bookString);
};

export default viewAuthor;
