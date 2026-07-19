const Input = ({
  type,
  placeholder,
  name,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-blue-500"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;