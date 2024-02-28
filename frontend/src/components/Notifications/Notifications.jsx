import NotificationsListItem from "./NotificationsListItem";
import axios from '../../axios.js'
import CheckAuth from "../errors/checkAuth.js";

import './Notifications.css'
import { useState, useEffect } from "react";

const Notifications = () => {

  const [notifications, setNotifications] = useState()

  let tg = window.Telegram.WebApp;

  let userId = ''

  if (!tg.initDataUnsafe.user){
    userId = '703999322'
  }
  else{
    userId = tg.initDataUnsafe.user?.id
  }

  useEffect(() => {
    axios.get(`/notifications`, { params: { telegramId: userId } })
        .then(response => {
          setNotifications(response.data.filter((el) => el.seen === false))
        })
        .catch(error => {
            console.error('Ошибка при получении JSON файла', error);
        });
  })
  if (!notifications) {
    return <CheckAuth/>
  }

  console.log(notifications)

  return (
    <>
      {notifications?.length>0? 
      <div>
        {notifications.map((el) => (
          el.seen === false? <NotificationsListItem title={el.name} date={el.date} key={el._id} id={el._id} />: ""
        ))}
      </div>
      : <div className="flex items-center justify-center mt-[100px]">Уведомлений нет!</div>}
    </>
  );
};

export default Notifications;
