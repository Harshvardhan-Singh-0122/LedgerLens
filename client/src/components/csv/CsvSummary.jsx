const CsvSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">

      <div className="bg-[#0B1120] rounded-2xl p-4 border border-[#232B3B]">

        <p className="text-gray-400 text-sm">
          Total
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {summary.totalTransactions}
        </h2>

      </div>

      <div className="bg-[#0B1120] rounded-2xl p-4 border border-[#232B3B]">

        <p className="text-gray-400 text-sm">
          New
        </p>

        <h2 className="text-2xl font-bold text-green-400 mt-2">
          {summary.newTransactions}
        </h2>

      </div>

      <div className="bg-[#0B1120] rounded-2xl p-4 border border-[#232B3B]">

        <p className="text-gray-400 text-sm">
          Duplicate
        </p>

        <h2 className="text-2xl font-bold text-red-400 mt-2">
          {summary.duplicateTransactions}
        </h2>

      </div>

    </div>
  );
};

export default CsvSummary;  