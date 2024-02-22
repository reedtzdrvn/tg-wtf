import React, { useState } from 'react';
import background from "../../images/background.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./EspeciallyForYouPage.css";

const EspeciallyForYouPage = () => {
  const [presentAddress, setPresentAddress] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      presentAddress,
      additionalInfo,
    };

    console.log('Отправка данных:', formData);

  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <div className="mx-[8.5%] mt-[32px] relative">
          <img src={background} alt="Background" className="imgbanner" />
          <div className="absolute top-0 bottom-0 w-full text-white px-[10%] py-[12px] h-max">
            <div className="lend flex flex-col gap-2 leading-10 font-bold">
              <div className="text-left">ESPECIALLY</div>
              <div className="text-right">FOR YOU</div>
            </div>
          </div>
          <div className="input1 flex justify-center mt-[32px]">
              <div className="w-[90%]">
              <label htmlFor="presentAddress">Present Address</label>
              <input
                placeholder="San Jose, California, USA"
                type="text"
                id="presentAddress"
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
                required
              />
              </div>
          </div>
          <div className="textarea1 flex justify-center mt-[46px]">
              <div className="w-[90%]">
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                placeholder="Please provide all necessary additional information related to your order."
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                required
              />
              </div>
          </div>
          <div className="flex justify-center items-center">
          <button type="submit" className="bg-black text-white flex justify-center items-center buttonnextESP w-[70%]">
            Next
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EspeciallyForYouPage;
