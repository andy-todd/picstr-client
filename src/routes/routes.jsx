// src/routes/routes.js
import React from 'react';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import GalleryPage from '../pages/GalleryPage.jsx';
import AdminPage from '../pages/AdminPage.jsx';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/admin', element: <AdminPage /> },
];

export default routes;
