import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navigation from "./components/Navigation/Navigation";
import Orders from "./components/Orders/Orders";
import UserOrdersItems from "./components/UserOrdersItems/UserOrdersItems";
import Users from "./components/Users/Users";
import NotFound from "./components/NotFound/NotFound";
import User from "./components/User/User";
import Items from "./components/Items/Items";
import Item from "./components/Item/Item";
import Sizes from "./components/Sizes/Sizes";
import EspForYou from "./components/EspForYou/EspForYou";
import Notifications from "./components/Notifications/Notifications";
import module from "./App.module.css";
import Login from "./components/Login/Login";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import FirstSlider from "./components/FirstSlider/FirstSlider";
import Categories from "./components/Categories/Categories";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(useIsAuthenticated())

  return (
    <>
      <div
        className={`xl:flex min-h-screen w-full xl:justify-end ${module.container}`}
      >
        {isLoggedIn && <Navigation />}
        <Routes>
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route exact path="/items" element={<Items />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/user/*" element={<User />} />
            <Route exact path="/sizes" element={<Sizes />} />
            <Route exact path="/espforyou" element={<EspForYou />} />
            <Route exact path="/order/*" element={<UserOrdersItems />} />
            <Route exact path="/item/*" element={<Item />} />
            <Route exact path="/order/:orderId/:itemId" element={<OrderDetails />} />
            <Route exact path="/first-slider" element={<FirstSlider />} />
            <Route exact path="/categories" element={<Categories />} />
            <Route exact path="/*" element={<NotFound />} />
          </Route>
          <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
