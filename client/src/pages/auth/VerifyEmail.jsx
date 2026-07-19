import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import { verifyUserEmail } from "../../services/auth.service";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;

    hasVerified.current = true;

    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const token = searchParams.get("token");

      const response = await verifyUserEmail(token);

      toast.success(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center">Verifying Email...</h2>
    </AuthLayout>
  );
};

export default VerifyEmail;
