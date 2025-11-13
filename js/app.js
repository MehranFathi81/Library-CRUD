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
//* // Urls //
const binId = "6912e5dd43b1c97be9a63b39";
const secretKey =
  "$2a$10$C1fEJMsNBHm6LSCPfqEceefchPTyK5WOyuc6kkX1jkFLRIJ2NNew.";
const baseUrl = `https://api.jsonbin.io/v3/b/${binId}`;
//* /////////
let isEditForm = false;
let targetBook;
let delBtnId = null;
let editBtnId = null;
//* /////////////// Functions ///////////////
const initApp = async () => {
  window.addEventListener("load", async () => {
    booksContainer.innerHTML = "";
    const response = await fetch(`${baseUrl}/latest`, {
      headers: { "X-Master-Key": secretKey },
    });
    const data = await response.json();

    if (data.record.books.length) {
      mainEmptyState.classList.add("hidden");
      data.record.books.forEach((book) => {
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
      targetBook = event.target.closest(".main-book");
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
    let lastBookId = +booksContainer.lastElementChild.id.slice(5);

    const newBook = {
      id: ++lastBookId,
      title: formTitle.value.trim(),
      author: formAuthor.value.trim(),
      status: formStatus.value,
      score: Number(formScore.value),
    };
    if (newBook.score <= 5 && newBook.score >= 1) {
      if (formAuthor.value.trim() && formTitle.value.trim()) {
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
  try {
    const response = await fetch(`${baseUrl}/latest`, {
      headers: { "X-Master-Key": secretKey },
    });

    if (!response.ok) {
      console.log("داده‌ها لود نشدن");
      return;
    }

    const data = await response.json();
    if (!data?.record?.books) {
      console.log("خطا در دریافت دیتا از دیتابیس");
      return;
    }

    const books = data.record.books;
    const newBooks = books.filter((book) => book.id !== bookId);

    const updateResponse = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": secretKey,
      },
      body: JSON.stringify({ books: newBooks }),
    });

    if (!updateResponse.ok) {
      console.log("خطا در آپدیت دیتابیس");
      return;
    }

    document.getElementById(`book-${bookId}`).remove();
    modal.classList.add("hidden");
    console.log("کتاب با موفقیت حذف شد ✅");
  } catch {
    console.log("⚠️ خطا در اینترنت یا ارتباط با سرور");
  }
};
const editBook = async (bookId, updatedData) => {
  try {
    const response = await fetch(`${baseUrl}/latest`, {
      headers: { "X-Master-Key": secretKey },
    });

    if (!response.ok) {
      console.log("داده‌ها لود نشدن");
      return;
    }

    const data = await response.json();
    const books = data?.record?.books;

    if (!books) {
      console.log("خطا در دریافت دیتا از دیتابیس");
      return;
    }

    const newBooks = books.map((book) =>
      book.id === bookId ? { ...book, ...updatedData } : book
    );

    const updateResponse = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": secretKey,
      },
      body: JSON.stringify({ books: newBooks }),
    });

    if (!updateResponse.ok) {
      console.log("خطا در آپدیت");
      return;
    }

    const bookElem = document.getElementById(`book-${bookId}`);

    if (bookElem) {
      bookElem.querySelector(".main-book__header-text").textContent =
        updatedData.title;

      bookElem.querySelector(".main-book__author-name").textContent =
        updatedData.author;

      const bookElemStatus = bookElem.querySelector(".main-book__status");
      bookElemStatus.textContent = statusBookMap[updatedData.status];
      bookElemStatus.classList = `main-book__status ${updatedData.status}`;
      // bookElemStatus.value = updatedData
      const scoreContainer = bookElem.querySelector(".main-book__score");
      scoreContainer.innerHTML = "";

      for (let i = 0; i < updatedData.score; i++) {
        scoreContainer.innerHTML += `
          <svg class="main-book__icon-star">
            <use href="#icon-star"></use>
          </svg>
        `;
      }
    }

    modal.classList.add("hidden");
    console.log("کتاب با موفقیت ویرایش شد");
  } catch {
    console.log("⚠️ خطا در اینترنت یا ارتباط با سرور");
  }
};
const addBook = async (newBook) => {
  try {
    const response = await fetch(`${baseUrl}/latest`, {
      headers: { "X-Master-Key": secretKey },
    });

    if (!response.ok) {
      console.log("داده‌ها لود نشدن");
      return;
    }

    const data = await response.json();
    const books = data?.record?.books;
    books.push(newBook);

    const updateResponse = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": secretKey,
      },
      body: JSON.stringify({ books: books }),
    });

    if (!updateResponse.ok) {
      console.log("مشکل در آپدیت رسپانس");
      return;
    }

    let bookStatus = statusBookMap[newBook.status];

    let bookScoreElems = "";
    for (let i = 0; i < newBook.score; i++) {
      bookScoreElems += `          
        <svg class="main-book__icon-star">
          <use href="#icon-star"></use>
        </svg>
      `;
    }

    booksContainer.insertAdjacentHTML(
      "beforeend",
      createBookTemplate(newBook, bookStatus, bookScoreElems)
    );
    const newBookElem = document.getElementById(`book-${newBook.id}`);
    addEventToEditAndDelBtnsForBooks([newBookElem]);
    modal.classList.add("hidden");
  } catch {
    console.log("⚠️ خطا در اینترنت یا ارتباط با سرور");
  }
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
