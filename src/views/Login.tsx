import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  return (
    <>
      <div className=" h-52  text-center">
      <p className=" text-5xl p-10">🐕🐕🐕🐕🐕🐕 </p>
      </div>
      <div className="flex flex-row w-full text-center shadow-custom h-2/4  mt-12">
        <LoginForm></LoginForm>
        <RegisterForm />
      </div>
      <div className=" h-52  text-center">
        <p className=" text-5xl p-10">🐕🐕🐕🐕🐕🐕 </p>
      </div>
    </>
  );
};

export default Login;

