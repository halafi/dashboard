import React from 'react';
import './Alert.css';

type Props = {
  children: React.ReactNode;
};

// TODO: extend this as needed

// SOURCE: https://tailwindcomponents.com/component/simple-alerts
const Alert = ({ children }: Props) => (
  <div
    className="block text-sm text-left text-red-600 bg-red-200 border border-red-400 h-12 flex items-center p-4 rounded-sm"
    role="alert"
  >
    {children}
  </div>
);

export default React.memo(Alert);
