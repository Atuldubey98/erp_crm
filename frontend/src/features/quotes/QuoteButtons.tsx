import { Link } from "react-router-dom";

export function QuoteButtons(props: { _id: string }) {
  return (
    <div className="gap-2 flex items-center justify-end">
      <Link
        className="font-bold text-purple-900"
        to={`/quotes/${props._id}/edit`}
      >
        Edit
      </Link>
      <button className="font-bold text-red-500">Delete</button>
    </div>
  );
}
