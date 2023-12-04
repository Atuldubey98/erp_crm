import { Link } from "react-router-dom";

export default function CustomerPart({
  customer,
}: {
  customer: ICustomerPart;
}) {
  return (
    <div className="text-sm block border-b-2 pb-2 grid gap-2">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <span className="font-bold">Billing address</span>
          <p>{customer.billingAddress}</p>
        </div>
        <div className="grid gap-2">
          {customer.gstNo ? (
            <p>
              <span className="font-bold">GST No. - : </span>
              {customer.gstNo}
            </p>
          ) : null}
          {customer.panNo ? (
            <p>
              <span className="font-bold">PAN No. - : </span>
              {customer.panNo}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Link
          className="text-sm text-purple-800 text-right"
          to={`/customers/${customer._id}/edit`}
        >
          Edit
        </Link>
        <Link
          className="text-sm text-emerald-800 text-right"
          to={`/customers/new`}
        >
          Add
        </Link>
      </div>
    </div>
  );
}
