import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostsPage from "./pages/posts/PostsPage";
import CreatePost from "./pages/create-post/CreatePost";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import VerifyPage from "./pages/verify-page/VerifyPage";

function App() {
  const { user } = useSelector((state) => state.auth);
  const ProtectedRoute = () => {
    if (user) {
      return <Navigate to="/" />;
    } else {
      return <Outlet />;
    }
  };
  const ProtectedRoute2 = () => {
    if (!user) {
      return <Navigate to="/" />;
    } else {
      return <Outlet />;
    }
  };

  const AdminRoute = () => {
    if (user?.isAdmin) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  const Layout = () => {
    return (
      <div>
        <ToastContainer theme="colored" position="top-center" />
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
            {
              path: "/forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "/reset-password/:userId/:token",
              element: <ResetPassword />,
            },
            {
              path: "/users/:userId/verify/:token",
              element: <VerifyPage />,
            },
          ],
        },
        {
          element: <ProtectedRoute2 />,
          children: [
            {
              path: "/posts/create-post",
              element: <CreatePost />,
            },
          ],
        },
        {
          element: <AdminRoute />,
          children: [
            {
              path: "/admin-dashboard",
              children: [
                {
                  path: "",
                  element: <AdminDashboard />,
                },
                {
                  path: "users-table",
                  element: <UsersTable />,
                },
                {
                  path: "posts-table",
                  element: <PostsTable />,
                },
                {
                  path: "categories-table",
                  element: <CategoriesTable />,
                },
                {
                  path: "comments-table",
                  element: <CommentsTable />,
                },
              ],
            },
          ],
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/posts",
          children: [
            {
              path: "",
              element: <PostsPage />,
            },
            {
              path: "details/:id",
              element: <PostDetails />,
            },
            {
              path: "categories/:category",
              element: <Category />,
            },
          ],
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
