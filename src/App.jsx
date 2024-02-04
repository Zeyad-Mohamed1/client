import {
  Navigate,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  createBrowserRouter,
  RouterProvider,
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

// function App() {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <BrowserRouter>
//       <ToastContainer theme="colored" position="top-center" />
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/login"
//           element={!user ? <Login /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/register"
//           element={!user ? <Register /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/users/:userId/verify/:token"
//           element={!user ? <VerifyPage /> : <Navigate to="/" />}
//         />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route
//           path="/reset-password/:userId/:token"
//           element={<ResetPassword />}
//         />
//         <Route path="/profile/:id" element={<Profile />} />
//         <Route path="posts">
//           <Route index element={<PostsPage />} />
//           <Route
//             path="create-post"
//             element={user ? <CreatePost /> : <Navigate to="/" />}
//           />
//           <Route path="details/:id" element={<PostDetails />} />
//           <Route path="categories/:category" element={<Category />} />
//         </Route>
//         <Route path="admin-dashboard">
//           <Route
//             index
//             element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
//           />
//           <Route
//             path="users-table"
//             element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
//           />
//           <Route
//             path="posts-table"
//             element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
//           />
//           <Route
//             path="categories-table"
//             element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
//           />
//           <Route
//             path="comments-table"
//             element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
//           />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

export default App;
