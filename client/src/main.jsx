import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // or './input.css' if that's your Tailwind input file
import {KickplateProvider} from './context/KickplateContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <KickplateProvider> 
        <App />
      </KickplateProvider>
    </BrowserRouter>
);
