import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  isHomepage?: boolean;
};

const Card = ({ children, className, isHomepage = false }: CardProps) => {
  return (
    <section
      className={`${
        isHomepage ? 'bg-card-colorful' : 'bg-white'
      } rounded-3xl px-6 py-8 shadow-card ${className}`}
    >
      {children}
    </section>
  );
};
export { Card };
