import * as React from 'react';
import { getRepositoryName } from '../../../../../services/utils';

type Props = {
  x: number;
  y: number;
  payload: {
    value: string;
  };
};

const CustomizedXAxisTick = ({ x, y, payload }: Props) => (
  <g
    transform={`
    translate(${x},${y})
    rotate(-30)
    `}
  >
    <text
      fontSize="12"
      x={0}
      y={0}
      dx={-payload.value.length * 1.33}
      dy={30}
      textAnchor="start"
      fill="#666"
    >
      {getRepositoryName(payload.value)}
    </text>
  </g>
);

export default CustomizedXAxisTick;
