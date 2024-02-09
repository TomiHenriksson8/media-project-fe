import { useUserContext } from "../hooks/ContextHooks";

const Profile = () => {

  const { user } = useUserContext();

  return (
    <>
      <h2>Profile page</h2>
      {user &&
      <>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Created: {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
      </>
      }
    </>
  )
};

export default Profile;
