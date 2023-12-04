import Customer from "./customer.model";
import { customerJoiSchema } from "./customer.request";
import { ICustomer, IUpdateCustomer } from "./types";

export function createCustomer(customer: ICustomer) {
  const newCustomer = new Customer(customer);
  return newCustomer.save();
}
export function makeCustomer(customer: ICustomer) {
  return customerJoiSchema.validateAsync(customer);
}
export function getCountOfCustomers(filter = {}) {
  return Customer.count(filter);
}
export function getAllCustomers({
  select = "",
  limit = 10,
  skip = 0,
  filter = {},
}) {
  return Customer.find(filter).select(select).skip(skip).limit(limit);
}
export function updateCustomer(customerId: string, customer: IUpdateCustomer) {
  return Customer.findByIdAndUpdate(customerId, customer, { new: true });
}

export function deleteCustomer(customerId: string) {
  return Customer.findByIdAndDelete(customerId);
}

export function getCustomer(customerId: string) {
  return Customer.findById(customerId);
}

export function searchCustomers(query: string, select: string = "") {
  return Customer.find({ $text: { $search: query } }).select(select);
}
