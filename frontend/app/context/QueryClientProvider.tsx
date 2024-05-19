import { QueryClient, QueryClientProvider as RQQueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: { children: ReactNode }) => (
  <RQQueryClientProvider client={queryClient}>{children}</RQQueryClientProvider>
);
