//* // Modal //
const modal = document.querySelector(".modal-backdrop");
const modalHeader = document.querySelector(".modal-screen__header");
const modalDelIcon = modal.firstElementChild.firstElementChild;
const modalDelBodyText = document.querySelector(".modal-screen__body-text");
const modalLengthTitle = document.querySelector(
  ".modal-screen__maxlength-title"
);
const modalLengthAuthor = document.querySelector(
  ".modal-screen__maxlength-author"
);
//* // Modal Btns //
const modalCancelBtn = document.querySelector(".modal-screen__cancel-btn");
const modalSaveBtn = document.querySelector(".modal-screen__save-btn");
const modalDelBtn = document.querySelector(".modal-screen__del-btn");
//* // Modal form //
const modalForm = document.querySelector(".form");
const formTitle = document.querySelector("#form__title");
const formAuthor = document.querySelector("#form__author");
const formStatus = document.querySelector("#form__status");
const formScore = document.querySelector("#form__score");
//* // Books //
const addBookBtn = document.querySelector(".header__create-btn");
const booksContainer = document.querySelector(".main__books");
const statusBookMap = {
  "کتاب جدید": "new",
  "درحال خواندن": "reading",
  "خوانده شده": "done",
  new: "کتاب جدید",
  reading: "درحال خواندن",
  done: "خوانده شده",
};
const mainEmptyState = document.querySelector(".main__empty-state");
//* // Books Cards //
const allBooksCountElem = document.querySelector(".header__books-count");
const newBooksCountElem = document.querySelector(".header__new-count");
const readingBooksCountElem = document.querySelector(".header__reading-count");
const readBooksCountElem = document.querySelector(".header__read-count");
//* // Toast //
const toastContainer = document.querySelector(".toast-container");
//* // Urls //
const binId = "6912e5dd43b1c97be9a63b39";
const secretKey =
  "$2a$10$C1fEJMsNBHm6LSCPfqEceefchPTyK5WOyuc6kkX1jkFLRIJ2NNew.";
