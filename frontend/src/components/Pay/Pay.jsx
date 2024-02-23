import "./Pay.css";
import PaymentRow from "../PaymentRow/PaymentRow";

import mir from "../../images/mir.svg";
import visa from "../../images/Visa.svg";
import mastercard from "../../images/Mastercard.svg";
import amex from "../../images/Amex.svg";
import unionPay from "../../images/UnionPay.svg";
import webmoney from "../../images/Webmoney.svg";
import Bitcoin from "../../images/Bitcoin.svg";
import Etherium from "../../images/Etherium.svg";
import USDT from "../../images/USDT.svg";

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
      <div className="textChoose flex justify-center ml-[6%] mr-[24%]">
        Choose a suitable payment <br /> method
      </div>
      <div className="paymentsline1 flex justify-center mx-[17%]"></div>
      <PaymentRow imgSrc1={mir} imgSrc2={visa} imgSrc3={mastercard} />
      <PaymentRow imgSrc1={amex} imgSrc2={unionPay} imgSrc3={webmoney} />
      <PaymentRow imgSrc1={Bitcoin} imgSrc2={Etherium} imgSrc3={USDT} />
    </div>
  );
};

export default Pay;
