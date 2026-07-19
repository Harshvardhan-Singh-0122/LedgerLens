import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import { verifyUserEmail } from "../../services/auth.service";

import authIllustration from "../../assets/auth-illustration.png";

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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">
          Ledger<span className="text-violet-500">Lens</span>
        </h1>

        <p className="text-gray-400 mt-2">
          See Where Your Money Goes
        </p>

        <img
          src={authIllustration}
          alt="Verify Email"
          className="w-52 mx-auto my-8"
        />

        <h2 className="text-3xl font-bold text-white">
          Verifying Email...
        </h2>

        <p className="text-gray-400 mt-3">
          Please wait while we verify your email address.
        </p>

        <div className="flex justify-center mt-8">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;


// import { useEffect, useRef } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// import AuthLayout from "../../layouts/AuthLayout";
// import { verifyUserEmail } from "../../services/auth.service";

// const VerifyEmail = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const hasVerified = useRef(false);

//   useEffect(() => {
//     if (hasVerified.current) return;

//     hasVerified.current = true;

//     verifyEmail();
//   }, []);

//   const verifyEmail = async () => {
//     try {
//       const token = searchParams.get("token");

//       const response = await verifyUserEmail(token);

//       toast.success(response.message);

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Verification failed");

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     }
//   };

//   return (
//     <AuthLayout>
//       <h2 className="text-2xl font-bold text-center">Verifying Email...</h2>
//     </AuthLayout>
//   );
// };

// export default VerifyEmail;
