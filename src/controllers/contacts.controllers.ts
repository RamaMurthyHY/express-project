import { Request, Response } from "express";

const getAllContacts = (req: Request, res: Response) => {
  res.status(200).json({ message: "Get all contacts" });
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
