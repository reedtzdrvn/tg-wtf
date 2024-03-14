import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Orders from "./components/Orders/Orders";
import Order from "./components/Order/Order";
import Users from "./components/Users/Users";
import NotFound from "./components/NotFound/NotFound";
import User from './components/User/User'
import Items from "./components/Items/Items";
import Item from "./components/Item/Item";
import Sizes from "./components/Sizes/Sizes";
import EspForYou from "./components/EspForYou/EspForYou";
import module from './App.module.css'

const App = () => {
  return (
    <>
      <div className={`xl:flex min-h-screen w-full ${module.container}`}>
      <Navigation />
        <Routes>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/items" element={<Items />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/user/*" element={<User />} />
          <Route exact path="/sizes" element={<Sizes />} />
          <Route exact path="/espforyou" element={<EspForYou />} />
          <Route exact path="/order/*" element={<Order />} />
          <Route exact path="/item/*" element={<Item />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
