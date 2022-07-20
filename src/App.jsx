import { useState, useEffect } from "react";
import shortid from "shortid";
import Section from "./components/Section";
import ContactForm from './components/ContactForm'
import Filter from "./components/Filter";
import Contacts from './components/ContactsList'

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => JSON.parse(
    window.localStorage.getItem('contacts')) ?? []);
  
  useEffect(() => {
    window.localStorage.setItem(
      'contacts', JSON.stringify(contacts))
  }, [contacts]);

  const handleChangeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const addContact = (name, number) => {
    const newName = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(state => {
      if (state.every(({ name }) =>
        name.toLowerCase() !== newName.name.toLowerCase())) {
        return [...state, newName]
      } else {
        alert(`${newName.name} is already in contacts`);
        return state;
      }
    });
  };


  const deleteContact = (contactId) => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const visibleNames = () => {
    const convertFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(convertFilter));
  };

  return (
    <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={handleChangeFilter} />
          <Contacts contacts={visibleNames()} onDeleteContact={deleteContact} />
        </Section>
      </div>
  )
} 