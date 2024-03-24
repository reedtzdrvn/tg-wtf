import React, { useState, useEffect } from "react";
import axios from "../../axios";
import module from "./Notifications.module.css";
import userIcon from "../../images/user-square.svg";
import cross from '../../images/cross.svg'

const NotificationsListItem = ({ telegramId, notification, setIsLoading, notificationsByTelegramId, setNotificationsByTelegramId }) => {

  const handleDeleteNotification = () => {
    axios
      .post("/deleteNotification", { 
        telegramId: telegramId, // предполагается, что у вас есть доступ к telegramId пользователя
        notificationId: notification._id 
      })
      .then((response) => {
        setNotificationsByTelegramId(notificationsByTelegramId.filter(el => el._id !== notification._id));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div
      className={`${module.UserItemsWrapper} w-full xl:px-[30px] px-6 xl:py-[30px] py-4`}
    >
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} xl:leading-[39px] leading-6 xl:text-[26px] text-[14px] flex items-center`}>
            <img className="xl:mr-[18px] mr-[8px]" src={userIcon} alt="account icon" />
                <span>
                  {new Date(notification?.date)
                      .toLocaleDateString("en-US")
                      .toLowerCase()}
                </span>
          </div>
          
            <img
            onClick={handleDeleteNotification}
            className="w-[20px] cursor-pointer"
            src={cross}
            alt="delete"
          />
        </div>
          <div className={`${module.userInfoWrapper} xl:text-[18px] text-[12px] xl:leading-[39px] leading-6 flex xl:justify-between xl:items-center xl:flex-row flex-col w-full px-[8px] xl:px-[40px]`}>
            <div>
              <div>
                <span>{notification.name}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default NotificationsListItem;