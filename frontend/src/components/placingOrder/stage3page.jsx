import name from "../../images/name.svg"
import telegram from "../../images/telegram.svg"
import email from "../../images/email.svg"
import address from "../../images/address.svg"
import phoneNum from "../../images/phoneNum.svg"
import information from "../../images/information.svg"
import "./placingorder.css"
import basket from "../../images/basket-active.svg";

const Stage3Page = () => {
    return ( 
        <div className="flex flex-col gap-[40px] mt-[40px]"> 
            <div className="flex flex-col">

                <div className="divInfoOrder flex gap-[8px] items-center"><img src={name} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Your Name</div><div className="infoInfo">Charlene Reed </div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={telegram} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">User Name <span className="ddff">Telegram</span></div><div className="infoInfo">Charlene Reed </div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={email} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Email</div><div className="infoInfo">Charlene Reed </div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={address} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Present Address</div><div className="infoInfo">Charlene Reed </div></div></div>
                <div className="divInfoOrder flex gap-[8px] items-center"><img src={phoneNum} alt="1" /><div className="items-center flex justify-between w-full"><div className="infoTitle">Phone number</div></div></div>
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

                        <div className="flex justify-between texttableorder2 w-full"><div className="w-4/12">Skins</div><div className="w-4/12 flex justify-center"><div>1</div></div><div className="w-4/12 ddfftt">$40,500</div></div>
                        <div className="flex justify-between texttableorder2 w-full"><div className="w-4/12">Skins</div><div className="w-4/12 flex justify-center"><div>1</div></div><div className="w-4/12 ddfftt">$40,500</div></div>

                    </div>
                    <div className="flex justify-end totalpriceinfo mt-[16px] flex gap-[4px]">
                        Total price: <span className="pricetotalsunorder">${`1,000`}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[44px]">
                <button className="cursor-pointer nextPageButton w-[75%] flex items-center justify-center">
                    Go to the payment
                </button>
            </div>
        </div>
     );
}
 
export default Stage3Page;