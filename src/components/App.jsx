import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { load, save } from '../utils/storage';

import { Container, Title, ContactsTitle } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const savedContacts = load('contacts');
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    save('contacts', contacts);
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     save('contacts', this.state.contacts);
  //   }
  // }

  const checkName = name => {
    const normalizedName = name.toLowerCase();
    const foundName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (foundName) {
      alert(`${name} is already in contacts.`);
      return true;
    }
  };

  const addContact = (name, number) => {
    if (!checkName(name)) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts([contact, ...contacts]);
    }
    console.log('name, data :>> ', name, number);
  };

  const deleteContact = contactId => {
    return setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = e => {
    setFilterValue(e.currentTarget.value);
  };

  const filteredContacts = getFilteredContacts();
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmitFormData={addContact} />
      <Filter value={filterValue} onChangeFilter={changeFilter} />
      <ContactsTitle>Contacts</ContactsTitle>
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};

// export class oldApp extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = load('contacts');
//     if (savedContacts) {
//       this.setState({ contacts: savedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       save('contacts', this.state.contacts);
//     }
//   }

//   checkName = name => {
//     const { contacts } = this.state;
//     const normalizedName = name.toLowerCase();
//     const foundName = contacts.find(
//       contact => contact.name.toLowerCase() === normalizedName
//     );
//     if (foundName) {
//       alert(`${name} is already in contacts.`);
//       return true;
//     }
//   };

//   addContact = ({ name, number }) => {
//     if (!this.checkName(name)) {
//       const contact = {
//         id: nanoid(),
//         name,
//         number,
//       };

//       this.setState(({ contacts }) => ({
//         contacts: [contact, ...contacts],
//       }));
//     }
//   };

//   deleteContact = contactId => {
//     return this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   changeFilter = e => {
//     this.setState({
//       filter: e.currentTarget.value,
//     });
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();
//     return (
//       <Container>
//         <Title>Phonebook</Title>
//         <ContactForm onSubmitFormData={this.addContact} />
//         <Filter value={filter} onChangeFilter={this.changeFilter} />
//         <ContactsTitle>Contacts</ContactsTitle>
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </Container>
//     );
//   }
// }
