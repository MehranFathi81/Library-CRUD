# 📚 Library-CRUD

[Demo Site](https://mehranfathi81.github.io/Library-CRUD) | [GitHub Repository](https://github.com/MehranFathi81/Library-CRUD)

---

## 💡 Project Overview

**Library-CRUD** is a fully interactive personal library web application built using **HTML, CSS, and JavaScript** with **fetch API** to communicate with [JSONBin.io](https://jsonbin.io/). This project demonstrates **CRUD operations, user authentication, form validation with regex, modal management, and dynamic UI updates**.  

It is designed as a **portfolio project** for showcasing web development skills, particularly front-end JS development, interactive UI, and API integration.

---

## 🛠️ Features

### 1. **User Authentication**
- **Sign Up / Login** functionality.
- Prevents registration with an **existing username** in the API.
- On login/signup, **a token and username are stored in `localStorage`** for session management.
- Form inputs validated with **regex** (username, email, password).

### 2. **Personal Library**
- Users can **add**, **edit**, and **remove books** via modals:
  - `addBook`
  - `editBook`
  - `removeBook`
- Each book contains:
  - `id` (unique)
  - `title`
  - `author`
  - `status` (`new`, `reading`, `read`)
  - `score` (rating)

### 3. **Dashboard Overview**
- Four **cards** at the top display:
  1. Total books
  2. New books
  3. Currently reading
  4. Read books

### 4. **Book Filters**
- Four **filter buttons** above the book list:
  - Show all books
  - Show new books
  - Show currently reading
  - Show read books

### 5. **Error & Success Messages**
- All errors and notifications are displayed with **toastMessage**.
- Examples:
  - Invalid form input
  - Username already exists
  - Book added/edited/deleted successfully

### 6. **Interactive Modals**
- Centralized modal management with `modalEvents(event)` for handling all modal actions.
- Modal content dynamically rendered based on `modalTypeStr`:
  - `"addBook"`, `"editBook"`, `"removeBook"`, `"login"`, `"signUp"`, `"logOut"`

### 7. **Vanilla JS** 
- No external libraries used, fully custom implementation.

### 8. **API Integration**
- Uses [JSONBin.io](https://jsonbin.io/) as a backend for storing users and books.
- Example API structure:
```json
{
  "users": {
    "mehranf81822": {
      "username": "mehranf81822",
      "password": "Mehranf81822",
      "email": "Mehranf81822@gmail.com",
      "phone": "09186699814",
      "books": [
        {
          "id": 1764054483890864,
          "title": "The Power of Habit",
          "author": "Charles Duhigg",
          "status": "reading",
          "score": 4
        }
      ]
    }
  }
}
```

---

🎨 UI / UX

- Fully responsive design

- Interactive cards and filter buttons

- Modals for all forms

- Dynamic toast notifications

- Clean and modern layout

---

```
Library-CRUD/
├── index.html
├── style/
├── js/
├── images/
│   └── ...
└── README.md
└── LICENSE
```

---

⚡ Technologies Used

- HTML5

- CSS3

- JavaScript (ES6+)

- fetch API

- JSONBin.io (as a backend API)

- LocalStorage (for session management)

- Regex (for form validation)

---

🔗 Links

- Live Demo: https://mehranfathi81.github.io/Library-CRUD

- GitHub Repo: https://github.com/MehranFathi81/Library-CRUD

---

🚀 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/MehranFathi81/Library-CRUD.git
```
2. Open index.html in your preferred browser.
```
No additional setup needed as this is a pure front-end project using fetch API to JSONBin.io.
```

---

📄 License

- This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📸 Demo Screenshots

<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/home.png" alt="Home"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/login.png" alt="Login"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/sign-up.png" alt="Sign up"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/logout.png" alt="Logout"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/add-book.png" alt="Add book"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/edit-book.png" alt="Edit book"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/remove-book.png" alt="Remove book"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/dashboard.png" alt="Dashboard"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/filter-new.png" alt="Filter New"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/filter-reading.png" alt="Filter Reading"/>
<img src="https://github.com/MehranFathi81/Library-CRUD/raw/main/Images/filter-done.png" alt="Filter done"/>


---

✨ Built with ❤️, coffee ☕ and endless curiosity...