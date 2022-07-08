import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();
// import React from 'react';

// import App from './App';
// import reportWebVitals from './reportWebVitals';

// import { createRoot } from 'react-dom/client';
import {
  Provider
} from "react-redux"
import store from "./store"
import {
  positions,
  transitions,
  Provider as AlertProvider
} from "react-alert"
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}

ReactDOM.render( 

<Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
</Provider>,
  document.getElementById('root')
);

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<Provider store={store}>
//   <AlertProvider template={AlertTemplate} {...options}>
//   <App />
//   </AlertProvider>
// </Provider>);

reportWebVitals();