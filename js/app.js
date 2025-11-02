//* /////////////// Show Modal ///////////////
const addBookBtn = document.querySelector(".header__create-btn");
const book = document.querySelector(".main-book");
const modal = document.querySelector(".modal-backdrop");
const modalHeader = document.querySelector(".modal-screen__header");
const modalDelIcon = modal.firstElementChild.firstElementChild;
const modalDelBodyText = document.querySelector(".modal-screen__body-text");
const modalDelBtn = document.querySelector(".modal-screen__del-btn");
const modalSaveBtn = document.querySelector(".modal-screen__save-btn");
const modalForm = document.querySelector(".form");
const formTitle = document.querySelector("#form__title");
const formAuthor = document.querySelector("#form__author");
const formStatus = document.querySelector("#form__status");
const formScore = document.querySelector("#form__score");
let isEditForm = false;
let targetBook

//* /////////////// Show Modal ///////////////
// modalType = "addBook" || "editBook" || "removeBook"
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

//* /////////////// Events ///////////////
addBookBtn.addEventListener("click", () => showModal("addBook"));
book.addEventListener("click", (event) => {
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

    const statusMap = {
      "کتاب جدید": "new",
      "درحال خواندن": "reading",
      "خوانده شده": "done",
    };
    formStatus.value = statusMap[targetBookStatus]
    showModal("editBook");
  } else if (delBtn) {
    showModal("removeBook");
  }
});
