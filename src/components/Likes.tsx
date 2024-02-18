import { useEffect, useReducer } from "react"
import { Like, MediaItemWithOwner } from "../types/DBTypes"
import { useLike } from "../hooks/apiHooks";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

type LikeInitialState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

const initialState: LikeInitialState = {
  count: 0,
  userLike: null,
};

const likeReducer = (state: LikeInitialState, action: LikeAction): LikeInitialState => {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
  }
};



const Likes = ({item}: {item : MediaItemWithOwner}) => {

  const [likeState, likeDispatch] = useReducer(likeReducer, initialState);
  const { getUserLike, getCountByMediaId, postLike, deleteLike } = useLike()

    // get user like
  const getLikes = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(item.media_id, token);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (e as Error).message);
    }
  };

  // get like count
  const getLikeCount = async () => {
    // TODO: get like count and dispatch it to the state
    try {
      const countResponse = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (e) {
      likeDispatch({type: 'setLikeCount', count: 0});
      console.log('get user like error', (e as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      // If user has liked the media, delete the like. Otherwise, post the like.
      if (likeState.userLike) {
        // delete the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
        await deleteLike(likeState.userLike.like_id, token);
        // other way, do update locally after succesful api call
        likeDispatch({type: 'setLikeCount', count: likeState.count - 1});
        likeDispatch({type: 'like', like: null});

      } else {
        // post the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
        await postLike(item.media_id, token);
        getLikes();
        getLikeCount();

      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };

  return (
    <div className="flex  flex-col gap-1" >
      <button onClick={handleLike} className="text-lg p-3 mt-2  bg-gray-200 rounded-full hover:bg-gray-300 ">
        {likeState.userLike ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart />
        )}
      </button>
      <p className=" font-medium text-gray-900 ml-4 -mt-1">{likeState.count}</p>
    </div>
  );
};

export default Likes
