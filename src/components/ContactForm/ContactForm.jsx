import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  FormWrapper,
  NameLabel,
  NameInput,
  NumberLabel,
  NumberInput,
  SubmitBtn,
} from 'components/ContactForm/ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitFormData(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <FormWrapper onSubmit={this.handleSubmit}>
        <NameLabel htmlFor={this.nameInputId}>Name</NameLabel>
        <NameInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          id={this.nameInputId}
          onChange={this.handleChange}
        />
        <NumberLabel htmlFor={this.numberInputId}>Number</NumberLabel>
        <NumberInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={this.numberInputId}
          value={this.state.number}
          onChange={this.handleChange}
        />
        <SubmitBtn type="submit">Add contact</SubmitBtn>
      </FormWrapper>
    );
  }
}

ContactForm.propTypes = {
  onSubmitFormData: PropTypes.func,
};
