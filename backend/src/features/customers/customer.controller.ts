import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import requestAsyncHandler from "../../middlewares/requestAsyncHandler";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCountOfCustomers,
  getCustomer,
  makeCustomer,
  searchCustomers,
  updateCustomer,
} from "./customer.repository";
import { updateJoiSchema } from "./customer.request";
import { CustomerNotFound } from "./errors";

export const createNewCustomer = requestAsyncHandler(
  async (req: Request, res: Response, _: NextFunction) => {
    //@ts-ignore
    const customer = await makeCustomer(req.body);
    const newCustomer = await createCustomer(customer);
    return res.status(201).json({
      status: true,
      data: newCustomer,
      message: "New Customer created",
    });
  }
);

export const getAllCustomersController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(
      typeof req.query.limit === "string" ? req.query.limit : "10"
    );
    const skip = parseInt(
      typeof req.query.skip === "string" ? req.query.skip : "0"
    );
    const select = req.query.select;
    const filter = req.query.filter;
    const total = await getCountOfCustomers(filter);
    const customers = await getAllCustomers({
      select: String(select),
      filter,
      limit,
      skip,
    });
    return res.status(200).json({
      status: true,
      total,
      data: customers,
      limit,
      skip,
    });
  }
);

export const updateCustomerController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const customerId = isValidObjectId(req.params.customerId)
      ? req.params.customerId
      : null;
    if (!customerId) {
      throw new CustomerNotFound();
    }
    const updateCustomerBody = await updateJoiSchema.validateAsync(req.body);

    const select = typeof req.query.select === "string" ? req.query.select : "";
    const customer = await updateCustomer(
      req.params.customerId,
      updateCustomerBody
    ).select(select);
    if (!customer) {
      throw new CustomerNotFound();
    }
    return res.status(200).json({ status: true, data: customer });
  }
);

export const deleteCustomerController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const customerId = isValidObjectId(req.params.customerId)
      ? req.params.customerId
      : null;
    if (!customerId) {
      throw new CustomerNotFound();
    }
    const customer = await deleteCustomer(customerId);
    if (!customer) {
      throw new CustomerNotFound();
    }
    return res.status(200).send({ status: true, message: `Customer deleted` });
  }
);

export const getCustomerController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const customerId = isValidObjectId(req.params.customerId)
      ? req.params.customerId
      : null;
    if (!customerId) {
      throw new CustomerNotFound();
    }
    const select = typeof req.query.select === "string" ? req.query.select : "";
    const customer = await getCustomer(customerId).select(select);
    return res.status(200).json({ status: true, data: customer });
  }
);

export const searchCustomersController = requestAsyncHandler(
  async (req: Request, res: Response) => {
    const query = req.params.query;
    const select = typeof req.query.select === "string" ? req.query.select : "";
    if (!query) {
      return res.status(200).json({ status: true, data: [] });
    }
    const customers = await searchCustomers(query, select);
    return res
      .status(200)
      .json({ status: true, data: customers, total: customers.length });
  }
);
