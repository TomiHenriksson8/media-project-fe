import UserMediaPost from "../components/UserMediaPost";
import { useUserContext } from "../hooks/ContextHooks";

const Profile = () => {

  const { user } = useUserContext();

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-lg font-bold text-left mb-3 ml-3">Profile</h2>
      {user && (
        <div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-row justify-start gap-6">
            <img src='https://place-hold.it/170x170.jpg&text=Pic2&fontsize=0' alt={user.username} className="w-20 h-20 rounded-full"/>
              <h3 className="font-bold mb-4 text-3xl mt-4">{user.username}</h3>
            </div>
            <p className="text-gray-600 pt-3"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-gray-600 pt-2"><span className="font-medium">Created:</span> {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
          </div>
          <UserMediaPost />
        </div>
      )}
    </div>
  );
};

export default Profile;
