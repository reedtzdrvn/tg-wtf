import Logo from '../../images/logo.png'
import Search from '../../images/search.png'
import On from '../../images/on.png'
import Message from '../../images/message.png'

import './header.css'

const Header = () => {
    return (
        <div className='flex justify-center align-center'>
            <div className="header w-[90%] h-[5%] flex items-center justify-between">
                <div className='header-left-side flex justify-start align-center'>
                    <img className='header-logo flex ml-[5px]' src={Logo} />
                    <span className='company_name w-[30px] h-[50px] text-[10px] leading-[10px] flex items-center font-bold'>
                        World
                        Transport
                        Function
                    </span>
                </div>
                <div className='header-right-side flex justify-end items-center align-center'>
                    <div className='search-btn'>
                        <img className='search-btn' src={Search} />
                    </div>
                    <div className='notifications-btn'>
                        <img src={On} />
                    </div>
                    <div className='message-btn'>
                        <img className='message-btn' src={Message} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header