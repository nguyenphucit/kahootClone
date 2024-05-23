import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './Provider/AuthProvider';
import { GameProvider } from './Provider/GameProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <AuthProvider>
        <GameProvider>
        <App />
        </GameProvider>
    </AuthProvider>
    </BrowserRouter>
);
