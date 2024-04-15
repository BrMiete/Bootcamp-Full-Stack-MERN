import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage/LoginPage.page';
import RegisterPage from './pages/RegisterPage/RegisterPage.page';
import MainPage from './pages/MainPage/MainPage.page';
import CreatePage from './pages/CreatePage/CreatePage.page';
import ReadPage from './pages/ReadPage/ReadPage.page';
import WritePage from './pages/WritePage/WritePage.page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/movies/" element={<MainPage/>}/>
        <Route path="/movies/new" element={<CreatePage/>}/>
        <Route path="/movies/:id/review" element={<WritePage/>}/>
        <Route path="/movies/:id" element={<ReadPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
