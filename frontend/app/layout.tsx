'use client';

import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div className="container mx-auto">
            <header className="py-4">
              <h1 className="text-3xl font-bold">Inventory Management System</h1>
            </header>
            <main>{children}</main>
            <footer className="py-4 my-4">
              <p>© 2024 Inventory Management System - Xolani Mazibuko</p>
            </footer>
          </div>
        </QueryClientProvider>
        </body>
    </html>
  );
}
