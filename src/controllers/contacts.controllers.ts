import { Request, Response, NextFunction } from "express";
import { Contacts } from "../db/models";

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

const createContact = (req: Request, res: Response) => {
  res.status(201).json({ message: "Create contact" });
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
