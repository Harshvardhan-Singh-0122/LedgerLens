// import AppRoutes from "./routes/AppRoutes";

// const App = () => {
//   return <AppRoutes />;
// };

// export default App;

import AppRoutes from "./routes/AppRoutes";

import GlobalTransactionModal from "./components/transactions/GlobalTransactionModal";

const App = () => {
  return (
    <>
      <AppRoutes />

      <GlobalTransactionModal />
    </>
  );
};

export default App;