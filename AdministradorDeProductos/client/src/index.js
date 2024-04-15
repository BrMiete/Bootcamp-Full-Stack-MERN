import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainPage from './pages/MainPage/MainPage.page';
import DetailPage from './pages/DetailPage/DetailPage.page';
import EditPage from './pages/EditPage/EditPage.page';
import DeletePage from './pages/DeletePage/DeletePage.page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/product/" element={<MainPage/>}/>
          <Route path="/product/:id" element={<DetailPage/>}/>
          <Route path="/product/:id/edit" element={<EditPage/>}/>
          <Route path="/product/:id/delete" element={<DeletePage/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
