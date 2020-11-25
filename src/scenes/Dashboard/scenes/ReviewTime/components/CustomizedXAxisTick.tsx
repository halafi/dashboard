import * as React from 'react';
import { format, parseISO } from 'date-fns';

type Props = {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
};

const CustomizedXAxisTick = ({ x, y, payload }: Props) => (
  <g
    transform={`
    translate(${x},${y})
    rotate(-45)
    `}
  >
    <text fontSize="12" x={0} y={0} dx={-25} dy={16} textAnchor="start" fill="#666">
      {typeof payload.value === 'string'
        ? format(parseISO(payload.value), 'dd.MM.')
        : format(new Date(payload.value), 'dd.MM.')}
    </text>
  </g>
);

export default CustomizedXAxisTick;
