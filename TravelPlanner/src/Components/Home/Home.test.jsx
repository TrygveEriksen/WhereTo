/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render, waitFor,screen} from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom'
import API from '../../API/API'
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'

describe('tests home component', () => {

   
    test('renders Home component with expected child components', async () => {
        await waitFor(() => {
            const { getByTestId } = render(
                <BrowserRouter basename="/">
                    <Home />
                </BrowserRouter>
            );

        })
        
        
        await waitFor(() => {
            const navbar = getByTestId('navbar-test');
            expect(navbar).toBeInTheDocument();
        });
    });

    test("Destinations list loaded with mock destinations", async () => {

        
        await waitFor(() => {
        render(
            <BrowserRouter basename="/">
                <Home />
            </BrowserRouter>
            );

        })
            
    
        expect(screen.getByText('MockPlace1, MockCountry1')).toBeInTheDocument();
        expect(screen.getByText('MockPlace2, MockCountry2')).toBeInTheDocument();
    });
})

