import useQuotes from "../../hooks/useQuotes";
import PrivateMainLayout from "../layouts/PrivateMainLayout";
import TableWrapper from "../layouts/TableWrapper";
import { Filter } from "./Filter";
import { QuoteItemRow } from "./QuoteItemRow";

export default function QuotesPage() {
  const { filterProps, quotes, removeQuoteItem } = useQuotes();
  return (
    <PrivateMainLayout>
      <Filter {...filterProps} />
      <section className="container p-2">
        <TableWrapper
          headerRow={[
            "Date",
            "Quote No",
            "Customer Name",
            "Address",
            "Grand Total",
            "*",
          ]}
        >
          {quotes.map((quote) => (
            <QuoteItemRow
              key={quote._id}
              quote={quote}
              removeQuoteItem={removeQuoteItem}
            />
          ))}
        </TableWrapper>
      </section>
    </PrivateMainLayout>
  );
}
