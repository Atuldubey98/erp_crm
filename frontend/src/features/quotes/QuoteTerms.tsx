export default function QuoteTerms({
  termsAndConditions,
  description,
}: {
  description: string;
  termsAndConditions: string;
}) {
  return (
    <>
      {termsAndConditions ? (
        <div className="text-sm leading-8">
          <h3 className="text-md font-bold">Terms And Conditons :</h3>
          <p>{termsAndConditions}</p>
        </div>
      ) : null}
      {description ? (
        <div className="text-sm leading-8">
          <h3 className="text-md font-bold">Description :</h3>
          <p>{description}</p>
        </div>
      ) : null}
    </>
  );
}
