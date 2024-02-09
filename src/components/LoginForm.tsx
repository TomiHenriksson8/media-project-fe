import {useForm} from "../hooks/formHooks";
import {Credentials} from "../types/LocalTypes";
import { useUserContext } from "../hooks/ContextHooks";

const LoginForm = () => {
  const initValues: Credentials = {username: '', password: ''};
  const { handleLogin } = useUserContext();

  const doSubmit = async () => {
    try {
        handleLogin(inputs as Credentials);
    } catch (e) {
        console.log((e as Error).message);
    }
};

  const {handleSubmit, handleInputChange, inputs} = useForm(doSubmit, initValues);

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="UserWithLevelname">Username</label>
          <input
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
