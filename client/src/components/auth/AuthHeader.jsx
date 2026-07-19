const AuthHeader = ({
  logo,
  illustration,
  title,
  subtitle,
}) => {
  return (
    <>
      <div className="flex items-center justify-center gap-3 mb-2">
        <img
          src={logo}
          alt="LedgerLens"
          className="w-10 h-10 sm:w-12 sm:h-12"
        />

        <h1 className="text-3xl font-bold text-white">
          Ledger<span className="text-violet-500">Lens</span>
        </h1>
      </div>

      <p className="text-center text-gray-500 font-medium">
        See Where Your Money Goes
      </p>

      <img
        src={illustration}
        alt={title}
        // className="w-60 sm:w-64 mx-auto mt-3 mb-3"
        className="
        w-60
        sm:w-68
        md:w-72
        mx-auto
        my-5
        transition-transform
        duration-300
        hover:scale-105
        "
      />

      <h2 
    //   className="text-2xl font-bold text-white text-center"
      className="text3xl sm:text-2xl font-bold text-white text-center"
      >
        {title}
      </h2>

      <p className="text-center text-gray-400 mt-2 mb-5">
        {subtitle}
      </p>
    </>
  );
};

export default AuthHeader;