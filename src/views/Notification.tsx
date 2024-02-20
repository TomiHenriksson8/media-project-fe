import { useEffect, useState } from 'react';
import { useUserContext } from "../hooks/ContextHooks";
import { useNotification } from "../hooks/apiHooks";
import { Notifications } from '../types/DBTypes';

const Notification = () => {
  const { getNotifications, deleteNotification } = useNotification();
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

  const delNotification = async (notiId: number) => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      return;
    }
    try {
      await deleteNotification(notiId, token);
      setNotifications(currentNotifications =>
        currentNotifications.filter(notification => notification.notification_id !== notiId))
      } catch (e) {
      console.log('delete notification error', (e as Error).message);
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
            {notifications.map((notification) => (
              <li key={notification.notification_id} className="mb-2 p-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors duration-150 ease-in-out">
                <div className='flex justify-between items-start'>
                  <div className='font-semibold text-blue-600'>
                    {notification.notification_content}
                    <p className="text-sm">
                      {new Date(notification.created_at).toLocaleString('fi-FI')}
                    </p>
                  </div>
                  <button
                    onClick={() => delNotification(notification.notification_id)}
                    className='bg-red-500 text-white p-1 rounded-md'
                  >
                    Delete
                  </button>
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
