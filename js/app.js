//* // Modal //
const modal = document.querySelector(".modal-backdrop");
const modalHeader = document.querySelector(".modal-screen__header");
const modalDelIcon = modal.firstElementChild.firstElementChild;
const modalDelBodyText = document.querySelector(".modal-screen__body-text");
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
let isEditForm = false;
let targetBook;
//* /////////////// Functions ///////////////
//* // initApp //
const initApp = async () => {
  window.addEventListener("load", async () => {
    booksContainer.innerHTML = "";
    const response = await fetch("./db.json");
    const data = await response.json();

    if (data.books.length) {
      mainEmptyState.classList.add("hidden");
      data.books.forEach((book) => {
        let bookStatus = statusBookMap[book.status];

        let bookScoreElems = "";
        for (i = 0; i < book.score; i++) {
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
//* // Add Event To Edit And Del Btns For Books  //
const addEventToEditAndDelBtnsForBooks = (allBookElem) => {
  allBookElem.forEach((bookElem) => {
    bookElem.addEventListener("click", (event) => {
      const editBtn = event.target.closest(".main-book__edit-icon");
      const delBtn = event.target.closest(".main-book__del-icon");
      targetBook = event.target.closest(".main-book");
      if (editBtn) {
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

//* // Show Modal //
// modalTypes = "addBook" || "editBook" || "removeBook"
const showModal = (modalTypeStr) => {
  // "addBook" & "editBook"
  modal.classList.remove("hidden");
  modalForm.classList.remove("hidden");
  modalDelIcon.classList.add("hidden");
  modalDelBodyText.classList.add("hidden");
  modalDelBtn.classList.add("hidden");
  modalSaveBtn.classList.remove("hidden");

  if (modalTypeStr === "addBook") {
    formStatus.value = "new";
    modalHeader.innerHTML = "افزودن کتاب جدید";
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

//* /////////////// Events ////////////////////
addBookBtn.addEventListener("click", () => showModal("addBook"));

//* // Keys Events //
document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("hidden") && event.key === "Escape") {
    modal.classList.add("hidden");
  }
  if (modal.classList.contains("hidden") && event.key === "Enter") {
    showModal("addBook");
  }
});
