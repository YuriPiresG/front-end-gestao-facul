import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCourse from "./components/CreateCourse";
import CreateUser from "./components/CreateUser";
import GetCalendars from "./components/GetCalendars";
import GetCourses from "./components/GetCourses";
import GetMe from "./components/GetMe";
import GetUsers from "./components/GetUsers";
import HomeScreen from "./components/HomeScreen";
import { Layout } from "./components/Layout";
import LoginScreen from "./components/LoginScreen";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        path: "get-courses",
        element: <GetCourses />,
      },
      {
        path: "home",
        element: <HomeScreen />,
      },
      {
        path: "users/me",
        element: <GetMe />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
      {
        path: "users/get",
        element: <GetUsers />,
      },
      {
        path: "calendars/get",
        element: <GetCalendars />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
        <ToastContainer />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
