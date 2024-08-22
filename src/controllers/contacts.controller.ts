import { Request, Response } from "express";
import { Contact } from "../entities/index";
import * as Joi from "joi";

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getContact = async (req: Request, res: Response) => {
  const contact = await Contact.find({ where: { id: req.params.id } });
  if (!contact) {
    return res.status(404).json({ message: "Contact not found!" });
  }
  res.json(contact);
};

export const addContact = async (req: Request, res: Response) => {
  const { fullname, email, phone, description } = req.body;
  const check = Joi.object({
    fullname: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    phone: Joi.string().min(10).required(),
    email: Joi.string().email().min(10).required(),
  });
  const { error } = check.validate({ fullname, email, phone, description });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const newContact = await Contact.insert({
    fullname,
    email,
    phone,
    description,
  });

  res.json(newContact);
};

export const updateContact = async (req: Request, res: Response) => {
  const contact = await Contact.findOne({ where: { id: req.params.id } });
  if (!contact) {
    return res.status(404).json({ message: "Contact not found!" });
  }

  const { fullname, email, phone, description } = req.body;
  await Contact.update(contact.id, {
    fullname,
    email,
    phone,
    description,
  });

  const updatedContact = await Contact.findOne({
    where: { id: req.params.id },
  });
  res.json(updatedContact);
};

export const deleteContact = async (req: Request, res: Response) => {
  const contact = await Contact.findOne({ where: { id: req.params.id } });
  if (!contact) {
    return res.status(404).json({ message: "Contact not found!" });
  }
  await Contact.delete(contact.id);
  res.json({ message: "Contact deleted successfully!" });
};
