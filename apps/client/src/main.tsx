import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [{ path: '/hello', element: <div>hello</div> }],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
