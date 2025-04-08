const myLibrary = [];

function Book(title, author, pageCount, genre, readStatus, favorite) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.genre = genre;
    this.readStatus = (readStatus.checked) ? readStatus.value : null;
    this.favorite = (favorite.checked) ? favorite.value : null;
    this.bookId = crypto.randomUUID();
}

const books = document.querySelector(".books");

const addNewBook = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");

const form = document.querySelector("#new-book");

const bookTitle = document.querySelector("#book_title");
const bookAuthor = document.querySelector("#author");
const numberOfPages = document.querySelector("#page_count");
const bookGenre = document.querySelector("#genre");
const markRead = document.querySelector("#mark_read");
const favorite = document.querySelector("#add_favorite");
const createBook = document.querySelector("#create-book");
const cancel = document.querySelector("#cancel");

function genLibrary() {
    myLibrary.forEach((item) => {
        const book = document.createElement("div");
        const modifyBook = document.createElement("div");
        const editInfo = document.createElement("img");
        const deleteBook = document.createElement("img");
        const bookInfo = document.createElement("div");
        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const options = document.createElement("div");
        const star = document.createElement("img");
        const eye= document.createElement("img");
        const inProgress = document.createElement("img");

        book.classList.add("book");
        book.setAttribute("id", item.bookId);
        modifyBook.classList.add("modify-book");
        editInfo.setAttribute("id", "edit");
        deleteBook.setAttribute("id", "delete");
        bookInfo.classList.add("book-info");
        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        options.classList.add("options");
        star.setAttribute("id", "star");
        eye.setAttribute("id", "read-status");
        inProgress.setAttribute("id", "in-progress");

        editInfo.src = "images/pencil.svg";
        deleteBook.src = "images/delete.svg";

        title.textContent = item.title;
        author.textContent = `by ${item.author}`;
        pages.textContent = `${item.pageCount} pages`;

        modifyBook.appendChild(editInfo);
        modifyBook.appendChild(deleteBook);

        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);

        options.appendChild(star);
        options.appendChild(eye);
        options.appendChild(inProgress);

        book.appendChild(modifyBook);
        book.appendChild(bookInfo);
        book.appendChild(options);

        books.appendChild(book);

        if (item.favorite === "favorite") {
            star.src = "images/star.svg";
        } else {
            star.src = "images/star-plus-outline.svg";
        }

        if (item.readStatus === "read") {
            eye.src = "images/eye-check.svg";
        } else {
            eye.src = "images/eye-plus-outline.svg";
        }

        deleteBook.addEventListener("click", (e) => {
            const parentBook = e.target.closest(".book");
            const thisBookId = parentBook.getAttribute("id");

            for (let i = 1; i <= myLibrary.length; i++) {
                if (myLibrary[i - 1].bookId === thisBookId) {
                    myLibrary.splice((i - 1), 1);
                }   
            }

            books.removeChild(parentBook);
        });

        eye.addEventListener("click", (e) => {
            const parentBook = e.target.closest(".book");
            const thisBookId = parentBook.getAttribute("id");

            for (let i = 1; i <= myLibrary.length; i++) {
                if (myLibrary[i - 1].bookId === thisBookId) {
                    if (myLibrary[i - 1].readStatus === "read") {
                        myLibrary[i - 1].readStatus = null;
                        e.target.src = "images/eye-plus-outline.svg";
                    } else {
                        myLibrary[i - 1].readStatus = "read";
                        e.target.src = "images/eye-check.svg";
                    }
                }
            }
        });

        star.addEventListener("click", (e) => {
            const parentBook = e.target.closest(".book");
            const thisBookId = parentBook.getAttribute("id");

            for (let i = 1; i <= myLibrary.length; i++) {
                if (myLibrary[i - 1].bookId === thisBookId) {
                    if (myLibrary[i - 1].favorite === "favorite") {
                        myLibrary[i - 1].favorite = null;
                        e.target.src = "images/star-plus-outline.svg";
                    } else {
                        myLibrary[i - 1].favorite = "favorite";
                        e.target.src = "images/star.svg";
                    }
                }
            }
        });

    });
}

function clearLibrary() {
    const bookList = document.querySelectorAll(".book");
    bookList.forEach((book) => {
        books.removeChild(book);
    });
}

addNewBook.addEventListener("click", () => {
    dialog.showModal();
});

createBook.addEventListener("click", () => {
    let newBook = new Book(bookTitle.value, bookAuthor.value, numberOfPages.value, bookGenre.value, markRead, favorite);
    myLibrary.push(newBook);
    dialog.close();
    form.reset();
    clearLibrary();
    genLibrary();
});

cancel.addEventListener("click", () => {
    dialog.close();
    form.reset();
});


