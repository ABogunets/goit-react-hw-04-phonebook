import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { load, save } from '../utils/storage';

import { Container, Title, ContactsTitle } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filterValue, setFilterValue] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedContacts = load('contacts');
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    save('contacts', contacts);
  }, [contacts]);

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
