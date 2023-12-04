import PrivateMainLayout from "../layouts/PrivateMainLayout";
import CustomerForm from "./CustomerForm";
import { FormHeading } from "../common/FormHeading";

export default function CustomerFormPage() {
  return (
    <PrivateMainLayout>
      <section className="container p-2">
        <FormHeading text="Customer" />
        <CustomerForm />
      </section>
    </PrivateMainLayout>
  );
}
