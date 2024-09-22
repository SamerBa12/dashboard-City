import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <Provider store={store} >

        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>
)
