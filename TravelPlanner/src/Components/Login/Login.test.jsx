/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render, waitFor,screen, fireEvent} from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom'

jest.mock('axios');


describe('tests Login component', () => {
    beforeEach(() => {
        Storage.prototype.setItem = jest.fn();

        render(
            <BrowserRouter basename="/">
                <Login />
            </BrowserRouter>
        );

    })

    afterEach(() => {
        jest.clearAllMocks();
    })
    screen.debug()

    test('user login works', async () => {
        fireEvent.click(screen.getByTestId('submit-test'))
         // Check for the error message
        const errorMessage = await screen.findByText('Du må ha brukernavn');
        expect(errorMessage).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText('Brukernavn'), {target: {value: 'mockuser'}});
        fireEvent.change(screen.getByPlaceholderText('Passord'), {target: {value: 'mockpassword'}});

        fireEvent.click(screen.getByTestId('submit-test'));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('user','testToken');
        })
    })
})