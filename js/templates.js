const templates = {
  temAndEditBook() {
    return`
    <form class="form">
      <!-- --------------------- Title --------------------- -->
      <div>
        <label for="form__title">عنوان کتاب</label>
        <p><span class="modal-screen__maxlength-title">0</span>/30</p>
      </div>
      <input class="glass-card" type="text" maxlength="30" 
      name="form__title" id="form__title"/>
      <!-- --------------------- Author --------------------- -->
      <div>
        <label for="form__author">نویسنده</label>
        <p><span class="modal-screen__maxlength-author">0</span>/30</p>
      </div>
      <input maxlength="30" class="glass-card" type="text"
       name="form__author" id="form__author"/>
      <!-- --------------------- Status --------------------- -->
      <label for="form__status">وضعیت</label>
      <select class="glass-card" name="form__status" id="form__status">
        <option value="new">کتاب جدید</option>
        <option value="reading">درحال خواندن</option>
        <option value="done">خوانده شده</option>
      </select>
      <!-- --------------------- Score --------------------- -->
      <label for="form__score">امتیاز</label>
      <input max="5" min="1" value="1" class="glass-card" type="number" name="form__score" 
      id="form__score" placeholder="امتیاز از 1 تا 5 "/>
    </form>
    `
  },
  temRemoveBookIcon() {
    return`
      <svg class="modal-screen__del-icon">
        <use href="#icon-del-form"></use>
      </svg>
    `
  },
  temRemoveBook(){
    return`
      <p class="modal-screen__body-text">
        آیا مطمئن هستید که می‌خواهید این کتاب را حذف کنید؟
      </p>
    `
  },
}
export default templates;