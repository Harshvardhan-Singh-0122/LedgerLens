import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginSchema } from "../../utils/authValidation";
import { loginUser } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

import authIllustration from "../../assets/auth-illustration.png";
// import logo from "../../assets/logo.png";
// import googleLogo from "../../assets/google.png";

const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(response.data, response.accessToken);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto">
        <AuthHeader
          // logo={logo}
          illustration={authIllustration}
          title="Welcome back 👋"
          subtitle="Login to continue to your account"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password}
          />

          <div className="flex justify-end mb-7">
            <button
              type="button"
              className="text-sm text-violet-500 hover:text-violet-400"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-7">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-500 font-medium"
          >
            Sign Up
          </Link>
        </p>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-700"></div>

          <span className="px-4 text-gray-500 text-sm">
            or continue with
          </span>

          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <button
          type="button"
          className="w-full border border-gray-700 rounded-2xl py-4 flex items-center justify-center gap-3 text-white hover:border-violet-500 transition"
        >
          {/* <img
            src={googleLogo}
            alt="Google"
            className="w-5 h-5"
          /> */}
          
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          
          Continue with Google
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;






















// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

// import AuthLayout from "../../layouts/AuthLayout";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";

// import { loginSchema } from "../../utils/authValidation";
// import { loginUser } from "../../services/auth.service";
// import useAuth from "../../hooks/useAuth";

// const Login = () => {
//   const { login } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

// const onSubmit = async (data) => {
//     try {
//         const response = await loginUser(data);

//         login(response.data, response.accessToken);

//         toast.success(response.message);

//     } catch (error) {
//         toast.error(error.response?.data?.message || "Something went wrong");
//     }
// };

//   return (
//     <AuthLayout>
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Login
//       </h1>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           register={register}
//           error={errors.email}
//         />

//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           register={register}
//           error={errors.password}
//         />

//         <Button type="submit">
//           {isSubmitting ? "Logging In..." : "Login"}
//         </Button>
//       </form>
//     </AuthLayout>
//   );
// };

// export default Login;
