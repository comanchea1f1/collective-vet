import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Programs from "./pages/Programs";
import Assist from "./pages/Assist";
import Resources from "./pages/Resources";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "mission", element: <Mission /> },
      { path: "programs", element: <Programs /> },
      { path: "assist", element: <Assist /> },
      { path: "resources", element: <Resources /> },
      { path: "volunteer", element: <Volunteer /> },
      { path: "donate", element: <Donate /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
