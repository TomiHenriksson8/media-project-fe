import { useEffect, useState } from 'react';
import { useUserContext } from "../hooks/ContextHooks";
import { useNotification } from "../hooks/apiHooks";
import { Notifications } from '../types/DBTypes';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const { getNotifications, deleteNotification, markNotificationAsRead } = useNotification();
  const { user } = useUserContext();
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const navigate = useNavigate();

  const getUserNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      return;
    }
    try {
      const notifications = await getNotifications(user.user_id, token);
      setNotifications(notifications);
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

  const changeNotiStatus = async (notiId: number) => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      return;
    }
    try {
      await markNotificationAsRead(notiId, token);
    } catch (e) {
      console.log('mark notification as read error', (e as Error).message);
    }
  };

  const navigateToUser = (notification : Notifications) => {
    if (!notification || !notification.notification_content ) {
      return;
    }
    const username = notification.notification_content.split(' ')[0];
    changeNotiStatus(notification.notification_id)
    navigate(`/user/${username}`);
  };


  useEffect(() => {
    getUserNotifications();
  }, [user]);

  return (
    <>
      {user ? (
        <div className='mb-12'>
          <div className="font-bold text-xl mb-4 mt-8 text-center">Notifications</div>
          <ul className="list-none m-2">
            {notifications.map((notification) => (
                <li key={notification.notification_id} className={`mb-5 p-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors duration-150 ease-in-out ${notification.read_status ? '' : 'border-solid border-blue-300'}`}>
                <div className='flex justify-between items-start'>
                  <div className='flex-grow' onClick={(e) => e.stopPropagation()}>
                    <div className='font-semibold text-blue-800' onClick={() => navigateToUser(notification)} style={{cursor: 'pointer'}}>
                      {notification.notification_content}
                      <p className="text-sm text-blue-700">
                        {new Date(notification.created_at).toLocaleString('fi-FI')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); delNotification(notification.notification_id); }}
                    className='bg-red-500 text-white p-2 rounded-md font-medium'>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="font-bold text-xl mb-4 text-center">Please log in to see your notifications</div>
      )}
    </>
  );
}

export default Notification;
