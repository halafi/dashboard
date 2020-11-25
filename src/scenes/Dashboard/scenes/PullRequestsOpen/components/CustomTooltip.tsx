import * as React from 'react';
import { getRepositoryName } from '../../../../../services/utils';

type Props = {
  active: boolean;
  label: string;
  payload: { value: number }[]; // not typed fully
};

const CustomTooltip = ({ active, label, payload }: Props) => {
  if (active && payload[0]) {
    return (
      <div className="flex flex-col bg-white border border-gray-400 p-2">
        <span>{getRepositoryName(label)}</span>
        <span>PRs Opened: {payload[0].value}</span>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
