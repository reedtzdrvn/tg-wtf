import "./Pay.css";
import PaymentRow from "../PaymentRow/PaymentRow"


const Pay = () => {
    return (
        <div className="page">
            <div className="bluerectangle ml-[63px] mt-[92px] relative flex flex-col">
                <div className="ml-[43px]">
                    <div className="textbalance">Total Balance</div>
                    <div className="textsumbasket">$24,000</div>
                    <div className="orangerectangle"></div>
                    <div className="purplerectangle"></div>
                </div>
            </div>
            <div className="textChoose">Choose a suitable payment method</div>
            <div className="payrectangle1"></div>
            <PaymentRow />
            <PaymentRow />
            <PaymentRow />
        </div>
    );
};


export default Pay;