const fs = require('fs/promises');
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function read() {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data)
}

function write(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}
const listContacts = async () => {
  const data = await read();

  return data;
}

const getContactById = async (contactId) => {
    const data = await read();

  const getContact = data.find(contact => contact.id === contactId);

  if (!getContact) {
    throw new Error('Contact not found');
  };

  return getContact;
}

const removeContact = async (contactId) => {
  
  const data = await read();

  const removedContact = data.find(contact => contact.id === contactId);
  
  if (!removedContact) return {"message": "Not found"};

  const updatedContacts = data.filter(contact => contact.id !== contactId);

  await write(updatedContacts);

  return {"message": "contact deleted"};
}

const addContact = async (body) => {
  const data = await read();

  const newContact = { ...body, id: crypto.randomUUID() };
  
  data.push(newContact);

  await write(data);

  return newContact;
}

const updateContact = async (contactId, body) => {
  const data = await read();

  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw new Error('Contact not found');
  }
  
  data[index] = { ...body, id: contactId };

  await write(data);

  return { ...body, id: contactId };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
