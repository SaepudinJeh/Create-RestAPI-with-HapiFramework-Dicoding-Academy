const {
  addBookHandler,
  getAllBooksHandler,
  editBookByIdHandler,
  getBookByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{booksId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{booksId}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
