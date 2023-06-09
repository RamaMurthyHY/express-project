import express, { Router } from "express";
import { auth } from "../helpers";
const router: Router = express.Router();

import {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers";

router.use(auth.verifyAccessToken); // This statement ensure all routes are protected

router.route("/").get(getAllContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
