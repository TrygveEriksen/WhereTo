/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render, waitFor} from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom'

delete window.location;
window.location = { href: "" };



test('renders Home component with expected child components', async () => {
    
    const { getByTestId } = render(
        <BrowserRouter basename="/">
            <Home />
        </BrowserRouter>
    );
    
    await waitFor(() => {
        const navbar = getByTestId('navbar-test');
        expect(navbar).toBeInTheDocument();
    });
});

test("Destinations list loaded with mock destinations", async () => {
    const { getByTestId } = render(
        <BrowserRouter basename="/">
            <Home />
        </BrowserRouter>
    );
    await waitFor(() => {
        const destinationList = getByTestId('destination-list-test');
        expect(destinationList.length).toBe(1);
    })

});
