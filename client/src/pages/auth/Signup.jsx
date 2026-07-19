import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import AuthHeader from "../../components/auth/AuthHeader";

import { signupSchema } from "../../utils/authValidation";
import { registerUser } from "../../services/auth.service";

import authIllustration from "../../assets/auth-illustration.png";
// import logo from "../../assets/logo.png";

const Signup = () => {
  const {
    register: registerInput,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      toast.success(response.message);

      reset();
    } catch (error) {
      console.log(error);
      console.log(error.response);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto">
        <AuthHeader
        //   logo={logo}
          illustration={authIllustration}
          title="Create your account 👋"
          subtitle="Start your financial journey with LedgerLens"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            register={registerInput}
            error={errors.fullName}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            register={registerInput}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            register={registerInput}
            error={errors.password}
          />

          <div className="flex items-center gap-2 text-gray-400 text-sm mb-7">
            <ShieldCheck size={18} className="text-violet-500" />
            <span>Use 8+ characters with letters, numbers & symbols</span>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-500 font-medium">
            Login
          </Link>
        </p>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-700"></div>

          <span className="px-4 text-gray-500 text-sm">or continue with</span>

          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <button
          type="button"
          className="w-full border border-gray-700 rounded-2xl py-4 flex items-center justify-center gap-3 text-white hover:border-violet-500 transition"
        >
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

export default Signup;

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

// import AuthLayout from "../../layouts/AuthLayout";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";

// import { signupSchema } from "../../utils/authValidation";
// import { registerUser } from "../../services/auth.service";

// const Signup = () => {
//   const {
//     register: registerInput,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const response = await registerUser(data);
//       toast.success(response.message);

//       reset();

//     } catch (error) {
//         console.log(error);
//         console.log(error.response);

//         toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <AuthLayout>
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Sign Up
//       </h1>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           register={registerInput}
//           error={errors.fullName}
//         />

//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           register={registerInput}
//           error={errors.email}
//         />

//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           register={registerInput}
//           error={errors.password}
//         />

//         <Button type="submit">
//           {isSubmitting ? "Signing Up..." : "Sign Up"}
//         </Button>
//       </form>
//     </AuthLayout>
//   );
// };

// export default Signup;
