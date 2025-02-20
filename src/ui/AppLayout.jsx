import CartOverview from "../features/cart/CartOverview.jsx";
import {Outlet, useNavigation} from "react-router-dom";

import Header from "./Header.jsx";
import Loader from "./Loader.jsx";


function AppLayout() {
  const navigation = useNavigation();
  const isLoader = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoader && <Loader />}

      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;