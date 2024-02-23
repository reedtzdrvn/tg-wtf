import "./PaymentRow.css";
import mir from "../../images/mir.svg"
import visa from "../../images/Visa.svg"
import mastercard from "../../images/Mastercard.svg"

const PaymentRow = () => {
    return (
        <div className ="flex justify-center">
            <div className="paymentmethodsrectangle">
                <div className="grid grid-cols-3 mx-[45px]">
                    <div className = "paymentmethods mx-[1px] flex justify-center" ><img src={mir} alt="" /></div>
                    <div className = "paymentmethods mx-[1px] flex justify-center" ><img src={visa} alt="" /></div>
                    <div className = "paymentmethods mx-[1px] flex justify-center" ><img src={mastercard} alt="" /></div>   
                </div>
                <div className="paymentslines flex justify-center mx-[11%]"></div>
            </div>
        </div>
        
    );
};

export default PaymentRow;