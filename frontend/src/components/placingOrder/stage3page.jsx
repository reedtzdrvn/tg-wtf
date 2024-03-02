import name from "../../images/name.svg"
import telegram from "../../images/telegram.svg"
import email from "../../images/email.svg"
import address from "../../images/address.svg"
import phoneNum from "../../images/phoneNum.svg"
import information from "../../images/information.svg"
import "./placingorder.css"
import basket from "../../images/basket-active.svg";
import { NavLink } from "react-router-dom"
import axios from "../../axios.js"
import { useNavigate } from "react-router-dom"

const Stage3Page = (props) => {

    const navigate = useNavigate()

    const basketList = props.cartList

    let tg = window.Telegram.WebApp;

    let userId = ''

    if (!tg.initDataUnsafe.user){
        userId='703999322'
    }
    else{
        userId=tg.initDataUnsafe.user?.id
    }


    const addOrderUser = (event) => {
        event.preventDefault();

        const reserveNumber = props.value2
        const email = props.email
        const country = props.country
        const city = props.city
        const presentAdress = props.address
        const apartmentNumber = props.appNumber
        const postalCode = props.postcode1
        const postalCodeReserve = props.postcode2
        const additionalInformation = props.information
        const dateOrder = new Date()
        const totalPrice = currentSum
        const name = props.name
        const phoneNumber = props.value
        const telegramLink = props.telegramName

        const items = props.cartList.map(item => ({
            _id: item.chosenId,
            itemId: item.itemId,
            status: 1,
            track: "",
            approximateTime: new Date(Date.now() + parseInt(item.apoximateTime.split('-').pop()) * 24 * 60 * 60 * 1000) ,
            count: item.chosenCount
        }));

        console.log(items)

        const fields = {
            reserveNumber: reserveNumber,
            email: email,
            country: country,
            city: city,
            presentAdress: presentAdress,
            apartmentNumber: apartmentNumber,
            postalCode:postalCode,
            postalCodeReserve: postalCodeReserve,
            additionalInformation: additionalInformation,
            dateOrder: dateOrder,
            totalPrice: totalPrice,
            items: items,
            telegramId: userId,
            name: name,
            phoneNumber: phoneNumber,
            telegramLink: telegramLink,
        }

        console.log(fields)
        

        axios.post('/addorder', fields)
        .then((response) => {
            alert('Заказ успешно оформлен!')
            navigate('/account/status')
        })
        .catch((error) => {
            alert('Заказ не оформлен(')
            console.error("Ошибка при получении JSON файла", error);
        });
    }
    
    let currentSum = basketList.reduce((sum, el) => sum + el.price * el.chosenCount, 0);
    return ( 
        <div className="flex flex-col gap-[40px] mt-[40px]"> 
            <div className="flex flex-col">

                <div className="divInfoOrder flex gap-[8px] items-center"><img src={name} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Your Name</div><div className="infoInfo">{props.name}</div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={telegram} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">User Name <span className="ddff">Telegram</span></div><div className="infoInfo">{props.telegramName}</div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={email} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Email</div><div className="infoInfo">{props.email} </div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={address} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Present Address</div><div className="infoInfo">{props.city}, {props.country}, {props.address}, {props.appNumber}, {props.postcode1}</div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={phoneNum} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Phone number</div><div className="infoInfo">+{props.value}</div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={information} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Additional Information</div></div></div>

            </div>
            <div className="flex flex-col gap-[16px]">
                <div className="flex gap-[10px] items-center">
                    <div><img src={basket} alt="1" className="w-[30px] h-[30px]"/></div>
                    <div className="HistoryText1 flex flex-col -mb-[2px]">
                        <div className="HistoryTitle1 flex items-center">Basket</div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between texttableorder"><div className="w-4/12">Position</div><div className="w-4/12 flex justify-center"><div>Quantity</div></div><div className="w-4/12 ddfftt">Price</div></div>
                    <div className="flex flex-col">

                        {basketList.map((el) => (
                            <div className="flex justify-between texttableorder2 w-full"><div className="w-4/12">{el.name} - {el.chosenSize}</div><div className="w-4/12 flex justify-center"><div>{el.chosenCount}</div></div><div className="w-4/12 ddfftt">${el.chosenCount*el.price}</div></div>
                        ))}

                    </div>
                    <div className="justify-end totalpriceinfo mt-[16px] flex gap-[4px]">
                        Total price: <span className="pricetotalsunorder">${currentSum}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[44px]">
                <button state={currentSum} onClick={addOrderUser} className="cursor-pointer nextPageButton w-[75%] flex items-center justify-center">
                    Go to the payment
                </button>
            </div>
        </div>
     );
}
 
export default Stage3Page;