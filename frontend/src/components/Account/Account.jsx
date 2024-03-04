import usericon from "../../images/usericonpage.svg";
import history from "../../images/history.svg";
import play from "../../images/fi-rr-play.svg";
import spinner from "../../images/spinner.svg";
import "./account.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import Preloader from "../errors/Preloader.js";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [transactionsAmount, setTransactionsAmount] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }

  useEffect(() => {
    axios
      .get(`/user`, { params: { telegramId: userId } })
      .then((response) => {
        const userData = response.data[0];
        setUserData(userData);
        console.log(response.data[0].orders)
        const orderIds = response.data[0].orders ? response.data[0].orders : [];
        if (orderIds.length > 0) {
          axios
            .get(`/getOrderAccountInfo`, { params: { orderIds } })
            .then((response) => {
              let transactionsTemp = 0
              for (const el of response.data) {
                transactionsTemp = transactionsTemp + el.items.length
                console.log(el.items.length)
              }
              setTransactionsAmount(transactionsTemp)
              setIsLoading(false)
            })
            .catch((error) => {
              console.error("Ошибка при получении длины элементов", error);
            });
        } else {
          setTransactionsAmount(0)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении пользователя", error);
      });
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }

    return phoneNumber;
  };

  return (
    <div className="mx-[8.5%] page">
      <div className="flex justify-between mt-[24px]">
        <div className="infoMain flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <div className="text-[24px] flex flex-col gap-0 textInfo">
              {userData?.firstName} {userData?.lastName}
              <span className="number text-[14px]">
                {formatPhoneNumber(userData?.phoneNumber)}
              </span>
            </div>
          </div>
          <div>
            <NavLink
              to="/account/edit"
              className="buttonEditPforile flex items-center justify-center"
            >
              Edit Profile
            </NavLink>
          </div>
        </div>
        <div className="iconMain flex items-center justify-end">
          <img src={usericon} alt="1" className="w-[40px] h-[40px]" />
        </div>
      </div>
      <div className="flex flex-col gap-[24px] mt-[64px]">
        <NavLink
          to="/account/history"
          className="px-[20px] h-[72px] stringLink flex justify-between items-center"
          state={{amount: transactionsAmount}}
        >
          <div className="flex gap-[12px] items-center">
            <div>
              <img src={history} alt="1" className="w-[30px] h-[30px]" />
            </div>
            <div className="flex flex-col HistoryTextLo">
              <div className="HistoryTitle">History</div>
              <div className="HistoryArtitle ml-[14px]">{transactionsAmount} transactions</div>
            </div>
          </div>
          <div>
            <img src={play} alt="1" className="w-[20px] h-[20px]" />
          </div>
        </NavLink>
        <NavLink
          to="/account/status"
          className="px-[20px] h-[72px] stringLink flex justify-between items-center"
          state={{amount: transactionsAmount}}
        >
          <div className="flex gap-[12px] items-center">
            <div>
              <img src={spinner} alt="1" className="w-[30px] h-[30px]" />
            </div>
            <div className="flex flex-col HistoryTextLo">
              <div className="HistoryTitle">Status</div>
              <div className="HistoryArtitle ml-[14px]">{transactionsAmount} position</div>
            </div>
          </div>
          <div>
            <img src={play} alt="1" className="w-[20px] h-[20px]" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Account;
