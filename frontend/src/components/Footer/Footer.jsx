import { NavLink, useLocation } from "react-router-dom";

import HomeIcon from '../../images/home.png'
import FavoritesIcon from '../../images/favorite.png'
import BasketIcon from '../../images/basket.png'
import AccountIcon from '../../images/account.png'

import HomeIconActive from '../../images/home-active.png'
import FavoritesIconActive from '../../images/favorite-active.png'
import BasketIconActive from '../../images/basket-active.png'
import AccountIconActive from '../../images/account-active.png'

import './footer.css'

const Footer = (props) => {
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(currentPath)
    console.log(location)

    return (
        <div className="flex justify-center">
            <div className="footer w-[90%] fixed flex items-center justify-between">
                <ul className="footer-nav flex justify-around w-full">
                    <li>
                        <NavLink to='/'><img src={currentPath === '/' ? HomeIconActive : HomeIcon} /></NavLink>
                    </li>
                    <li>
                        <NavLink to='/favorites'><img src={currentPath === '/favorites' ? FavoritesIconActive : FavoritesIcon} /></NavLink>
                    </li>
                    <li>
                        <NavLink to='/basket'><img src={currentPath === '/basket' ? BasketIconActive : BasketIcon} /></NavLink>
                    </li>
                    <li>
                        <NavLink to='/account'><img src={currentPath === '/account' ? AccountIconActive : AccountIcon} /></NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;
