import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Index } from './routes';
import { Root } from './routes/root';
import { Upload } from './routes/upload';
import { Watch } from './routes/watch';
import { store } from './store/store';

import 'node_modules/video-react/dist/video-react.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      { path: 'upload', element: <Upload /> },
      { path: 'watch/:id', element: <Watch /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
