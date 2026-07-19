import { ArrowRight } from "lucide-react";

const Button = ({ children, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="
        w-full
        h-14
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        to-violet-500
        text-white
        font-semibold
        text-lg
        flex
        items-center
        justify-center
        relative
        transition-all
        duration-300
        hover:brightness-110
        hover:-translate-y-0.5
        active:translate-y-0
        active:scale-[0.98]
        shadow-lg
        hover:shadow-violet-500/30
        disabled:opacity-60
        disabled:cursor-not-allowed
        "
    >
      {children}

      <ArrowRight size={22} className="absolute right-5" />
    </button>
  );
};

export default Button;

// const Button = ({ children, type = "button" }) => {
//   return (
//     <button
//       type={type}
//       className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;
