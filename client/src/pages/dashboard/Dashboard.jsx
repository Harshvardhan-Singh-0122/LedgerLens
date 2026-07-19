import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {user?.fullName}
      </h1>

      <button
        onClick={logout}
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;