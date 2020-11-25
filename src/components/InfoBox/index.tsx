import React from 'react';

type Props = {
  title: string;
  value: string;
};

const InfoBox = ({ value, title }: Props) => (
  <div className="flex flex-col justify-center w-48">
    <div className="border border-gray-300 rounded text-center">
      <div className="border-b text-left px-3 py-1 text-gray-500 text-sm font-medium">{title}</div>
      <div className="py-6 font-bold text-lg">{value}</div>
    </div>
  </div>
);

export default InfoBox;
