export default function FilterAddNewSectionWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="w-full bg-slate-200 p-3 flex flex-wrap justify-between gap-2">
      {children}
    </div>
  );
}
