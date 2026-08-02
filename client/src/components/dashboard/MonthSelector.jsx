const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthSelector = ({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
}) => {
  return (
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(Number(e.target.value))}
      className="
        bg-[#141C28]
        border
        border-[#2A3344]
        rounded-lg
        px-3
        py-1.5
        text-[11px]
        text-white
        outline-none
        cursor-pointer
      "
    >
      {months.map((month, index) => (
        <option
          key={month}
          value={index + 1}
          className="bg-[#141C28]"
        >
          {month} {selectedYear}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;