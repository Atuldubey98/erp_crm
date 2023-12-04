import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "../api/customer.api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function useCustomerForm() {
  const defaultCustomer = {
    name: "",
    shippingAddress: "",
    billingAddress: "",
    isSASameAsBA: false,
    gstNo: "",
    panNo: "",
  };
  const [customer, setCustomer] = useState<ICustomerFormProps>(defaultCustomer);
  const { customerId = "" } = useParams();
  useEffect(() => {
    if (!customerId) {
      setCustomer({
        name: "",
        shippingAddress: "",
        billingAddress: "",
        isSASameAsBA: false,
        gstNo: "",
        panNo: "",
      });
      return;
    }
    (async () => {
      const { data } = await getCustomer(customerId);
      setCustomer({
        ...data.data,
        isSASameAsBA:
          data.data.billingAddress === (data.data.shippingAddress || ""),
      });
    })();
  }, [customerId]);
  const navigate = useNavigate();
  const onChangeCustomerField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.currentTarget;
    if (type === "checkbox") {
      setCustomer({
        ...customer,
        [name]: (e.currentTarget as HTMLInputElement).checked,
      });
      return;
    }
    setCustomer({ ...customer, [name]: value });
  };
  const onCustomerFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!customer._id) {
        await createCustomer(customer);
        setCustomer(defaultCustomer);
      } else {
        const { data } = await updateCustomer(customer);
        setCustomer({
          ...data.data,
          isSASameAsBA:
            data.data.billingAddress === (data.data.shippingAddress || ""),
        });
        navigate(`/customers/${customer._id}`);
      }
      toast.success(customer._id ? "Customer updated" : "New customer created");
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Some error occured"
      );
    }
  };
  return { customerId, customer, onChangeCustomerField, onCustomerFormSubmit };
}
