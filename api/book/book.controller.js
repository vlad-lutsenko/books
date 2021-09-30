const bookModel = require("./book.model");

class BookController {
  async addBook(req, res) {
    const {
      title,
      pageCount,
      publishedDate,
      thumbnailUrl,
      shortDescription,
      longDescription,
      status,
      authors,
    } = req.body;
    const newBook = await bookModel.create({
      title,
      pageCount,
      publishedDate: { date: publishedDate },
      thumbnailUrl,
      shortDescription,
      longDescription,
      status,
      authors,
    });

    return res.status(201).send(newBook);
  }

  async updateBook(req, res) {
    const { id } = req.params;

    const {
      title,
      pageCount,
      publishedDate,
      thumbnailUrl,
      shortDescription,
      longDescription,
      status,
      authors,
    } = req.body;

    const updatedBook = await bookModel
      .findByIdAndUpdate(
        id,
        {
          title,
          pageCount,
          publishedDate: { date: publishedDate },
          thumbnailUrl,
          shortDescription,
          longDescription,
          status,
          authors,
        },
        { new: true }
      )
      .exec();

    if (!updatedBook) {
      return res.status(404).send({ message: "not found" });
    }
    return res.status(200).send(updatedBook);
  }

  async getBookById(req, res) {
    const { id } = req.params;
    const book = await bookModel.findById(id).exec();
    if (!book) {
      return res.status(404).send({ message: "not found" });
    }
    return res.status(200).send(book);
  }

  async getBooksList(req, res) {
    const { page = 1, perPage = 10, sort, where } = req.body;
    const skip = (page - 1) * perPage;

    const [bookNumber, books] = await Promise.all([
      bookModel.count(where).exec(),
      bookModel.find(where).limit(perPage).skip(skip).sort(sort).exec(),
    ]);

    const pages = Math.ceil(bookNumber / perPage);

    return res.status(200).send({ books, pages, bookNumber });
  }

  async deleteBookById(req, res) {
    const { id } = req.params;
    const bookToDelete = await bookModel.findById(id).exec();
    if (!bookToDelete) {
      return res.status(404).send({ message: "not found" });
    }
    await bookModel.findByIdAndDelete(id);
    res.status(200).send({ message: "deleted" });
  }
}

module.exports = new BookController();
