import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

const RegisterForm = () => {
  const {postUser} = useUser();
  const [ usernameAvailable, setUsernameAvailable ] = useState<boolean>(true);
  const [ emailAvailable, setEmailAvailable ] = useState<boolean>(true);
  const [registerStatus, setRegisterStatus] = useState({ success: false, message: '' });
  const [popup, setPopup] = useState(false);
  const initValues = {username: '', password: '', email: ''};

  const doRegister = async () => {
    try {
      if (usernameAvailable && emailAvailable) {
        const response = await postUser(inputs);
        // If response has a message property, handle it accordingly
        if (response?.message === "Duplicate entry") {
          setRegisterStatus({ success: false, message: 'Username or email already in use. Please try another one.' });
          setPopup(true);
        } else {
          setRegisterStatus({ success: true, message: 'Registration successful! You can now log in.' });
          setPopup(true);
        }
      }
    } catch (error) {
      console.error(error);
      setRegisterStatus({ success: false, message: 'Registration failed. Please try again later.' });
      // Trigger error popup here
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(doRegister, initValues);

  const { getUsernameAvailable, getEmailAvailable } = useUser();

  const handleUsernameBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value)
    const result = await getUsernameAvailable(event.currentTarget.value);
    setUsernameAvailable(result.available);
  };

  const handleEmailBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    await getEmailAvailable(event.currentTarget.value);
    // setEmailAvailable(result.available);
  };

  useEffect(() => {
    if (registerStatus.success === false) {
      document.body.style.overflow = 'visible';
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [registerStatus]);


  // console.log(usernameAvailable, emailAvailable)
  return (
    <div className="flex flex-col   md:w-1/2 pt-10 bg-blue-200 dark:bg-slate-500 text-black dark:text-white">
      <h3 className="text-3xl mb-7 -mt-7">Register</h3>
      <form onSubmit={handleSubmit}  className="flex flex-col text-center">
        <div className="flex w-4/5">
          <label className="w-1/3 p6 text-end mt-6" htmlFor="username">Username</label>
          <input className="m-3 w-2/3 bg-slate-300 focus:bg-slate-200 rounded-md border border-slate-500 p-3 text-slate-950"
            name="username"
            type="text"
            id="username"
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
            autoComplete="username"
          />
        </div>
        {!usernameAvailable &&
        <div className="flex w-4/5 justify-end pr-4">
          <p className="text-red-500">Username not available</p>
        </div>
        }
        {registerStatus.success === false && popup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-slate-700 text-black dark:text-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl mb-4">Registration Failed!</h3>
              <p>{registerStatus.message}</p>
              <button
                onClick={() => setPopup(false)}
                className="m-3 rounded-md bg-slate-700 dark:bg-slate-300 pt-2 pb-2 pl-4 pr-4 text-white dark:text-black font-medium hover:bg-slate-600 dark:hover:bg-slate-400"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
      {registerStatus.success === true && popup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl mb-4">Registration Successful!</h3>
            <p>Welcome! You can now log in with your new account.</p>
            <button
              onClick={() => setPopup(false)}
              className="m-3 rounded-md bg-slate-700 pt-2 pb-2 pl-4 pr-4 text-white font-medium hover:bg-slate-600"
            >
              Close
            </button>
          </div>
          </div>
          <div>
            Registration Successful!
          </div>
        </>
      )}
        <div className="flex w-4/5">
          <label className="w-1/3 p6 text-end mt-6" htmlFor="password">Password</label>
          <input className="m-3 w-2/3 bg-slate-300 focus:bg-slate-200 rounded-md border border-slate-500 p-3 text-slate-950"
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p6 text-end mt-6" htmlFor="email">Email</label>
          <input className="m-3 w-2/3 bg-slate-300 focus:bg-slate-200 rounded-md border border-slate-500 p-3 text-slate-950"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            autoComplete="email"
          />
        </div>
        {!emailAvailable &&
        <div className="flex w-4/5 justify-end pr-4">
          <p className="text-red-500">Email not available</p>
        </div>
        }
        <div className="flex  justify-center">
          <button className="m-3 rounded-md bg-slate-700 pt-2 pb-2 pl-4 pr-4 text-white font-medium hover:bg-slate-600" type="submit">Register</button>
        </div>
      </form>
    </div>


  )
};

export default RegisterForm;
