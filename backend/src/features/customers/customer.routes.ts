import { Router } from "express";
import {
  createNewCustomer,
  deleteCustomerController,
  getAllCustomersController,
  getCustomerController,
  searchCustomersController,
  updateCustomerController,
} from "./customer.controller";
import {
  createEntityHandler,
  paginateEntityHandler,
  updateEntityHandler,
} from "../../handlers/entity.handler";

const customerRouter = Router();

customerRouter.post("/", createEntityHandler, createNewCustomer);
customerRouter.get("/", paginateEntityHandler, getAllCustomersController);
customerRouter.get("/:customerId", getCustomerController);
customerRouter.patch(
  "/:customerId",
  updateEntityHandler,
  updateCustomerController
);
customerRouter.delete("/:customerId", deleteCustomerController);
customerRouter.get("/search/:query", searchCustomersController);
export default customerRouter;
