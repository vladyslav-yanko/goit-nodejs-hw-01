const {v4} = require("uuid")
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (newContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

async function listContacts () {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const contact = contacts.find(item => item.id === contactId)
  if (!contact) {
    return null;
  }
  return contact
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter(item => item.id !== contactId)
  await updateContacts(newContacts)
  return contactId
}

async function addContact(data) {
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    const newContacts = [...contacts, newContact];
    await updateContacts(newContacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}