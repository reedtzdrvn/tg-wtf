import React, { useState } from 'react';
import background from "../../images/background.png";
import { useNavigate } from "react-router-dom";
import axios from '../../axios.js'
import "./EspeciallyForYouPage.css";

const EspeciallyForYouPage = () => {

  const [address, setPresentAddress] = useState(null);
  const [information, setAdditionalInfo] = useState(null);
  let navigate = useNavigate();
  let tg = window.Telegram.WebApp; 

    let userId = ''
  
    if (!tg.initDataUnsafe.user){
      userId='703999322'
    }
    else{
      userId=tg.initDataUnsafe.user?.id
    }


  const handlerSubmit = async (e) => {
    e.preventDefault();

    axios.post('/especiallyforyou', {address: address, information: information, telegramId: userId})
            .then(response => {
                navigate('/');
            })

        .catch(error => {
            console.error('Ошибка при получении JSON файла', error);
        });
  };

  return (
    <div className="page">
      <form onSubmit={handlerSubmit}>
        <div className="mx-[8.5%] mt-[32px] relative">
          <img src={background} alt="Background" className="imgbanner" />
          <div className="absolute top-0 bottom-0 w-full text-white px-[10%] py-[40px] h-[152px]">
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
                value={address}
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
                value={information}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                required
              />
              </div>
          </div>
          <div className="flex justify-center items-center">
          <button type="submit" className="bg-black text-white flex justify-center items-center buttonnextESP w-[70%]">
            Confirm
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EspeciallyForYouPage;
