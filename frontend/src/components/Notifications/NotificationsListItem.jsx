import notificationOn from "../../images/notification-on.svg";
import cross from "../../images/cross.svg";
import axios from '../../axios.js'

const NotificationsListItem = ({ title, date, id, seen }) => {

  const date1 = new Date(date);

  const formattedDate = date1.toISOString().split('T')[0];

  date1.setHours(date1.getHours() + 3);

  const formattedTime = date1.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });

  let tg = window.Telegram.WebApp;

  let userId = ''

  if (!tg.initDataUnsafe.user){
    userId = '703999322'
  }
  else{
    userId = tg.initDataUnsafe.user?.id
  }

  const handleDeleteNotification = async () => {
    try{
      const fields = { 
        notificationId: id, 
        telegramId: userId
      }
      console.log(fields)
      await axios.post('/seenNotification', fields);
      seen = true
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  }

  return (
    !seen === true ? 
      <>
        <div className="notifications-list-item-wrapper flex justify-between items-center mx-[8.5%] py-[1.5%] mt-[15px]">
          <div className="flex items-center">
            <div className="notifications-list-item-icon-wrapper mr-[20px] ml-[20px]">
              <img  src={notificationOn} height={20} width={20} />
            </div>
            <div className="flex flex-col">
              <span className="notifications-list-item-title">{title}</span>
              <span className="notifications-list-item-date">{formattedDate} {formattedTime}</span>
            </div>
          </div>
          <div className="notifications-list-item-delete-button-wrapper pr-[10px] cursor-pointer" onClick={handleDeleteNotification}>
            <img src={cross} height={26} width={26} />
          </div>
        </div>
      </>
      : ""
  );
};

export default NotificationsListItem;
