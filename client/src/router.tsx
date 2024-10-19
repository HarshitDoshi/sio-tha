import App from './App.tsx';
import { Space } from './pages';
import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:spaceId",
        element: <Space />,
      },
    ],
  },
]);

export default router;