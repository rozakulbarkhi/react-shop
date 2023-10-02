import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Products, Login, DetailProduct, NotFound } from "./pages";
import Layout from "./layouts/Layout";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Products />
      </Layout>
    ),
  },
  {
    path: "/products/:id",
    errorElement: <NotFound />,
    element: (
      <Layout>
        <DetailProduct />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toaster />
    </PersistGate>
  </Provider>
);
