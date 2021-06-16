const {
  addBookHandler,
  getAllBooksHandler,
  editBookByIdHandler,
  getBookByIdHandler,
  deleteBookByIdHandler,
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
    path: '/books/{booksId}',
    handler: deleteBookByIdHandler,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Halaman tidak ditemukan',
  },
];

module.exports = routes;
