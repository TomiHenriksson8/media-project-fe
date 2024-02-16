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
    <div className="flex flex-col w-1/2  pt-10 bg-white">
      <h3 className="text-3xl mb-7 -mt-7">Login</h3>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex w-4/5">
          <label className="w-1/3 p6 text-end mt-6" htmlFor="UserWithLevelname">Username</label>
          <input
            className="m-3 w-2/3 bg-slate-300 focus:bg-slate-200 rounded-md border border-slate-500 p-3 text-slate-950"
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p6 text-end mt-6" htmlFor="loginpassword">Password</label>
          <input
            className="m-3 w-2/3 bg-slate-300 focus:bg-slate-200 rounded-md border border-slate-500 p-3 text-slate-950"            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex  justify-center">
          <button className="m-3 rounded-md bg-slate-700 pt-2 pb-2 pl-4 pr-4 text-white font-medium hover:bg-slate-600" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
