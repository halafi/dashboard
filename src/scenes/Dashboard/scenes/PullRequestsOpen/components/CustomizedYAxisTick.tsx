import * as React from 'react';
import { formatHours } from '../../../../../services/utils';

type Props = {
  x: number;
  y: number;
  payload: {
    value: number;
  };
};

export const CustomizedYAxisTick = ({ x, y, payload }: Props) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text fontSize="12" x={0} y={0} dx={0} dy={4} textAnchor="end" fill="#666">
        {payload.value}
      </text>
    </g>
  );
};

export default CustomizedYAxisTick;
