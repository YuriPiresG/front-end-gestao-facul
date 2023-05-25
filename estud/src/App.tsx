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
import GetCourse from "./components/GetCourse";
import GetMatrices from "./components/GetMatrices";
import GetSubjects from "./components/GetSubjects";
import GetCalendarDays from "./components/GetCalendarDays";
import GetProfessors from "./components/GetProfessors";


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
        path: "get-course/:id",
        element: <GetCourse />,
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
        path: "professors/get",
        element: <GetProfessors />,
      },
      {
        path: "calendars/get",
        element: <GetCalendars />,
      },
      {
        path: "calendar-day/get",
        element: <GetCalendarDays />,
      },
      {
        path: "matrices/get",
        element: <GetMatrices />,
      },
      {
        path: "subjects/get",
        element: <GetSubjects />,
      },
      {
        path: "calendar/:id/week",
        element: <GetCalendarDays />,
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
