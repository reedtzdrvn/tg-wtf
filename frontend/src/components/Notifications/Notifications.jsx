import NotificationsListItem from "./NotificationsListItem";

import './Notifications.css'

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "example1",
      date: new Date(2024, 1, 23, 12, 12, 12),
    },
    {
      id: 2,
      title: "example2",
      date: new Date(2024, 1, 23, 13, 12, 12),
    },
    {
      id: 3,
      title: "example3",
      date: new Date(2024, 1, 23, 14, 12, 12),
    },
    {
      id: 4,
      title: "example4",
      date: new Date(2024, 1, 23, 15, 12, 12),
    },
  ];

  return (
    <>
      <div>
        {notifications.map((el) => (
          <NotificationsListItem title={el.title} date={el.date} key={el.id} />
        ))}
      </div>
    </>
  );
};

export default Notifications;
