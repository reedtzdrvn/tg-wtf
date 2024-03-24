import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "../../axios";
import NotificationsListItem from "./NotificationsListItem";
import userIcon from "../../images/user-square.svg";
import Preloader from "../Preloader/Preloader";
import Modal from "./Modal";
import module from "./Notifications.module.css";


const Notifications = () => {
  const location = useLocation();

  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [telegramId, setTelegramId] = useState(
    state?.telegramId ? state?.telegramId : ""
  );
  const [notificationsByTelegramId, setNotificationsByTelegramId] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("/notifications", { params: { telegramId } })
      .then((response) => {
        setNotificationsByTelegramId(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [telegramId]);

  const handleAddNotification = () => {
    console.log("Клик по кнопке 'Добавить уведомление'");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNotificationSubmit = (text) => {
    axios.post('/notification', {
        name: text,
        telegramId: telegramId // Предполагается, что telegramId уже доступен в состоянии
      })
      .then(response => {
        console.log('Уведомление добавлено', response.data);
        setShowModal(false); 
        setNotificationsByTelegramId(prev => [...prev, response.data.notification])
      })
      .catch(error => {
        console.error('Ошибка добавления уведомления', error);
      });
    };

  return (
    <>
   
      {isLoading ? ( // Show Preloader if isLoading is true
        <div className="xl:w-4/5 min-h-screen flex justify-center items-center">
          <Preloader />
        </div>
      ) : (
        <div className="xl:w-4/5 w-full h-full px-[40px] py-[20px]">
          <div
            className={`${module.titleWrapper} text-[14px] xl:text-[26px] xl:leading-[39px] leading-3 flex xl:items-center justify-between xl:flex-row flex-col pb-[8px] border-b-2 mb-6`}
          >
            <div className="flex items-center xl:mb-0 mb-[10px]">
              <img src={userIcon} alt="account icon" />
              <span className={`${module.usersTitle} ml-[12px]`}>
                Список всех уведомлений
              </span>
            </div>
            <div className="button text-[20px]">
                <button
                    className="btn btn-primary" // Используйте классы для стилизации кнопки согласно вашему проекту
                    onClick={handleAddNotification}
                >
                    Добавить уведомление
                </button>
            </div>
            <Modal isOpen={showModal} onClose={handleCloseModal} onSubmit={handleNotificationSubmit} />
          </div>
          {notificationsByTelegramId.map((notification, index) => (
            <NotificationsListItem
              key={index}
              notificationsByTelegramId={notificationsByTelegramId}
              setNotificationsByTelegramId={setNotificationsByTelegramId}
              notification={notification}
              telegramId={telegramId} // Используйте правильное имя свойства
              setIsLoading={setIsLoading}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Notifications;
