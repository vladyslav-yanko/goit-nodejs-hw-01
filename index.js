const contactsOperations = require("./contacts.js");
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    try {
        switch (action) {
    case 'list':
        const contacts = await contactsOperations.listContacts();
        console.table(contacts)
      break;

    case 'get':
        const contactById = await contactsOperations.getContactById(id)
        console.log(contactById)
      break;

    case 'add':
        const addContact = await contactsOperations.addContact({ name, email, phone })
        console.log(addContact)
      break;

    case 'remove':
                await contactsOperations.removeContact(id)
                console.log('Success operation!!!')
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
    } catch (err) {
        throw err;
    }
}

invokeAction(argv);
