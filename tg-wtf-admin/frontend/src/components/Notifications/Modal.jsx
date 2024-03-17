import React, { useState } from 'react';
import './Notifications.module.css'; // Убедитесь, что путь к файлу стилей правильный

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [notificationText, setNotificationText] = useState('');

  const handleTextChange = (e) => {
    setNotificationText(e.target.value);
  };

  const handleSubmit = () => {
    if (!notificationText.trim()) {
      return; // Выход из функции, если текст пустой или состоит из пробелов
    }
    onSubmit(notificationText);
    setNotificationText(''); // Очистить поле после отправки
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalWindow">
        <span className="modalBody">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 xl:!text-[16px] xl:!leading-3 focus:outline-none focus:border-blue-500"
            value={notificationText}
            onChange={handleTextChange}
            placeholder="Текст уведомления"
          />
        </span>
        <div className="modalFooter">
          <span className="text-[20px]"><button onClick={handleSubmit} disabled={!notificationText.trim()}>Отправить</button></span>
          <span className="p-[25px] text-[20px]"><button onClick={onClose}>Отмена</button></span>
          
        </div>
      </div>
    </div>
  );
};

export default Modal;