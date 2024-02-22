import { useEffect, useState } from "react";
import { useFollow } from "../hooks/apiHooks";
import { User } from "../types/DBTypes";

type Count = {
  count: number;
};

type FollowingFollowersProps = {
  user: User;
  followStatusChanged: boolean;
};

const FollowingFollowers = ({ user, followStatusChanged }: FollowingFollowersProps) => {
  // Removed the redundant destructuring of 'user' from 'props' here
  const [followerCount, setFollowersCount] = useState<Count | undefined>(undefined);
  const [followingCount, setFollowingCount] = useState<Count | undefined>(undefined);
  const { getFollowingCount, getFollowersCount } = useFollow();

  const followingUser = async () => {
    try {
      const following = await getFollowingCount(user.user_id);
      console.log(following);
      setFollowingCount(following);
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  const followers = async () => {
    try {
      const followers = await getFollowersCount(user.user_id);
      console.log(followers);
      setFollowersCount(followers);
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  // Using followStatusChanged in the dependency array to re-run the effect when it changes
  useEffect(() => {
    followingUser();
    followers();
  }, [user, followStatusChanged]); // Added followStatusChanged to the dependency array

  return (
    <>
      <p>Followers: {followerCount ? followerCount.count : "Loading..."}</p>
      <p>Following: {followingCount ? followingCount.count : "Loading..."}</p>
    </>
  );
};

export default FollowingFollowers;

