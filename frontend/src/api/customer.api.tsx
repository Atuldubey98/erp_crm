import apiInstance, { sanitizedObject } from "./api.instance";
export enum ECustomersApi {
  CUSTOMERS = "/api/v1/customers",
  SEARCH_CUSTOMERS = "/api/v1/customers/search/",
}
export const paginatedCustomers = ({
  skip = 0,
  limit = 10,
  search = "",
}: {
  skip: number;
  limit: number;
  search: string;
}) => {
  return apiInstance.get(ECustomersApi.CUSTOMERS, {
    params: {
      skip,
      limit,
      select: "name shippingAddress billingAddress",
      q: search,
    },
  });
};

const getSanitizedCustomer = (newCustomer: ICustomerFormProps) => {
  return sanitizedObject({
    ...newCustomer,
    isSASameAsBA: undefined,
    shippingAddress: newCustomer.isSASameAsBA
      ? newCustomer.billingAddress
      : newCustomer.shippingAddress,
  });
};
export const createCustomer = async (newCustomer: ICustomerFormProps) => {
  return apiInstance.post(
    ECustomersApi.CUSTOMERS,
    getSanitizedCustomer(newCustomer)
  );
};

export const getCustomer = async (customerId: string) => {
  return apiInstance.get(ECustomersApi.CUSTOMERS + `/${customerId}`);
};

export const updateCustomer = async (newCustomer: ICustomerFormProps) => {
  const { _id, createdAt, updatedAt, ...customer } = newCustomer;
  return apiInstance.patch(
    ECustomersApi.CUSTOMERS + `/${newCustomer._id}`,
    getSanitizedCustomer(customer)
  );
};

export const deleteCustomer = async (customerId: string) => {
  return apiInstance.delete(ECustomersApi.CUSTOMERS + `/${customerId}`);
};

export const searchCustomer = async (query: string) => {
  return apiInstance.get(ECustomersApi.SEARCH_CUSTOMERS + query, {
    params: {
      select: "name billingAddress gstNo panNo",
    },
  });
};
