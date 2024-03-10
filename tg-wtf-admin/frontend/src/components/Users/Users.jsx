import React, { useState, useEffect } from "react";
import {NavLink} from 'react-router-dom'
import axios from "../../axios";
import UsersListItem from "./UsersListItem";
import userIcon from "../../images/user-square.svg";
import Preloader from "../Preloader/Preloader";
import module from "./Users.module.css";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersByTelegramId, setUsersByTelegramId] = useState([]);
  const [telegramId, setTelegramId] = useState("");

  useEffect(() => {
    axios
      .get(`/users`)
      .then((response) => {
        setUsers(response.data);
        setUsersByTelegramId(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setUsersByTelegramId(
      users.filter((user) => user.telegramId.startsWith(telegramId))
    );
  }, [telegramId, users]);

  return (
    <>
      {isLoading ? ( // Show Preloader if isLoading is true
        <div className="w-4/5 flex justify-center items-center">
          <Preloader />
        </div>
      ) : (
        <div className="w-4/5 px-[40px] py-[20px]">
          <div
            className={`${module.titleWrapper} flex items-center justify-between box-border pb-[8px] border-b-2 mb-6`}
          >
            <div className="flex items-center">
              <img src={userIcon} alt="account icon" />
              <span className={`${module.usersTitle} ml-[12px]`}>
                Список всех пользователей
              </span>
            </div>
            <div>
              <input
                type="text"
                value={telegramId}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setTelegramId(e.target.value)}
                placeholder="Введите Telegram ID"
              />
            </div>
          </div>
          {usersByTelegramId.map((user, index) => (
            <NavLink to={`/user/${user.telegramId}`}>
              <UsersListItem
              key={index}
              user={user}
              setIsLoading={setIsLoading}
            />
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Users;