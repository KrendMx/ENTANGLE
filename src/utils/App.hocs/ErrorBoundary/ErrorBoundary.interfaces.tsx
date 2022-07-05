import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: string | null;
}

export type {
    ErrorBoundaryProps,
    ErrorBoundaryState,
};
