import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Orders from "./components/Orders/Orders";
import Users from "./components/Users/Users";

import module from './App.module.css'

const App = () => {
  return (
    <>
      <div className={`flex ${module.container}`}>
      <Navigation />
        <Routes>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
