import React from 'react';
import './Spinner.css';

type Props = {
  size?: number; // https://tailwindcss.com/docs/height && https://tailwindcss.com/docs/width
};

// SOURCE: https://tailwindcomponents.com/component/spinner
const Spinner = ({ size }: Props) => (
  <div
    className={`loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-${size} w-${size}`}
  />
);

Spinner.defaultProps = {
  size: 64,
};

export default React.memo(Spinner);
