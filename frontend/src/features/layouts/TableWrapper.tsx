export default function TableWrapper({
  headerRow,
  children,
}: {
  headerRow: string[];
  children: React.ReactNode;
}) {
  return (
    <table className="table-auto mx-auto w-full border-2 border-emerald-500 min-w-md overflow-scroll">
      <thead className="border-emerald-500 border-b-2 bg-slate-100 sticky top-0">
        <tr>
          {headerRow.map((row) => (
            <th className="border-r-2 border-emerald-500 text-sm" key={row}>
              {row}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
