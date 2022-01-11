import React from 'react';
import { BrowserRouter, Route, Routes as BaseRoutes } from 'react-router-dom';
import { UsersPage, UserPage } from './pages';

export default function Routes(): React.ReactElement {
    return (
        <BrowserRouter>
            <BaseRoutes>
                <Route path="/" element={<UsersPage />} />
                <Route path=":userLogin" element={<UserPage />} />
            </BaseRoutes>
        </BrowserRouter>
    );
}
