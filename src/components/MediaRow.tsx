import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';




const MediaRow = (props: {
  item: MediaItemWithOwner
}) => {
  const {item}  = props;
  return (
    <>
      <Link to='/post' state={item}>
            <div className="media-item w-full max-w-96 mb-10 py-8 px-6 bg-white rounded-lg shadow-custom flex flex-col items-center" key={item.media_id}>
              <div className="media-header w-full flex items-center mb-3">
                {/* <img src={item.owner.profile_pic} alt="Owner" className="owner-image" /> */}
                <img className="profile-icon w-10 rounded-full" src="https://place-hold.it/170x170.jpg&text=Pic2&fontsize=0" alt="Profile" />
                <span className="username ml-3 text-lg">{item.username}</span>
              </div>
              <img src={item.thumbnail} className="media-thumbnail" />
              <p className='p-2 font-medium'>{item.title}</p>

              <span>{item.media_type}</span>
            </div>
          </Link>
    </>
  );
};

export default MediaRow;
