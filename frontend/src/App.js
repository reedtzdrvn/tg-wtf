import React from 'react';
import { Routes, Route} from "react-router-dom";
import Favorites from './components/Favorites/Favorites';
import Account from './components/Account/Account';
import Basket from './components/Basket/Basket';
import NoMatch from './components/NoMatch/NoMatch';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Status from "./components/Status/Status"
import History from "./components/History/History"
import CategoryItemsList from './components/CategoryItemsList/CategoryItemsList';

function App() {

    return (
            <div className="App bg-white h-full w-full">
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/favorites" element={<Favorites />} />
                    <Route exact path="/basket" element={<Basket />} />
                    <Route exact path="/account" element={<Account />} />
                    <Route exact path='/categories/*' element={<CategoryItemsList />} />
                    <Route exact path='/account/history' element={<History />} />
                    <Route exact path='/account/status' element={<Status />} />
                    <Route exact path='/*' element={<NoMatch />} />
                </Routes>
                <Footer />
            </div>
    );
}

export default App;
