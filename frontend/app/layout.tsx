import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <header className="py-4">
          <h1 className="text-3xl font-bold">Inventory Management System</h1>
        </header>
        <main>{children}</main>
        <footer className="py-4">
          <p>© 2024 Inventory Management System</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
