import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCustomer, getCustomer } from "../api/customer.api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function useSingleCustomer() {
  const { customerId = "" } = useParams();
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [status, setStatus] = useState<IApiStatus>("loading");
  useEffect(() => {
    if (!customerId) {
      setCustomer(null);
      setStatus("failed");
      return;
    }
    (async () => {
      try {
        const { data } = await getCustomer(customerId);
        setCustomer(data.data);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
      }
    })();
  }, [customerId]);
  const navigate = useNavigate();
  const onDeleteCustomer = async () => {
    if (!customer) {
      return;
    }
    try {
      const response = confirm("Do you want to delete the customer ?");
      if (!response) {
        return;
      }
      await deleteCustomer(customer._id || "");
      navigate("/customers", { replace: true });
      toast.success("Customer deleted");
    } catch (error) {
      console.log(error);

      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Some error occured"
      );
    }
  };
  const onEditCustomerClick = () => {
    if (customer) {
      navigate(`/customers/${customer?._id}/edit`);
    }
  };
  return {
    customer,
    customerId,
    status,
    onDeleteCustomer,
    onEditCustomerClick,
  };
}
