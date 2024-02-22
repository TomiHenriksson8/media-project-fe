import { useEffect, useState } from "react";
import { useFollow } from "../hooks/apiHooks";
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

  const followUser = async () => {
    const token = localStorage.getItem('token');
    if (!token || !currentUser) {
      return;
    }
    try {
      await postFollow(user.user_id, currentUser.user_id, token);
      setFollow(true);
      onFollowStatusChange();
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
