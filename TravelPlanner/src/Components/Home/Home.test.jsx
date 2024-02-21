/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render, waitFor,screen} from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom'

jest.mock('axios');
window.scrollTo = jest.fn();

describe('tests home component', () => {

    beforeEach(async () => {
        render(
            <BrowserRouter basename="/">
                <Home />
            </BrowserRouter>
        );

        await screen.findAllByTestId('navbar-test')

    })

    test('renders Home component with Navbar', async () => {        
        
        await waitFor(() => {
            const navbar = screen.getByTestId('navbar-test');
            expect(navbar).toBeInTheDocument();
        });
    });

    test("Destinations list loaded with mock destinations", async () => {

        const mockDestination1 = await screen.findByText('MockCountry1');
        const mockDestination2 = await screen.findByText('MockCountry2');
        const mockDestination3 = await screen.findByText('MockCountry3');

        expect(mockDestination1).toBeInTheDocument();
        expect(mockDestination2).toBeInTheDocument();
        expect(mockDestination3).toBeInTheDocument();

    });

    
})

