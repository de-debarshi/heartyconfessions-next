'use client'

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { render, screen, fireEvent } from '@testing-library/react';
import SubmitConfession from '../page';

describe('SubmitConfession', () => {
    it('renders the form', () => {
        render(<SubmitConfession />);
        expect(screen.getByLabelText(/Enter your age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Choose your gender/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confession category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Write your confession below/i)).toBeInTheDocument();
    });

    it('shows error messages when submitting empty form', async () => {
        render(<SubmitConfession />);
        fireEvent.click(screen.getByText(/Submit Confession/i));
        expect(await screen.findByText(/Age is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Gender is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Category is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Confession is required/i)).toBeInTheDocument();
    });
}); 