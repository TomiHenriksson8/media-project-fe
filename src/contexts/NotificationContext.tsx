import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNotification } from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

interface NotificationContextType {
  notiCount: number;
  setNotiCount: React.Dispatch<React.SetStateAction<number>>;
  fetchNotiCount: () => void;
}

// Providing a default value that matches the shape of NotificationContextType
const NotificationContext = createContext<NotificationContextType>({
  notiCount: 0,
  setNotiCount: () => {},
  fetchNotiCount: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => useContext(NotificationContext);


export const NotificationProvider = ({ children }: {children: ReactNode}) => {
  const { user } = useUserContext();
  const { getUnreadNotificationsCount } = useNotification();
  const [notiCount, setNotiCount] = useState(0);

  const fetchNotiCount = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user) return;
    try {
      const notifications = await getUnreadNotificationsCount(user.user_id, token);
      setNotiCount(notifications.count);
    } catch (e) {
      console.error(e);
      setNotiCount(0);
    }
  };

  useEffect(() => {
    fetchNotiCount();
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notiCount, setNotiCount, fetchNotiCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext }
