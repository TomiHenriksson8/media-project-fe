import { useEffect, useState } from 'react';
import { useUserContext } from "../hooks/ContextHooks";
import { useNotification } from "../hooks/apiHooks";
import { Notifications } from '../types/DBTypes';

const Notification = () => {
  const { getNotifications } = useNotification();
  const { user } = useUserContext();
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  const getUserNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      return;
    }
    try {
      const notifications = await getNotifications(user.user_id, token);
      setNotifications(notifications); // Update the state with the fetched notifications
    } catch (e) {
      console.log('get notifications error', (e as Error).message);
    }
  };

  useEffect(() => {
    getUserNotifications();
  }, [user]); // Ensure re-fetching when user changes

  return (
    <>
    {user ? (
    <>
      <div className="font-bold text-xl mb-4 text-center">Notifications</div>
      <ul className="list-none">
        {notifications.map((notification, index) => (
          <li key={index} className="mb-2 p-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors duration-150 ease-in-out">
            <div className={`font-semibold ${notification.read_status ? 'text-gray-600' : 'text-blue-600'}`}>
              {notification.notification_content}
            </div>
            <div className="text-sm text-right">
              Status: <span className={`font-bold ${notification.read_status ? 'text-green-500' : 'text-red-500'}`}>
                {notification.read_status ? 'Read' : 'Unread'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
    ) : (
      <div className="font-bold text-xl mb-4 text-center">Please log in to see your notifications</div>
    )}
    </>
  );
}

export default Notification;
