const myLibrary = [];

function Book(title, author, pageCount, genre, readStatus, favorite) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.genre = genre;
    this.readStatus = (readStatus.checked) ? readStatus.value : null;
    this.favorite = (favorite.checked) ? favorite.value : null;
    this.id = crypto.randomUUID();
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
        const bookInfo = document.createElement("div");
        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const options = document.createElement("div");
        const star = document.createElement("img");
        const eye= document.createElement("img");
        const inProgress = document.createElement("img");

        book.classList.add("book");
        bookInfo.classList.add("book-info");
        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        options.classList.add("options");
        star.setAttribute("id", "star");
        eye.setAttribute("id", "read-status");
        inProgress.setAttribute("id", "in-progress");

        title.textContent = item.title;
        author.textContent = `by ${item.author}`;
        pages.textContent = `${item.pageCount} pages`;

        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);

        options.appendChild(star);
        options.appendChild(eye);
        options.appendChild(inProgress);

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

