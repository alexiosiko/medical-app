import React, { ReactNode, FC } from 'react';

interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title: FC<TitleProps> = ({ children, className }) => {
  return (
    <p className={`text-xl font-bold ${className || ''}`}>
      {children}
    </p>
  );
};

export default Title;
