import { Link, useNavigate } from "react-router-dom";
import { deleteQuote } from "../../api/quote.api";

export function QuoteButtons(props: { _id: string }) {
  const navigate = useNavigate();
  const onDeleteClick = async () => {
    const response = confirm("Do you want to delete the quote?");
    if (response) {
      await deleteQuote(props._id);
      navigate("/quotes", { replace: true });
    }
  };
  return (
    <div className="gap-2 flex items-center justify-end">
      <Link
        className="font-bold text-purple-900"
        to={`/quotes/${props._id}/edit`}
      >
        Edit
      </Link>
      <button onClick={onDeleteClick} className="font-bold text-red-500">
        Delete
      </button>
    </div>
  );
}
