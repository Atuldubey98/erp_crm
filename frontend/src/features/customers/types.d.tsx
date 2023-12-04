type ICustomer = {
  _id?: string;
  shippingAddress: string;
  name: string;
  billingAddress: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  gstNo?: string;
  panNo?: string;
  updatedAt?: string;
};

type ICustomerFormProps = {
  name: string;
  _id?: string;
  shippingAddress: string;
  billingAddress: string;
  isSASameAsBA: boolean;
  gstNo?: string;
  panNo?: string;
  createdAt?: string;
  updatedAt?: string;
};
