import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage/HomePage.page.jsx';
import CreatePage from './pages/CreatePage/CreatePage.page.jsx';
import EditPage from './pages/EditPage/EditPage.page.jsx';
import LoginPage from './pages/LoginPage/LoginPage.page.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.page.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/authors/" element={<HomePage/>}/>
        <Route path="/authors/new" element={<CreatePage/>}/>
        <Route path="/authors/edit/:id" element={<EditPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//"homepage": "http://localhost:3000/authors/",
reportWebVitals();
