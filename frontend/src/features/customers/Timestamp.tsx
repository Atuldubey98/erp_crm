export default function Timestamp({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt?: string;
}) {
  return (
    <p>
      {updatedAt
        ? `Updated At : ${new Intl.DateTimeFormat("us").format(
            new Date(updatedAt)
          )}`
        : `Created At : ${new Intl.DateTimeFormat("us").format(
            new Date(createdAt)
          )}`}
    </p>
  );
}
