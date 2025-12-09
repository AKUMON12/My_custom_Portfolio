import { portfolioData } from '../data/mock';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-glass-border dark:bg-black/40 bg-gray-200 text-center">
      <p className="text-muted text-sm">
        Designed & Built by <span className="text-primary">{portfolioData.personal.name}</span>
      </p>
      <p className="text-muted text-xs mt-2">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}