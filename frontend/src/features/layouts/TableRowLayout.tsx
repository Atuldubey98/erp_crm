export default function TableRowLayout({
  children,
}: {
  children: React.JSX.Element[] | React.JSX.Element;
}) {
  return <tr className="border-b-2 border-emerald-500">{children}</tr>;
}