const baseUrl = `https://api.jsonbin.io/v3/b/${binId}`;
//* /////////
let isEditForm = false;
let delBtnId = null;
let books = [];
//* /////////////// Functions ///////////////
const initApp = async () => {
  window.addEventListener("load", async () => {
    booksContainer.innerHTML = "";
    const response = await fetch(`${baseUrl}/latest`, {
      headers: { "X-Master-Key": secretKey },
    });
    const data = await response.json();
    books = data.record.books;
    updateBookCards(books);

    if (books.length) {
      mainEmptyState.classList.add("hidden");
      books.forEach((book) => {
        let bookStatus = statusBookMap[book.status];

        let bookScoreElems = "";
        for (let i = 0; i < book.score; i++) {
          bookScoreElems += `          
            <svg class="main-book__icon-star">
              <use href="#icon-star"></use>
            </svg>
          `;
        }

        booksContainer.insertAdjacentHTML(
          "beforeend",
          createBookTemplate(book, bookStatus, bookScoreElems)
        );
      });
    } else {
      mainEmptyState.classList.remove("hidden");
    }
    const allBookElem = document.querySelectorAll(".main-book");
    addEventToEditAndDelBtnsForBooks(allBookElem);
  });
};
initApp();
const addEventToEditAndDelBtnsForBooks = (allBookElem) => {
  allBookElem.forEach((bookElem) => {
    bookElem.addEventListener("click", (event) => {
      const editBtn = event.target.closest(".main-book__edit-icon");
      const delBtn = event.target.closest(".main-book__del-icon");
      let targetBook = event.target.closest(".main-book");
      if (editBtn) {
        editBtnId = targetBook.id;
        const targetBookStatus = targetBook
          .querySelector(".main-book__status")
          .textContent.trim();

        formTitle.value = targetBook.querySelector(
          ".main-book__header-text"
        ).innerHTML;
        formAuthor.value = targetBook.querySelector(
          ".main-book__author-name"
        ).innerHTML;
        formScore.value =
          targetBook.querySelector(".main-book__score").children.length;

        formStatus.value = statusBookMap[targetBookStatus];
        showModal("editBook");
      } else if (delBtn) {
        delBtnId = targetBook.id;
        showModal("removeBook");
      }
    });
  });
};
const createBookTemplate = (book, bookStatus, bookScoreElems) => {
  return `
    <article class="main-book" id="book-${book.id}">
      <!-- --------------------- Main Book header --------------------- -->
      <div class="main-book__header">
        <h3 class="main-book__header-text">${book.title}</h3>
        <div class="main-book__header-icons">
          <svg class="main-book__del-icon">
            <linearGradient
              x1="64.111"
              y1="89.966"
              x2="64.111"
              y2="147.628"
              id="IconifyId17ecdb2904d178eab21434"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#82afc1" />
              <stop offset="1" stop-color="#2f7889" />
            </linearGradient>
            <radialGradient
              cx="65.53"
              cy="12.998"
              r="52.279"
              id="IconifyId17ecdb2904d178eab21435"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".722" stop-color="#94d1e0" />
              <stop offset="1" stop-color="#94d1e0" stop-opacity="0" />
            </radialGradient>
            <use href="#icon-delete"></use>
          </svg>
          <svg class="main-book__edit-icon">
            <use href="#icon-edit"></use>
          </svg>
        </div>
      </div>
      <!-- --------------------- Main Book Author --------------------- -->
      <div class="main-book__author">
        نویسنده: <span class="main-book__author-name">${book.author}</span>
      </div>
      <!-- --------------------- Main Book Bottom Wrapper --------------------- -->
      <div class="main-book__bottom-wrapper">
        <p class="main-book__status ${book.status}" value="${book.status}">${bookStatus}</p>
        <div class="main-book__score">
          ${bookScoreElems}
        </div>
      </div>
    </article>
  `;
};
const addEventToFilterButtons = () => {
  const filterBtnsContainerElem = document.querySelector(
    ".header__bottom-wrapper"
  );

  filterBtnsContainerElem.addEventListener("click", (event) => {
    const prevActiveBtnElem = document.querySelector(".active");
    const targetBtnText = event.target.innerHTML.trim();
    const targetBtn = event.target;

    if (prevActiveBtnElem !== targetBtn) {
      prevActiveBtnElem.classList.remove("active");
      targetBtn.classList.add("active");

      booksContainer.innerHTML = "";
      const addFilteredBook = (book) => {
        let bookStatus = statusBookMap[book.status];
        let bookScoreElems = "";
        for (let i = 0; i < book.score; i++) {
          bookScoreElems += `
            <svg class="main-book__icon-star">
              <use href="#icon-star"></use>
            </svg>
          `;
        }
        booksContainer.insertAdjacentHTML(
          "beforeend",
          createBookTemplate(book, bookStatus, bookScoreElems)
        );
      };

      // Filter Books
      switch (targetBtnText) {
        case "کتاب‌های جدید":
          books.forEach(
            (book) => book.status === "new" && addFilteredBook(book)
          );
          break;
        case "خوانده شده":
          books.forEach(
            (book) => book.status === "done" && addFilteredBook(book)
          );
          break;
        case "درحال خواندن":
          books.forEach(
            (book) => book.status === "reading" && addFilteredBook(book)
          );
          break;
        default:
          books.forEach(addFilteredBook);
      }
    }
    const allBookElem = document.querySelectorAll(".main-book");
    addEventToEditAndDelBtnsForBooks(allBookElem);
  });
};
addEventToFilterButtons();
// modalTypes = "addBook" || "editBook" || "removeBook"
const showModal = (modalTypeStr) => {
  // "addBook" & "editBook"
  modal.classList.remove("hidden");
  modalForm.classList.remove("hidden");
  modalDelIcon.classList.add("hidden");
  modalDelBodyText.classList.add("hidden");
  modalDelBtn.classList.add("hidden");
  modalSaveBtn.classList.remove("hidden");
  modalLengthTitle.innerHTML = formTitle.value.trim().length;
  modalLengthAuthor.innerHTML = formAuthor.value.trim().length;

  if (modalTypeStr === "addBook") {
    modalHeader.innerHTML = "افزودن کتاب جدید";
    formStatus.value = "new";
    formTitle.value = "";
    formAuthor.value = "";
    formScore.value = "1";
  } else if (modalTypeStr === "editBook") {
    modalHeader.innerHTML = "ویرایش کتاب";
  } else if (modalTypeStr === "removeBook") {
    // "removeBook"
    modalForm.classList.add("hidden");
    modalHeader.innerHTML = "حذف کتاب";
    modalDelIcon.classList.remove("hidden");
    modalDelBodyText.classList.remove("hidden");
    modalDelBtn.classList.remove("hidden");
    modalSaveBtn.classList.add("hidden");
  }
};
const formTitleAndFormAuthorLength = (event) => {
  if (event.target.id === "form__title") {
    modalLengthTitle.innerHTML = event.target.value.length;
  }
  if (event.target.id === "form__author") {
    modalLengthAuthor.innerHTML = event.target.value.length;
  }
};
const modalEvents = (event) => {
  // Cancel Button
  if (
    event.target.classList[0] === "modal-screen__cancel-btn" ||
    event.target.classList[0] === "modal-backdrop"
  ) {
    modal.classList.add("hidden");
  }

  // Remove Button
  if (event.target.classList[0] === "modal-screen__del-btn") {
    const bookId = Number(delBtnId.slice(5));
    removeBook(bookId);
    setTimeout(() => {
      if (books.length === 0) {
        mainEmptyState.classList.remove("hidden");
      }
    }, 1000);
  }
  // Save Button For Edit Book
  if (
    event.target.classList[0] === "modal-screen__save-btn" &&
    modalHeader.innerHTML === "ویرایش کتاب"
  ) {
    const bookId = Number(editBtnId.slice(5));
    updatedData = {
      id: bookId,
      title: formTitle.value.trim(),
      author: formAuthor.value.trim(),
      status: formStatus.value,
      score: Number(formScore.value),
    };
    if (updatedData.score <= 5 && updatedData.score >= 1) {
      if (formAuthor.value.trim() && formTitle.value.trim()) {
        editBook(bookId, updatedData);
      } else {
        console.log("عنوان کتاب و نام نویسنده نباید خالی باشد");
      }
    } else {
      console.log("امتیاز بیشتر از 5 و کمتر از 1 مجاز نیست");
    }
  }
  // Save Button For Add Book
  if (
    event.target.classList[0] === "modal-screen__save-btn" &&
    modalHeader.innerHTML === "افزودن کتاب جدید"
  ) {
    const bookId = Number(
      Date.now().toString() + Math.floor(Math.random() * 10000).toString()
    );

    const newBook = {
      id: bookId,
      title: formTitle.value.trim(),
      author: formAuthor.value.trim(),
      status: formStatus.value,
      score: Number(formScore.value),
    };
    if (newBook.score <= 5 && newBook.score >= 1) {
      if (formAuthor.value.trim() && formTitle.value.trim()) {
        if (books.length === 0) {
          mainEmptyState.classList.add("hidden");
        }
        addBook(newBook);
      } else {
        console.log("عنوان کتاب و نام نویسنده نباید خالی باشد");
      }
    } else {
      console.log("امتیاز بیشتر از 5 و کمتر از 1 مجاز نیست");
    }
  }
};
const removeBook = async (bookId) => {
  books = books.filter((book) => book.id !== bookId);
  updateBookCards(books);
  console.log(books);

  const res = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": secretKey,
    },
    body: JSON.stringify({ books: books }),
  });
  if (!res.ok) return console.log("⚠️ خطا در آپدیت سرور");

  document.getElementById(`book-${bookId}`).remove();
  modal.classList.add("hidden");
  console.log("کتاب با موفقیت حذف شد ✅");
};
const editBook = async (bookId, updatedData) => {
  books = books.map((book) =>
    book.id === bookId ? { ...book, ...updatedData } : book
  );
  updateBookCards(books);
  renderBooksByActiveFilter();
  const res = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": secretKey,
    },
    body: JSON.stringify({ books: books }),
  });
  if (!res.ok) return console.log("⚠️ خطا در آپدیت سرور");
  modal.classList.add("hidden");
  console.log("کتاب با موفقیت ویرایش شد");
};
const addBook = async (newBook) => {
  books.push(newBook);
  updateBookCards(books);
  renderBooksByActiveFilter();

  const res = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": secretKey,
    },
    body: JSON.stringify({ books: books }),
  });
  if (!res.ok) return console.log("⚠️ خطا در آپدیت سرور");
  modal.classList.add("hidden");
};
const renderBooksByActiveFilter = () => {
  const activeBtn = document.querySelector(".header__bottom-wrapper .active");
  const activeText = activeBtn ? activeBtn.textContent.trim() : "";

  booksContainer.innerHTML = "";

  const addBookToDOM = (book) => {
    let bookStatus = statusBookMap[book.status];
    let bookScoreElems = "";
    for (let i = 0; i < book.score; i++) {
      bookScoreElems += `
        <svg class="main-book__icon-star">
          <use href="#icon-star"></use>
        </svg>
      `;
    }
    booksContainer.insertAdjacentHTML(
      "beforeend",
      createBookTemplate(book, bookStatus, bookScoreElems)
    );
  };
  switch (activeText) {
    case "کتاب‌های جدید":
      books.forEach((book) => book.status === "new" && addBookToDOM(book));
      break;
    case "درحال خواندن":
      books.forEach((book) => book.status === "reading" && addBookToDOM(book));
      break;
    case "خوانده شده":
      books.forEach((book) => book.status === "done" && addBookToDOM(book));
      break;
    default:
      books.forEach(addBookToDOM);
  }
  const allBookElem = document.querySelectorAll(".main-book");
  addEventToEditAndDelBtnsForBooks(allBookElem);
};
const updateBookCards = (books) => {
  allBooksCountElem.innerHTML = books.length;
  let newBooksCount = 0;
  let readingBooksCount = 0;
  let readBooksCount = 0;
  books.forEach((book) => {
    if (book.status === "new") {
      ++newBooksCount;
    } else if (book.status === "reading") {
      ++readingBooksCount;
    } else {
      ++readBooksCount;
    }
  });
  newBooksCountElem.innerHTML = newBooksCount;
  readingBooksCountElem.innerHTML = readingBooksCount;
  readBooksCountElem.innerHTML = readBooksCount;
};
// toastTypes = "error" || "success"
const setToastMessage = (type, text) => {
  if (type === "success") {
    toastContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="toast toast-success">
        <svg>
          <use href="#icon-success"></use>
        </svg>
        <p class="toast__message">${text}</p>
      </div>
      `
    );
  } else if (type === "error") {
    toastContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="toast toast-error">
        <svg>
          <use href="#icon-del-form"></use>
        </svg>
        <p class="toast__message">${text}</p>
      </div>
      `
    );
  }
  setTimeout(()=> {
    toastContainer.lastElementChild.remove()
  },5000)
};

//* /////////////// Events ////////////////////
addBookBtn.addEventListener("click", () => showModal("addBook"));
modal.addEventListener("click", modalEvents);
formTitle.addEventListener("keyup", formTitleAndFormAuthorLength);
formAuthor.addEventListener("keyup", formTitleAndFormAuthorLength);
//* // Keys Events //
document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("hidden") && event.key === "Escape") {
    modal.classList.add("hidden");
  }
  if (modal.classList.contains("hidden") && event.key === "Enter") {
    showModal("addBook");
  }
});
