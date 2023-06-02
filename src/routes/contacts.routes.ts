import express, { Router } from "express";
const router: Router = express.Router();

import {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers";

router.route("/").get(getAllContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
