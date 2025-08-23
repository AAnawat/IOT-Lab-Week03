import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { MantineProvider, createTheme, type MantineColorsTuple } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import './index.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import HomePage from './pages/home';
import BooksPage from './pages/books';
import AddBook from './pages/addBook';
import BookById from './pages/bookById';
import BookEdit from './pages/bookEdit';

const mainColor: MantineColorsTuple = [
  '#ecf4ff',
  '#dce4f5',
  '#b9c7e2',
  '#94a8d0',
  '#748dc0',
  '#5f7cb7',
  '#5474b4',
  '#44639f',
  '#3a5890',
  '#2c4b80'
];

const theme = createTheme({
  colors: {
    mainColor,
  },
  primaryColor: 'mainColor',
  fontFamily: "Playpen Sans Thai, cursive"
});

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage
  },
  {
    path: "/books",
    Component: BooksPage
  },
  {
    path: "/books/create",
    Component: AddBook
  },
  {
    path: "/books/:bookId",
    Component: BookById
  },
  {
    path: "/books/:bookId/edit",
    Component: BookEdit
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
