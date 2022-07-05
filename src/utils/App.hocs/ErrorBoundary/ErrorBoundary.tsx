// Component function dependencies
import React from 'react';

// Interfaces
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.interfaces';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }

    render() {
        if (this.state?.hasError || this.state?.error) {
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
