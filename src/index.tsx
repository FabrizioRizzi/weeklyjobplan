import React from 'react';
import { createRoot } from 'react-dom/client';
import RootNavigation from './navigation/RootNavigation';

import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RootNavigation />
  </React.StrictMode>,
);