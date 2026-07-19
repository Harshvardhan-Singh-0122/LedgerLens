const Button = ({ children, type = "button" }) => {
  return (
    <button
      type={type}
      className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default Button;