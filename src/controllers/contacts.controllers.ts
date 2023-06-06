import { Request, Response, NextFunction } from "express";
import { Contacts } from "../db/models";
import { StatusCodes } from "../enums";

const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = (req: Request, res: Response) => {
  res.status(200).json({ message: "Get a contact" });
};

const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone } = req.body || {};

    if (!name || !email || !phone) {
      res.status(StatusCodes.BadRequest);
      throw new Error("All fields are mandatory");
    }

    const foundContact = await Contacts.findOne({ email, phone });
    if (foundContact) {
      res.status(StatusCodes.Conflict);
      throw new Error("Contact already exist");
    }

    const contact = await Contacts.create({
      name,
      email,
      phone,
    });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = (req: Request, res: Response) => {
  res.status(200).json({ message: "Update contact" });
};

const deleteContact = (req: Request, res: Response) => {
  res.status(200).json({ message: "Delete contact" });
};

export {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
