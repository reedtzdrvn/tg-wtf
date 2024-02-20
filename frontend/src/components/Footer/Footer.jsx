import { NavLink, useLocation } from "react-router-dom";

import HomeIcon from '../../images/home.svg'
import FavoritesIcon from '../../images/favorite.svg'
import BasketIcon from '../../images/basket.svg'
import AccountIcon from '../../images/account.svg'

import HomeIconActive from '../../images/home-active.svg'
import FavoritesIconActive from '../../images/favorite-active.svg'
import BasketIconActive from '../../images/basket-active.svg'
import AccountIconActive from '../../images/account-active.svg'

import './footer.css'

const Footer = (props) => {
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(currentPath)
    console.log(location)

    return (
        <div className="flex justify-center page">
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
