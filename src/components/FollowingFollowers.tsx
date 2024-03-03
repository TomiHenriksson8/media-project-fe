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
    <div className="flex gap-4 pt-2 ">
      <p>Followers: <span className=" font-semibold">{followerCount ? followerCount.count : "Loading..."}</span></p>
      <p>Following: <span className="font-semibold">{followingCount ? followingCount.count : "Loading..."}</span></p>
    </div>
  );
};

export default FollowingFollowers;

