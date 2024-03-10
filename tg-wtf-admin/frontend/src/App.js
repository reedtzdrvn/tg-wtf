import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Orders from "./components/Orders/Orders";
import Users from "./components/Users/Users";
import NotFound from "./components/NotFound/NotFound";
import User from './components/User/User'

import module from './App.module.css'

const App = () => {
  return (
    <>
      <div className={`xl:flex min-h-screen w-full ${module.container}`}>
      <Navigation />
        <Routes>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/user/*" element={<User />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
