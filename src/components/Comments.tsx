import {useEffect, useRef, useState} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useComment} from '../hooks/apiHooks';
import { FaRegComment } from "react-icons/fa";

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);
  const {getCommentsByMediaId, postComment} = useComment();
  const [showComments, setShowComments] = useState(false);

  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(inputs.comment_text, item.media_id, token);
      await getComments();
      // resetoi lomake
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
    } catch (error) {
      console.error('getComments failed', error);
      setComments([]);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className='block'>
  <button onClick={toggleComments} aria-label="Toggle comments" className="text-2xl p-2 mt-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
    <FaRegComment />
  </button>
  {showComments && (
    <div className='mt-4 p-4 bg-gray-100 rounded-lg shadow w-96'>
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
