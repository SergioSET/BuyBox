import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  HomeLayout,
  Landing,
  Login,
  Register,
  Shop,
  Locker,
  SingleProduct,
  Profile,
  Search,
  ThankYou,
  OrderHistory,
  NewProduct,
  AdminLayout,
  Dashboard_admin,
  ProductList,
  EditProduct,
} from "./pages";
import { landingLoader } from "./pages/Landing";
import { singleProductLoader } from "./pages/SingleProduct";
import { shopLoader } from "./pages/Shop";
import { lockerLoader } from "./pages/Locker";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute"; // Importa el componente de protección
import { productlistloader } from "./pages/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "shop",
        element: <Shop />,
        loader: shopLoader
      },
      {
        path: "shop/product/:id",
        element: <SingleProduct />,
        loader: singleProductLoader,
      },
      {
        path: "locker",
        element: (
          <ProtectedRoute allowedRoles={['Usuario']}>
            <Locker />
          </ProtectedRoute>
        ),
        loader: lockerLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "user-profile",
        element: (
          <ProtectedRoute allowedRoles={['Usuario']}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "thank-you",
        element: <ThankYou />
      },
      {
        path: "order-history",
        element: (
          <ProtectedRoute allowedRoles={['Usuario']}>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard_admin />,
      },
      {
        path: "/admin/product-list",
        element: <ProductList />,
        loader: productlistloader
      },
      {
        path: "/admin/new-product",
        element: <NewProduct />
      },
      {
        path: "/admin/edit-product/:id",
        element: <EditProduct />,
      },
      // {
      //   path: "/admin/order-list",
      //   element: <OrderList />,
      // },
      // {
      //   path: "/admin/edit-order/:id",
      //   element: <EditOrder />,
      // },
      // {
      //   path: "user-list",
      //   element: <UserList />,
      // },
      // {
      //   path: "new-user",
      //   element: <NewUser />,
      // },
      // {
      //   path: "edit-user/:id",
      //   element: <EditUser />,
      // },
      // {
      //   path: "supportChat",
      //   element: <SupportChat />,
      // }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
