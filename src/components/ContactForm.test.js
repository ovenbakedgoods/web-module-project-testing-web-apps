import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import { countChanges } from 'jest-diff/build/printDiffs';


test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    //arrange
    const screen = render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //arrange
    const screen = render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const submitButton = screen.getByRole('button', {name: /submit/i});

    //act
    userEvent.type(firstNameInput, "Amy");
    userEvent.click(submitButton);

    //assert
    const firstNameError = screen.getByText(/must have at least 5 characters./i);
    expect(firstNameError).toBeInTheDocument;

});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    const screen = render(<ContactForm />);
    //arrange 
    const submitButton = screen.getByRole('button', {name: /submit/i});
    //act
    userEvent.click(submitButton);
    //assert
    const firstNameError = screen.getByText(/error: firstName must have at least 5 characters./i);
    const lastNameError = screen.getByText(/error: lastName is a required field./i);
    const emailError = screen.getByText(/Error: email must be a valid email address./i);

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();


    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const screen = render(<ContactForm />);
    //arrange
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const submitButton = screen.getByRole('button', {name: /submit/i});
    //act
    userEvent.type(firstNameInput, "Jabari");
    userEvent.type(lastNameInput, "Brasher");
    userEvent.click(submitButton);

    //assert
    const emailError = screen.getByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const screen = render(<ContactForm />);
    //arrange
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', {name: /submit/i});
    //act
    userEvent.type(emailInput, "bellydancer");
    userEvent.click(submitButton);

    //assert
    const emailError = screen.getByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const screen = render(<ContactForm />);
    //arrange
    const firstNameInput = screen.getByLabelText(/first name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', {name: /submit/i});

    //act
    userEvent.type(firstNameInput, "Jabari");
    userEvent.type(emailInput, "ovenbakedgoods88@gmail.com");
    userEvent.click(submitButton);

    //assert
    const lastNameError = screen.getByText(/error: lastName is a required field./i);
    expect(lastNameError).toBeInTheDocument();


});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const screen = render(<ContactForm />);
    //arrange
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', {name: /submit/i});

    //act
    userEvent.type(firstNameInput, "Jabari");
    userEvent.type(lastNameInput, "Brasher");
    userEvent.type(emailInput, "ovenbakedgoods88@gmail.com");
    userEvent.click(submitButton);

    //assert
    const firstNameMessage = screen.getByText(/jabari/i);
    const lastNameMessage = screen.getByText(/brasher/i);
    const emailMessage = screen.getByText(/ovenbakedgoods88@gmail.com/i);
    const messageMessage = screen.queryByText(/message:/i)

    expect(firstNameMessage).toBeInTheDocument();
    expect(lastNameMessage).toBeInTheDocument();
    expect(emailMessage).toBeInTheDocument();
    expect(messageMessage).not.toBeInTheDocument();
    

});

test('renders all fields text when all fields are submitted.', async () => {
    const screen = render(<ContactForm />);
    //arrange
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', {name: /submit/i});

    //act
    userEvent.type(firstNameInput, "Jabari");
    userEvent.type(lastNameInput, "Brasher");
    userEvent.type(emailInput, "ovenbakedgoods88@gmail.com");
    userEvent.type(messageInput, "dodo bird");
    userEvent.click(submitButton);

    //assert
    const firstNameMessage = screen.getByText(/jabari/i);
    const lastNameMessage = screen.getByText(/brasher/i);
    const emailMessage = screen.getByText(/ovenbakedgoods88@gmail.com/i);
    const messageMessage = screen.queryByText(/dodo bird/i)

    expect(firstNameMessage).toBeInTheDocument();
    expect(lastNameMessage).toBeInTheDocument();
    expect(emailMessage).toBeInTheDocument();
    expect(messageMessage).toBeInTheDocument();
    
});