import {useForm} from "../hooks/formHooks";
import {Credentials} from "../types/LocalTypes";
import { useUserContext } from "../hooks/ContextHooks";
import { useState } from "react";

const LoginForm = () => {
  const initValues: Credentials = {username: '', password: ''};
  const { handleLogin } = useUserContext();
  const [popup, setPopup] = useState(false);

  const doSubmit = async () => {

      const success =  await handleLogin(inputs as Credentials);
      if (!success) {
        setPopup(true);
      }
};

  const {handleSubmit, handleInputChange, inputs} = useForm(doSubmit, initValues);

  return (
    <div className="flex flex-col md:w-1/2  pt-10 bg-white dark:bg-gray-500 dark:text-white">
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

        {popup && (
          <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl mb-4">Login Failed!</h3>
              <p> Incorrect username or password </p>
              <button
                onClick={() => setPopup(false)}
                className="m-3 rounded-md bg-slate-700 pt-2 pb-2 pl-4 pr-4 text-white font-medium hover:bg-slate-600"
              >
              Close
              </button>
            </div>
          </div>
        </>
        )}

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
