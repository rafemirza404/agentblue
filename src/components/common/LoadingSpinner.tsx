/**
 * LoadingSpinner Component
 * Minimal loading state for code-split routes — no spinner, just a clean white page
 * to prevent jarring "revolving" UI on every navigation.
 */

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-white" />
  );
};
