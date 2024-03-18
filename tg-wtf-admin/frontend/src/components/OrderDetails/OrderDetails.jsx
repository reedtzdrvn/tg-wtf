import axios from "../../axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import module from './OrderDetails.module.css'

const OrderDetails = () => {
  const [itemData, setItemData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const { orderId, itemId } = useParams();

  useEffect(() => {
    axios
      .get("/orders")
      .then((response) => {
        let order = response.data.filter((item) => item._id === orderId)[0];
        let item = order.items.filter((item) => item.itemId === itemId)[0];
        setItemData(item); // Устанавливаем данные элемента в состояние
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [orderId, itemId]); // Добавляем зависимости orderId и itemId для перезапуска useEffect при их изменении

  const handleSaveChanges = () => {
    axios
      .put("/updateItemInOrder", {
        orderId,
        itemId,
        status: itemData.status,
        track: itemData.track,
      })
      .then((response) => {
        console.log(response);
        setShowNotification(true); // Показываем уведомление
        setTimeout(() => setShowNotification(false), 3000); // Скрываем уведомление через 3 секунды
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="xl:w-4/5 xl:my-8 p-8 h-full rounded-lg font-[Montserrat]">
      <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
      <div className="form-group mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
          Status:
        </label>
        <select
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          value={itemData.status}
          onChange={(e) => setItemData({ ...itemData, status: e.target.value })}
        >
          <option value="1">сборка</option>
          <option value="2">заказ отправлен</option>
          <option value="3">прибыл в страну назначения</option>
          <option value="4">в пути к заказчику</option>
          <option value="5">доставлен</option>
        </select>
      </div>
      <div className="form-group mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="track">
          Track:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="track"
          type="text"
          placeholder="Enter track..."
          value={itemData.track}
          onChange={(e) => setItemData({ ...itemData, track: e.target.value })}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
      {showNotification && (
        <div className={`${module.fadeOut} absolute top-0 right-0 m-4 bg-green-500 text-white py-2 px-4 rounded`}>
          Data successfully saved
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
