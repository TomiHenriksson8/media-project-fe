import {useEffect, useReducer, useRef, useState} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {Comment, MediaItemWithOwner} from '../types/DBTypes';
import {useComment, useNotification} from '../hooks/apiHooks';
import { FaRegComment } from "react-icons/fa";

type CommentInitialState = {
  count: number;
  userComment: Comment & { username: string } | null;
  userComments: Array<Comment & { username: string }>;
};

type CommentAction = {
  type: 'setCommentCount' | 'incrementCommentCount' | 'comment' | 'setComments';
  comment?: Comment & { username: string } | null;
  comments?: Array<Comment & { username: string }>;
  count?: number;
};

const initialState: CommentInitialState = {
  count: 0,
  userComment: null,
  userComments: [],
};

const commentReducer = (state: CommentInitialState, action: CommentAction): CommentInitialState => {
  switch (action.type) {
    case 'setCommentCount':
      // Set the total count of comments
      return {...state, count: action.count ?? state.count};

    case 'incrementCommentCount':
      // Increment the count by 1
      return {...state, count: state.count + 1};

    case 'comment':
      // Set the user comment; action.comment should be a Comment object with username
      if (action.comment !== undefined) {
        return {...state, userComment: action.comment};
      }
      return state;

    case 'setComments':
      // Set the array of comments; action.comments should be an array of Comment objects with usernames
      if (action.comments !== undefined) {
        return {...state, userComments: action.comments};
      }
      return state;

    default:
      // It's usually a good idea to have a default case returning the current state
      return state;
  }
};






const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const { createCommentNotification } = useNotification();
  const formRef = useRef<HTMLFormElement>(null);
  const {getCommentsByMediaId, postComment, getCommentCountByMediaId} = useComment();
  const [showComments, setShowComments] = useState(false);
  const [commentState, commentDispatch] = useReducer(commentReducer, initialState);

  const initValues = {comment_text: ''};

  const getCommentCount = async () => {
    try {
      const countResponse = await getCommentCountByMediaId(item.media_id);
      commentDispatch({type: 'setCommentCount', count: countResponse.count});
    } catch (e) {
      commentDispatch({type: 'setCommentCount', count: 0});
      console.log('get user comment error', (e as Error).message);
    }
  };

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(inputs.comment_text, item.media_id, token);
      createCommentNoti();
      // After successful comment posting, increment the comment count
      commentDispatch({type: 'incrementCommentCount'});
      await getComments(); // You may consider removing this if you're only incrementing the count
      // reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('postComment failed', error);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doComment,
    initValues,
  );

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
      commentDispatch({type: 'setComments', comments: comments});
    } catch (error) {
      console.error('getComments failed', error);
      setComments([]);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const createCommentNoti = async () => {
    const token = localStorage.getItem('token')
    if (!token || !user) {
      return
    }
    const content = `${user.username} Commented on your post ${item.title}: ${inputs.comment_text}.`
    try {
      await createCommentNotification(item.user_id, content, item.media_id, token)
    } catch (e) {
      console.log('cant send noti: ', e)
    }
  };

  useEffect(() => {
    getComments();
    getCommentCount();
  }, [item]);

  return (
    <div className='flex  flex-col gap-1'>
      <button onClick={toggleComments} aria-label="Toggle comments" className="text-lg p-3 mt-2 bg-gray-200 dark:bg-slate-400 rounded-full">
        <FaRegComment />
      </button>
      <p className="font-medium text-gray-900 dark:text-white ml-4 -mt-1">{commentState.count}</p>
      {showComments && (
        <div className='mt-4 p-4 bg-gray-100 rounded-lg shadow w-max md:w-96'>
          {user && (
            <>
              <h3 className="text-xl font-semibold mb-3">Leave a Comment</h3>
              <form onSubmit={handleSubmit} ref={formRef} className="bg-white rounded-lg p-4 shadow">
                <div className="flex flex-col mb-4">
                  <label htmlFor="comment" className="mb-2 font-semibold">
                    Comment
                  </label>
                  <textarea
                    className="rounded-md border bg-gray-200 border-gray-300 p-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    name="comment_text"
                    id="comment"
                    rows={4}
                    placeholder="What are your thoughts?"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </form>
            </>
          )}
          {comments.length > 0 && (
            <>
              <h3 className="text-xl font-semibold my-3">Comments</h3>
              <ul className="space-y-2">
                {comments.map((comment) => (
                  <li key={comment.comment_id} className="bg-white rounded-lg p-3 shadow">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        {new Date(comment.created_at!).toLocaleDateString('fi-FI')}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {comment.username}
                      </span>
                      <p className="text-gray-700 mt-1">{comment.comment_text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
</div>
  );
};

export default Comments;
