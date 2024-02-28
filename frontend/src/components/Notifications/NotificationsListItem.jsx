import notificationOn from "../../images/notification-on.svg";
import cross from "../../images/cross.svg";

const NotificationsListItem = ({ title, date }) => {

  


  return (
    <>
      <div className="notifications-list-item-wrapper flex justify-between items-center mx-[8.5%] py-[1.5%] mt-[15px]">
        <div className="flex items-center">
          <div className="notifications-list-item-icon-wrapper mr-[20px] ml-[20px]">
            <img  src={notificationOn} height={20} width={20} />
          </div>
          <div className="flex flex-col">
            <span className="notifications-list-item-title">{title}</span>
            <span className="notifications-list-item-date">{date}</span>
          </div>
        </div>
        <div className="notifications-list-item-delete-button-wrapper pr-[10px]">
          <img src={cross} height={26} width={26} />
        </div>
      </div>
    </>
  );
};

export default NotificationsListItem;
