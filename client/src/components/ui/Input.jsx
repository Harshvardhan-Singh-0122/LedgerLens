import { useState } from "react";
import { Mail, LockKeyhole, User, Eye, EyeOff } from "lucide-react";

const Input = ({ label, type, placeholder, name, register, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (name === "fullName") return <User size={18} />;
    if (name === "email") return <Mail size={18} />;
    if (name === "password") return <LockKeyhole size={18} />;
    return null;
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-5">
      {label && (
        <label className="block text-white text-sm font-medium mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400">
          {getIcon()}
        </span>

        <input
          type={inputType}
          placeholder={placeholder}
          {...register(name)}
          className="
            w-full
            bg-[#141824]
            border
            border-gray-700
            rounded-2xl
            py-4
            pl-12
            pr-12
            text-white
            placeholder:text-gray-500
            outline-none
            transition-all
            duration-300
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-500/10
            hover:border-gray-500
            "
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mt-2">{error.message}</p>}
    </div>
  );
};

export default Input;

// const Input = ({
//   type,
//   placeholder,
//   name,
//   register,
//   error,
// }) => {
//   return (
//     <div className="mb-4">
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name)}
//         className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-blue-500"
//       />

//       {error && (
//         <p className="text-red-500 text-sm mt-1">
//           {error.message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Input;
