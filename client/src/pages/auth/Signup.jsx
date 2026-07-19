import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { signupSchema } from "../../utils/authValidation";
import { registerUser } from "../../services/auth.service";

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
      <h1 className="text-2xl font-bold text-center mb-6">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          register={registerInput}
          error={errors.fullName}
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={registerInput}
          error={errors.email}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          register={registerInput}
          error={errors.password}
        />

        <Button type="submit">
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;