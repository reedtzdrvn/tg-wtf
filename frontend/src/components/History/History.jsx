import history from "../../images/history.svg";
import "./history.css";
import message from "../../images/message.svg";
import { useEffect, useState } from "react";
import axios from "../../axios.js";
import Preloader from "../errors/Preloader.js";
import { NavLink, useLocation } from "react-router-dom";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  let tg = window.Telegram.WebApp;

  let userId = "";

  if (!tg.initDataUnsafe.user) {
    userId = "703999322";
  } else {
    userId = tg.initDataUnsafe.user?.id;
  }

  let location = useLocation()
  const {state} = location

  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    axios
      .get(`/getorders`, { params: { telegramId: userId } })
      .then((res) => {
        setHistoryData(res.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Ошибка при получении JSON файла", error);
      });
  }, []);
  console.log(historyData);
  
  return (
    <>
      {!(isLoading) ? (
        <div className="mx-[8.5%] mt-[24px] page">
          <div className="flex gap-[10px] items-center">
            <div>
              <img src={history} alt="1" className="w-[30px] h-[30px]" />
            </div>
            <div className="HistoryText1 flex flex-col -mb-[2px]">
              <div className="HistoryTitle1 flex items-center">History</div>
              <div className="HistoryArtitle1 flex items-center">
                {state.amount} transactions
              </div>
            </div>
          </div>
          <div className="mt-[18px] flex flex-col">
            {historyData.map((el) => (
              <div className="mt-[30px]">
                <span className="history-list-date-of-order font-bold text-gray-500">{formatDate(el.dateOrder)}</span>
                {el.items.map((obj) => (
                  <div className="stringinfo flex justify-between items-center py-[12px] px-[6px]">
                    <div className="textOrderHistory w-4/12">
                      {obj.itemId.name}
                    </div>
                    <div className="dateOrderHistory w-3/12 ">
                      {formatDate(obj.approximateTime)}
                    </div>
                    <div className="sumOrderHistory w-4/12 flex justify-center items-center">
                      -${(obj.itemId.price * obj.count).toLocaleString("en-US")}
                    </div>
                    <div className="w-1/12 flex justify-center ml-[10px]">
                      <NavLink to={"/account/history/review"} state={{itemId: obj.itemId._id, amount: state.amount}}>
                        <img width={45} src={message} alt="review" />
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default History;
