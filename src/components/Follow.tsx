import { useEffect, useState } from "react";
import { useFollow, useNotification } from "../hooks/apiHooks";
import { User } from "../types/DBTypes";
import { useUserContext } from "../hooks/ContextHooks";

type FollowProps = {
  user: User;
  onFollowStatusChange: () => void;
};

const Follow = ({ user, onFollowStatusChange }: FollowProps) => {
  const [follow, setFollow] = useState<boolean>(false);
  const { postFollow, deleteFollow, checkFollowStatus } = useFollow();
  const { user: currentUser } = useUserContext();
  const { createFollowNotification} = useNotification();

  const followUser = async () => {
    const token = localStorage.getItem('token');
    if (!token || !currentUser) {
      return;
    }
    try {
      await postFollow(user.user_id, currentUser.user_id, token);
      setFollow(true);
      onFollowStatusChange();
      createFollowNoti();
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  const unfollowUser = async () => {
    const token = localStorage.getItem('token');
    if (!token || !currentUser) {
      return;
    }
    try {
      await deleteFollow(user.user_id, currentUser.user_id, token);
      setFollow(false);
      onFollowStatusChange();
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  const checkFollow = async () => {
    const token = localStorage.getItem('token');
    if (!token || !currentUser) {
      return;
    }
    try {
      const response = await checkFollowStatus(user.user_id, currentUser.user_id, token);
      setFollow(response.following);
    } catch (e) {
      console.error('Error checking follow status:', e);
    }
  };

  const createFollowNoti = async () => {
    const token = localStorage.getItem('token')
    if (!token || !user || !currentUser) {
      return
    }
    const content = `${currentUser.username} Followed you`
    try {
      await createFollowNotification(user.user_id, content, 300, token)
    } catch (e) {
      console.log('cant send noti: ', e)
    }
  };


  useEffect(() => {
    checkFollow();
  }, []);

  return (
    <>
    {follow ? (
      <button onClick={unfollowUser}>Unfollow</button>
    ) : (
      <button onClick={followUser}>Follow</button>
    )}
    </>
  )
}

export default Follow
