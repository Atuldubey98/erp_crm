export interface ICustomer {
  name: string;
  shippingAddress?: string;
  billingAddress: string;
  gstNo?: number;
  createdBy: string;
  updatedBy?: string;
  panNumber?: string;
}

export type IUpdateCustomer = Partial<ICustomer>;
