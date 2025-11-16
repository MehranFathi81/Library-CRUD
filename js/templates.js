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
  temLogin(){
    return`
    <form class="form-login">
      <!-- --------------------- Username --------------------- -->
      <label for="form-login__username">نام کاربری</label>
      <div class="form-login__input">
        <input class="glass-card" type="text" 
        name="form-login__username" id="form-login__username"/>
        <svg class="form-login__icon">
          <use href="#icon-username"></use>
        </svg>
      </div>
      <!-- --------------------- Password --------------------- -->
      <label for="form-login__password">رمز عبور</label>
      <div class="form-login__input">
        <input class="glass-card" type="password" 
        name="form-login__password" id="form-login__password"/>
        <svg class="form-login__icon form-login__icon--toggle">
          <!-- <use href="#icon-show"></use> -->
          <use href="#icon-hidden"></use>
        </svg>
      </div>
      <!-- --------------------- Email --------------------- -->
      <label for="form-login__email">آدرس ایمیل</label>
      <div class="form-login__input">
        <input class="glass-card" type="text" 
        name="form-login__email" id="form-login__email"/>
        <svg class="form-login__icon">
          <use href="#icon-email"></use>
        </svg>
      </div>
      <!-- --------------------- Phone --------------------- -->
      <label for="form-login__phone">شماره موبایل</label>
      <div class="form-login__input">
        <input class="glass-card" type="text"
          name="form-login__phone" id="form-login__phone"/>
        <svg class="form-login__icon">
          <use href="#icon-phone"></use>
        </svg>
      </div>
    </form>
    `
  },
  temSignUp(){
    return`
    <form class="form-login">
      <!-- --------------------- Username --------------------- -->
      <label for="form-login__username">نام کاربری</label>
      <div class="form-login__input">
        <input class="glass-card" type="text" 
        name="form-login__username" id="form-login__username"/>
        <svg class="form-login__icon">
          <use href="#icon-username"></use>
        </svg>
      </div>
      <!-- --------------------- Password --------------------- -->
      <label for="form-login__password">رمز عبور</label>
      <div class="form-login__input">
        <input class="glass-card" type="password" 
        name="form-login__password" id="form-login__password"/>
        <svg class="form-login__icon form-login__icon--toggle">
          <!-- <use href="#icon-show"></use> -->
          <use href="#icon-hidden"></use>
        </svg>
      </div>
    </form>
    <!-- --------------------- Form Login Body --------------------- -->
    <div class="login__body-text hidden">
      <span>ورود با ایمیل</span>
      <span>فراموشی رمز عبور</span>
    </div>
    `
  }
}
export default templates;