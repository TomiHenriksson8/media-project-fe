import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full text-center shadow-custom h-2/4  my-12">
        <LoginForm/>
        <RegisterForm />
      </div>
    </>
  );
};

export default Login;

