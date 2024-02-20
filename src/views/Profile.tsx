import UserMediaPost from "../components/UserMediaPost";
import { useUserContext } from "../hooks/ContextHooks";

const Profile = () => {

  const { user } = useUserContext();

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>
      {user && (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">{user.username}</h3>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-gray-600"><span className="font-medium">Created:</span> {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
          </div>
          <UserMediaPost />
        </>
      )}
    </div>
  );
};

export default Profile;
