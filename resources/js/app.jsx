import '../css/app.css';
import './bootstrap';

import React, { Suspense } from "react";
import i18n from "../../src/i18n";
import { I18nextProvider } from "react-i18next";

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';






const appName = import.meta.env.VITE_APP_NAME || 'Laravel';



 
 
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
        <React.StrictMode>
            <Suspense fallback={<div>Loading...</div>}>
            <I18nextProvider i18n={i18n}>
            <App {...props} />
            </I18nextProvider>
               
            </Suspense>
        </React.StrictMode>);
    },
    progress: {
        color: '#4B5563',
    },
});
