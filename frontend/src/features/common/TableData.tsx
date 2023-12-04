export default function TableData({
  isMiddleCol = false,
  data,
}: {
  isMiddleCol?: boolean;
  data: string;
}) {
  const className = `${
    isMiddleCol ? "border-x-2" : ""
  } border-emerald-500 p-1 text-sm`;
  return <td className={className}>{data}</td>;
}
