import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

document.title = process.env['APP_NAME']!;
if (container) createRoot(container).render(<App />);
