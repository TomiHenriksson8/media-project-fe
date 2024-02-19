import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';




const MediaRow = (props: {
  item: MediaItemWithOwner
}) => {
  const {item}  = props;

  return (
    <>
      <Link to='/post' state={item}>
            <div className="media-item w-full max-w-96 mt-2 mb-2 p-5 bg-blue-100 shadow-custom flex flex-col items-center rounded-md" key={item.media_id}>
              <div className="media-header w-full flex items-center mb-2">
                {/* <img src={item.owner.profile_pic} alt="Owner" className="owner-image" /> */}
                <img className="profile-icon w-10 rounded-full" src="https://place-hold.it/170x170.jpg&text=Pic2&fontsize=0" alt="Profile" />
                <span className="username ml-2">{item.username}</span>
              </div>
              {/* <img src={item.thumbnail} className="media-thumbnail" /> */}
              <img src="https://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20" className="media-thumbnail w-full mb-2" />
              <p>{item.description}</p>
              <span>{item.media_type}</span>
            </div>
          </Link>
    </>
  );
};

export default MediaRow;
