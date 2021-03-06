const { nanoid } = require('nanoid');

const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // check body name
  if (newBook.name === '' || newBook.name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  // check readPage > pageCount
  if (newBook.readPage > newBook.pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  // Create Books
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  // get books by reading
  if (reading) {
    const filterReadingBooks = books.filter((book) => {
      return book;
    });

    const response = h.response({
      status: 'success',
      data: {
        books: filterReadingBooks.map((book) => {
          const dataBook = {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          };

          return dataBook;
        }),
      },
    });

    response.code(200);
    return response;
  }

  // get books finished
  if (finished) {
    const filterBooksFinished = books.filter((book) => {
      return book;
    });

    const response = h.response({
      status: 'success',
      data: {
        books: filterBooksFinished.map((book) => {
          const dataBook = {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          };

          return dataBook;
        }),
      },
    });

    response.code(200);
    return response;
  }

  // get books by query name
  if (name) {
    const filterNameQuery = books.filter((book) => {
      return book;
    });

    const response = h.response({
      status: 'success',
      data: {
        books: filterNameQuery.map((book) => {
          const dataBook = {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          };
          return dataBook;
        }),
      },
    });
    response.code(200);
    return response;
  }

  if (!name || !finished || !reading) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((data) => {
          const dataBook = {
            id: data.id,
            name: data.name,
            publisher: data.publisher,
          };
          return dataBook;
        }),
      },
    });
    return response;
  }
};

const getBookByIdHandler = (request, h) => {
  const { booksId } = request.params;

  const data = books.filter((index) => index.id === booksId)[0];

  if (data !== undefined) {
    return {
      status: 'success',
      data: {
        book: data,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { booksId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  // Check payload name
  if (name === '' || name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  // check readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === booksId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { booksId } = request.params;

  const index = books.findIndex((book) => book.id === booksId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  editBookByIdHandler,
  getBookByIdHandler,
  deleteBookByIdHandler,
};
