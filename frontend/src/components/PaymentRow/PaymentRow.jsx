import "./PaymentRow.css";
import mir from "../../images/mir.svg"
import visa from "../../images/Visa.svg"
import mastercard from "../../images/Mastercard.svg"

const PaymentRow = () => {
    return (
        <div>
            <div className="paymentmethodsrectangle">
                <div className="grid grid-cols-3 mx-[15px]">
                    <div className = "paymentmethods mx-[16px]" ><img src={mir} alt="" /></div>
                    <div className = "paymentmethods mx-[16px]" ><img src={visa} alt="" /></div>
                    <div className = "paymentmethods mx-[16px]" ><img src={mastercard} alt="" /></div>   
                </div>
                <div className="payrectangle"></div>
            </div>
        </div>
        
    );
};

export default PaymentRow;