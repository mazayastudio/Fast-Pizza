import {createBrowserRouter, RouterProvider} from "react-router-dom";

import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";
import Home from "./ui/Home.jsx";
import Menu, {loader as menuLoader} from "./features/menu/Menu.jsx";
import Order, {loader as orderLoader} from "./features/order/Order.jsx";
import Cart from "./features/cart/Cart.jsx";
import CreateOrder from "./features/order/CreateOrder.jsx";


const router = createBrowserRouter([
  {
    element : <AppLayout />,
    children: [
      {
        path   : '/',
        element: <Home />
      },
      {
        path        : '/menu',
        element     : <Menu />,
        loader      : menuLoader,
        errorElement: <Error />
      },
      {
        path        : '/order/:orderId',
        element     : <Order />,
        loader      : orderLoader,
        errorElement: <Error />
      },
      {
        path   : '/order/new',
        element: <CreateOrder />
      },
      {
        path   : '/cart',
        element: <Cart />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;