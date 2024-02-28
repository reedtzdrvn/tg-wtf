import NotificationsListItem from "./NotificationsListItem";
import axios from '../../axios.js'

import './Notifications.css'
import { useState, useEffect } from "react";

const Notifications = () => {

  const [notifications, setNotifications] = useState(null)

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
            setNotifications(response.data)
        })
        .catch(error => {
            console.error('Ошибка при получении JSON файла', error);
        });
  })

  return (
    <>
      {notifications? 
      <div className="page">
        {notifications.map((el) => (
          el.seen === false? <NotificationsListItem title={el.name} date={el.date} key={el._id} id={el._id} seen = {el.seen}/>: ""
        ))}
      </div>
      : <div>Уведомлений нет!</div>}
    </>
  );
};

export default Notifications;
