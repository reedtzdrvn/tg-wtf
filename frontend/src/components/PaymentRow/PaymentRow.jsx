import "./PaymentRow.css";

const PaymentRow = ({ imgSrc1, imgSrc2, imgSrc3 }) => {
  return (
    <div className="flex justify-center">
      <div className="paymentmethodsrectangle">
        <div className="grid grid-cols-3 mx-[45px]">
          <div className="paymentmethods mx-[1px] flex justify-center">
            <img src={imgSrc1} alt="" />
          </div>
          <div className="paymentmethods mx-[1px] flex justify-center">
            <img src={imgSrc2} alt="" />
          </div>
          <div className="paymentmethods mx-[1px] flex justify-center">
            <img src={imgSrc3} alt="" />
          </div>
        </div>
        <div className="paymentslines flex justify-center mx-[11%]"></div>
      </div>
    </div>
  );
};

export default PaymentRow;
