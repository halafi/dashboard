import * as React from 'react';
import { formatHours } from '../services/utils';

type Props = {
  active: boolean;
  label: string;
  payload: { value: number }[]; // not typed fully
};

const CustomTooltip = ({ active, label, payload }: Props) => {
  if (active && payload[0]) {
    return (
      <div className="flex flex-col bg-white border border-gray-400 p-2 text-center">
        <span>{label}</span>
        <span>{formatHours(payload[0].value, true, 2)}</span>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
