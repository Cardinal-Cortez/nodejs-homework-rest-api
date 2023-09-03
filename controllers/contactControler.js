const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../models/contacts.js');
const contactsSchema = require('../validators/contactsValidator.js');

const getContacts = async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ message: "Not found" });
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      const missingField = error.details[0].path[0];
      return res.status(400).send({ message: `Missing required '${missingField}' field` });
    }
    const data = await addContact(req.body);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await removeContact(contactId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

const updateContactData = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactsSchema.validate(req.body);
    if (!req.body) {
      return res.status(400).send({ message: "missing fields" });
    }
    if (error) {
      const missingField = error.details[0].path[0];
      return res.status(400).send({ message: `Missing required '${missingField}' field` });
    }
    const data = await updateContact(contactId, req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ message: "Not found" });
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactData,
};
