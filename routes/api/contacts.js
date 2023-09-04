const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactData,
} = require('../../controllers/contactControler'); 
const { validateData } = require('../../validators/contactsValidator');


router.get('/', getContacts);
router.get('/:contactId', getContact);
router.post('/', validateData, createContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId',validateData, updateContactData);

module.exports = router;