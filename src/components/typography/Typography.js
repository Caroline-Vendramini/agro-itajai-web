import React from 'react';
import './Typography.css';

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

// Variants: h1, h2, h3, h4, h5, h6, p, span
const Typography = ({ variant, children, className = '', ...props }) => {
  const Component = variants.includes(variant) ? variant : 'span';
  return (
    <Component className={`typography ${variant} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Typography;