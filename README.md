# Twane Library

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

## Introduction

The purpose of this repository is to demonstrate a solution that serves as online library using React, Redux Toolkit, RTK Query, TypeScript, Material UI, and a customized backend.

Experience the service [here](https://twane.netlify.app/).

## Table of contents

- [Requirement](#requirement)
- [Getting started](#getting-started)
- [Author](#author)
- [Project structure](#project-structure)

## Requirement

1. Use the API endpoint from your backend project to create an online library website.
2. Create at lease 4 pages (can be more if you want): Page for all books, single book page,
   profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
   - book reducer: get all books, find a single books, filter books by
     categories, sort books alphabetically. Create, update and delete a book (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add book to cart, remove books, update books's quantity in cart
4. When adding routers to your application, programmatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Deploy the application and rewrite README file.

### Bonus

1. Use context API to switch theme (✔️).
2. Use pagination when fetching/displaying all the products (✔️).
3. Add a section to feature best-selling books (✔️).
4. Implement performance optimization where applicable.

## Getting started

1. Clone the repository to your local machine: `git clone https://github.com/tuannguyen-TN/fs16_6-front-end-FS.git`.
2. Get into the directory: `cd fs16_6-front-end-FS`.
3. Run `npm install` in terminal to install all the libraries, packages, and dependencies.
4. Run `npm start` to view the solution on the web.

Or you can just visit the production version [here](https://twane.netlify.app/).

## Author

- Tuan Nguyen (tuannguyen221101@gmail.com)

## Project structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── _redirects
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── common
│   │   └── common.ts
│   ├── components
│   │   ├── AuthorMenu.tsx
│   │   ├── BookListDisplay.tsx
│   │   ├── BookMutationFormDialog.tsx
│   │   ├── BorrowItemDisplay.tsx
│   │   ├── CategoryMenu.tsx
│   │   ├── FeaturedBooks.tsx
│   │   ├── Footer.tsx
│   │   ├── ItemPerPageMenu.tsx
│   │   ├── LoginForm.tsx
│   │   ├── MaterialUISwitch.ts
│   │   ├── Navbar.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SingleListItemDisplay.tsx
│   │   ├── SortingOptionsMenu.tsx
│   │   ├── ThemeDisplay.tsx
│   │   └── UserCard.tsx
│   ├── contexts
│   │   └── ThemeContext.ts
│   ├── hooks
│   │   ├── useAppDispatch.ts
│   │   ├── useAppSelector.ts
│   │   └── useThemeContext.ts
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── AllBooksPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MyBorrowsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── SingleBookPage.tsx
│   ├── react-app-env.d.ts
│   ├── redux
│   │   ├── queries
│   │   │   ├── authorQueries.ts
│   │   │   ├── bookQueries.ts
│   │   │   ├── borrowQueries.ts
│   │   │   ├── cartQueries.ts
│   │   │   └── categoryQueries.ts
│   │   ├── reducers
│   │   │   ├── featuredBooksReducer.ts
│   │   │   └── userReducer.ts
│   │   └── store
│   │       └── store.ts
│   ├── reportWebVitals.ts
│   ├── schemas
│   │   ├── LoginSchema.ts
│   │   └── RegisterSchema.ts
│   ├── setupTests.ts
│   ├── test
│   │   └── booksData.ts
│   └── types
│       ├── AllBooksApiResponse.ts
│       ├── Author.ts
│       ├── AuthorizedToken.ts
│       ├── Book.ts
│       ├── BookMutationOptions.ts
│       ├── BorrowApiResponse.ts
│       ├── BorrowItem.ts
│       ├── Cart.ts
│       ├── Category.ts
│       ├── FilterBooksOptions.ts
│       ├── Role.ts
│       ├── ThemeContextValue.ts
│       ├── User.ts
│       ├── UserCredentials.ts
│       └── UserReducerState.ts
└── tsconfig.json

14 directories, 72 files
```
