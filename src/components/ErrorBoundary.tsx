import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render-time errors anywhere in the tree and shows a friendly
 * fallback instead of unmounting the whole app to a blank white screen.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Declared explicitly because this project has no @types/react installed
  // (react resolves as `any`), so inherited members aren't visible to tsc.
  declare props: ErrorBoundaryProps;
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surfaced in dev; in production this is where a monitoring service
    // (e.g. Sentry) would receive the error.
    console.error('Unhandled UI error:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#FDFCFB] dark:bg-gray-900 px-6 text-center"
        >
          <h1 className="text-3xl font-serif text-[#1A1A1A] dark:text-white">
            Something went wrong
          </h1>
          <p className="text-[#6B7280] dark:text-gray-400 max-w-md">
            An unexpected error occurred. Please reload the page — if the problem
            persists, contact the clinic directly.
          </p>
          <button
            onClick={this.handleReload}
            className="bg-[#1E4D92] hover:bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-full transition-all"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
