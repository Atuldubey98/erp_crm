export default function LoadMoreBtn({
  onClick,
  status,
}: {
  status: IApiStatus;
  onClick: () => void;
}) {
  const className = `font-bold text-sm bg-teal-800 p-1 rounded mb-2 text-white ${
    status === "loading" ? "cursor-wait" : ""
  } `;
  return (
    <button
      disabled={status === "loading"}
      onClick={onClick}
      className={className}
    >
      Load More
    </button>
  );
}
