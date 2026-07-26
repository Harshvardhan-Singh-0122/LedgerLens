import { Bell, Menu, Upload } from "lucide-react";
import logo from "../../assets/LedgerLens_logo.png";

const Header = () => {
  return (
    // <header className="px-4 pt-5">
    <header className="px-4 md:px-6 lg:px-8 pt-5">

      {/* Top */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Menu
            size={28}
            className="text-white"
          />

          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 object-contain"
          />

          <h2 className="text-white text-m font-semibold">
            LedgerLens
          </h2>

        </div>

        <div className="flex items-center gap-3">

          <button className="relative">

            <Bell
              size={28}
              className="text-white"
            />

            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-[9px] text-white flex items-center justify-center">
              3
            </span>

          </button>

          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-10 h-10 rounded-full"
          />

        </div>

      </div>

      {/* Greeting */}
      <div className="flex justify-between items-start mt-8">

        <div className="w-[68%]">

          <h1 className="text-white text-[20px] font-bold leading-[1.15]">
            Good morning,
            <br />
            Harshvardhan! 👋
          </h1>

          <p className="text-gray-400 text-[13px] mt-2">
            Here's your financial overview
          </p>

        </div>

        <button
          className="
            w-[127px]
            h-[77px]
            rounded-3xl
            bg-gradient-to-br
            from-violet-500
            to-violet-700
            shadow-[0_0_30px_rgba(124,58,237,0.45)]
            flex
            flex-col
            items-center
            justify-center
            text-white
            gap-2
          "
        >

          <Upload size={22} />

          <span className="text-[11px] font-medium">
            Upload CSV
          </span>

        </button>

      </div>

    </header>
  );
};

export default Header;