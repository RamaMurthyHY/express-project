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

const getContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;
    const contact = await Contacts.findById(_id).catch((error) => {
      throw error;
    });
    if (!contact) {
      res.status(StatusCodes.NotFound);
      throw new Error("Contact not found for the give id");
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
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

const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const { name } = req.body || {};
    const contact = await Contacts.findById(_id);
    if (!contact) {
      res.status(StatusCodes.NotFound);
      throw new Error("Contact not found");
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
      _id,
      { name },
      {
        new: true,
      }
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

};

export {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
