import module from "./Users.module.css";

import userIcon from "../../images/user-square.svg";
import arrowIcon from "../../images/arrow.svg";

const UsersListItem = ({user}) => {
  return (
    <div
      className={`${module.UserItemsWrapper} w-full px-[30px] py-[30px] cursor-pointer`}
    >
      <div>
        <div className="flex justify-between">
          <div className={`${module.userNameAndSurname} flex items-center`}>
            <img className="mr-[18px]" src={userIcon} alt="account icon" />
            <span>{user.firstName}</span>
            <span className="ml-[8px]">{user.lastName}</span>
          </div>
          <img width={30} src={arrowIcon} alt="go" />
        </div>
        <div
          className={`${module.userInfoWrapper} flex justify-between items-center  w-full px-[40px]`}
        >
          <div>
            <div>
              <span className="font-bold mr-[5px]">Номер телефона:</span>
              <span>{user.phoneNumber}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Telegram username:</span>
              <a
                className={`${module.telegramLink}`}
                href={`https://t.me/${user.userName}`}
              >
                @{user.userName}
              </a>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Telegram ID:</span>
              <span>{user.telegramId}</span>
            </div>
          </div>

          <div>
            <div>
              <span className="font-bold mr-[5px]">Orders count:</span>
              <span>{user.orders?.length}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Orders in process:</span>
              <span>0</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">Notifications count:</span>
              <span>{user.notifications?.length}</span>
            </div>

            <div>
              <span className="font-bold mr-[5px]">
                Especially for you count:
              </span>
              <span>{user.especiallyForYou?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
