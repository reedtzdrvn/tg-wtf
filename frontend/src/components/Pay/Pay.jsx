import "./Pay.css";
import PaymentRow from "../PaymentRow/PaymentRow"


const Pay = () => {
    return (
        <div className="page paymentwrapper">
            <div className="bluerectangle ml-[63px] mt-[80px] relative flex flex-col">
                <div className="ml-[43px]">
                    <div className="textbalance">Total Balance</div>
                    <div className="textsumbasket">$24,000</div>
                    <div className="orangerectangle"></div>
                    <div className="purplerectangle"></div>
                </div>
            </div>
            <div className="textChoose flex justify-center ml-[6%] mr-[24%]">Choose a suitable payment <br/> method</div>
            <div className="paymentsline1 flex justify-center mx-[17%]"></div>
            <PaymentRow />
            <PaymentRow />
            <PaymentRow />
        </div>
    );
};


export default Pay;