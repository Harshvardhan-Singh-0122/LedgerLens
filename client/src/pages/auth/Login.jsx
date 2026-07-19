import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginSchema } from "../../utils/authValidation";
import { loginUser } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

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
      <h1 className="text-2xl font-bold text-center mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />

        <Button type="submit">
          {isSubmitting ? "Logging In..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;