import templates from "./templates.js";
//* // Modal //
const modal = document.querySelector(".modal-backdrop");
const modalHeader = document.querySelector(".modal-screen__header");
const modalLengthTitle = document.querySelector(
  ".modal-screen__maxlength-title"
);
const modalLengthAuthor = document.querySelector(
  ".modal-screen__maxlength-author"
);
//* // header Section //
const headerCenterWrapper = document.querySelector(".header__center-wrapper");
const headerBottomWrapper = document.querySelector(".header__bottom-wrapper");
//* // Modal Btns //
const modalLoginBtn = document.querySelector(".modal-screen__login-btn");
const modalSaveBtn = document.querySelector(".modal-screen__save-btn");
const modalDelBtn = document.querySelector(".modal-screen__del-btn");
//* // Books //
const addBookBtn = document.querySelector(".header__create-btn");
const statusBookMap = {
  "کتاب جدید": "new",
  "درحال خواندن": "reading",
  "خوانده شده": "done",
  new: "کتاب جدید",
  reading: "درحال خواندن",
  done: "خوانده شده",
};
//* //  Main Auth Required Btns //
const mainBtnLogin = document.querySelector(".main__btn-login ");
const mainBtnSignup = document.querySelector(".main__btn-signup");
//* //  Main Sections //
const booksContainer = document.querySelector(".main__books");
const mainAuthRequired = document.querySelector(".main__auth-required");
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
//* ////////////////////////////////////////////////////
let delBtnId = null;
let editBtnId = null;
let books = [];
let isLogin = false;
//* // Modal form //
let formTitle = null;
let formAuthor = null;
let formStatus = null;
let formScore = null;
let formUsername = null;
let formPassword = null;
let formEmail = null;
let formPhone = null;
//* /////////////// initApp ///////////////
const initApp = async () => {
  window.addEventListener("load", async () => {
    booksContainer.innerHTML = "";
    try {
      const response = await fetch(`${baseUrl}/latest`, {
        headers: { "X-Master-Key": secretKey },
      });
      if (!response.ok) {
        setToastMessage("error", "خطا در بارگذاری کتاب‌ها");
        return;
      }
      const data = await response.json();
      books = data.record.books;
      updateBookCards(books);
    } catch (err) {
      setToastMessage("error", "خطا در بارگذاری کتاب‌ها");
    }

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
          templates.createBookTemplate(book, bookStatus, bookScoreElems)
        );
      });
    } else {
      mainEmptyState.classList.remove("hidden");
    }
    const allBookElem = document.querySelectorAll(".main-book");
    addEventToEditAndDelBtnsForBooks(allBookElem);
  });
};
if (isLogin) {
  headerBottomWrapper.classList.remove("hidden");
  headerCenterWrapper.classList.remove("hidden");
  mainAuthRequired.classList.add("hidden");
  initApp();
} else {
  headerBottomWrapper.classList.add("hidden");
  headerCenterWrapper.classList.add("hidden");
  mainAuthRequired.classList.remove("hidden");
}
//* //modalTypeStr = "addBook"||"editBook"||"removeBook"||"login"||"signUp"
const showModal = (modalTypeStr) => {
  const modalBody = document.querySelector(".modal-screen__body");
  const modalDelIcon = modal.querySelector(".modal-screen__del-icon");
  if (modalDelIcon) {
    modalDelIcon.remove();
  }
  modalBody.innerHTML = "";
  modal.classList.remove("hidden");
  modalSaveBtn.classList.add("hidden");
  modalDelBtn.classList.add("hidden");
  modalLoginBtn.classList.add("hidden");

  switch (modalTypeStr) {
    case "addBook": {
      modalSaveBtn.classList.remove("hidden");
      modalHeader.innerHTML = "افزودن کتاب جدید";
      modalBody.insertAdjacentHTML("beforeend", templates.temAndEditBook());
      break;
    }
    case "editBook": {
      modalSaveBtn.classList.remove("hidden");
      modalHeader.innerHTML = "ویرایش کتاب";
      modalBody.insertAdjacentHTML("beforeend", templates.temAndEditBook());
      templates.temAndEditBook();
      break;
    }
    case "removeBook": {
      modalDelBtn.classList.remove("hidden");
      modalHeader.innerHTML = "حذف کتاب";
      modal.firstElementChild.insertAdjacentHTML(
        "afterbegin",
        templates.temRemoveBookIcon()
      );
      modalBody.insertAdjacentHTML("beforeend", templates.temRemoveBook());
      break;
    }
    case "signUp": {
      modalLoginBtn.innerHTML = "ثبت نام";
      modalLoginBtn.classList.remove("hidden");
      modalHeader.innerHTML = "عضویت در کتابخانه";
      modalBody.insertAdjacentHTML("beforeend", templates.temLogin());
      break;
    }
    case "login": {
      modalLoginBtn.innerHTML = "ورود";
      modalLoginBtn.classList.remove("hidden");
      modalHeader.innerHTML = "ورود به حساب کاربری";
      modalBody.insertAdjacentHTML("beforeend", templates.temSignUp());
      break;
    }
    default: {
      break;
    }
  }
  formTitle = document.querySelector("#form__title");
  formAuthor = document.querySelector("#form__author");
  formStatus = document.querySelector("#form__status");
  formScore = document.querySelector("#form__score");
  formUsername = document.querySelector("#form-login__username");
  formPassword = document.querySelector("#form-login__password");
  formEmail = document.querySelector("#form-login__email");
  formPhone = document.querySelector("#form-login__phone");
};
//* /////////////// Functions ///////////////
const addEventToEditAndDelBtnsForBooks = (allBookElem) => {
  allBookElem.forEach((bookElem) => {
    bookElem.addEventListener("click", (event) => {
      const editBtn = event.target.closest(".main-book__edit-icon");
      const delBtn = event.target.closest(".main-book__del-icon");
      let targetBook = event.target.closest(".main-book");
      if (editBtn) {
        showModal("editBook");
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
      } else if (delBtn) {
        delBtnId = targetBook.id;
        showModal("removeBook");
      }
    });
  });
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
          templates.createBookTemplate(book, bookStatus, bookScoreElems)
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
    const updatedData = {
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
        setToastMessage("error", "لطفاً عنوان کتاب و نام نویسنده را وارد کنید");
      }
    } else {
      setToastMessage("error", "امتیاز کتاب باید بین 1 تا 5 باشد");
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
        setToastMessage("error", "لطفاً عنوان کتاب و نام نویسنده را وارد کنید");
      }
    } else {
      setToastMessage("error", "امتیاز کتاب باید بین 1 تا 5 باشد");
    }
  }
};
const removeBook = async (bookId) => {
  books = books.filter((book) => book.id !== bookId);
  updateBookCards(books);

  const res = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": secretKey,
    },
    body: JSON.stringify({ books: books }),
  });
  if (res.ok) {
    setToastMessage("success", "کتاب با موفقیت حذف شد");
  } else {
    setToastMessage("error", "مشکلی در ارتباط با سرور رخ داد");
  }
  document.getElementById(`book-${bookId}`).remove();
  modal.classList.add("hidden");
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
  if (res.ok) {
    setToastMessage("success", "کتاب با موفقیت ویرایش شد");
  } else {
    setToastMessage("error", "مشکلی در ارتباط با سرور رخ داد");
  }
  modal.classList.add("hidden");
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
  if (res.ok) {
    setToastMessage("success", "کتاب با موفقیت اضافه شد");
  } else {
    setToastMessage("error", "مشکلی در ارتباط با سرور رخ داد");
  }
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
      templates.createBookTemplate(book, bookStatus, bookScoreElems)
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
      templates.temSuccessMessage(text)
    );
  } else if (type === "error") {
    toastContainer.insertAdjacentHTML(
      "afterbegin",
      templates.temErrorMessage(text)
    );
  }
  setTimeout(() => {
    toastContainer.lastElementChild.remove();
  }, 5000);
};
//* /////////////// Events ////////////////////
addBookBtn.addEventListener("click", () => showModal("addBook"));
modal.addEventListener("click", modalEvents);
if (formTitle && formAuthor) {
  formTitle.addEventListener("keyup", formTitleAndFormAuthorLength);
  formAuthor.addEventListener("keyup", formTitleAndFormAuthorLength);
}
mainBtnLogin.addEventListener("click", () => showModal("login"));
mainBtnSignup.addEventListener("click", () => showModal("signUp"));
//* // Keys Events //
document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("hidden") && event.key === "Escape") {
    modal.classList.add("hidden");
  }
  if (modal.classList.contains("hidden") && event.key === "Enter") {
    showModal("addBook");
  }
});
