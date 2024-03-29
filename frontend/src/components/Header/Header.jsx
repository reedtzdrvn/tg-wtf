import Logo from '../../images/logo.svg'
import Search from '../../images/search.svg'
import On from '../../images/on.svg'
import Message from '../../images/message.svg'

import './header.css'
import { HandySvg } from 'handy-svg'

const Header = () => {
    return (
        <div className='flex justify-center align-center'>
            <div className="header w-[90%] h-[5%] flex items-center justify-between">
                <div className='header-left-side flex justify-start align-center'>
                    <HandySvg className='header-logo flex ml-[5px]' src={Logo} />
                    <span className='company_name w-[30px] h-[50px] text-[10px] leading-[10px] flex items-center font-bold'>
                        World
                        Transport
                        Function
                    </span>
                </div>
                <div className='header-right-side flex justify-end items-center align-center'>
                    <div className='search-btn'>
                        <HandySvg className='search-btn' src={Search} />
                    </div>
                    <div className='notifications-btn'>
                        <HandySvg src={On} />
                    </div>
                    <div className='message-btn'>
                        <HandySvg style={{fill: 'black'}} className='message-btn' width={20} height={20} src={Message} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header