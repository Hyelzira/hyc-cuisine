import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="section-container py-40 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="heading-section mb-6">This table doesn't exist</h1>
      <p className="text-neutral-400 mb-10 max-w-md mx-auto">
        The page you're looking for may have moved or been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-primary">Back to home</Link>
        <Link to="/menu" className="btn-outline">View the menu</Link>
      </div>
    </div>
  );
}