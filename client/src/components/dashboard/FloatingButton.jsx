// import { Plus } from "lucide-react";

// const FloatingButton = () => {
//   return (
//     <button
//       className="
//         fixed
//         bottom-10
//         left-1/2
//         -translate-x-1/2
//         w-16
//         h-16
//         rounded-full

//         bg-gradient-to-br
//         from-violet-500
//         to-violet-700

//         flex
//         items-center
//         justify-center

//         shadow-[0_0_40px_rgba(124,58,237,0.45)]

//         active:scale-95
//         transition
//         z-50
//       "
//     >
//     {/* // <button className="fixed bottom-20 right-5 md:hidden" > */}
//       <Plus
//         size={30}
//         className="text-white"
//       />
//     </button>
//   );
// };

// export default FloatingButton;


//---------------------for add the transaction button in the middle of the screen-----------------
import { Plus } from "lucide-react";

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-10
        left-1/2
        -translate-x-1/2
        w-16
        h-16
        rounded-full
        bg-gradient-to-br
        from-violet-500
        to-violet-700
        flex
        items-center
        justify-center
        shadow-[0_0_40px_rgba(124,58,237,0.45)]
        active:scale-95
        transition
        z-50
      "
    >
      <Plus
        size={30}
        className="text-white"
      />
    </button>
  );
};

export default FloatingButton;