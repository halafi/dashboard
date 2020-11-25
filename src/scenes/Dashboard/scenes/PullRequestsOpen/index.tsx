import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import InfoBox from '../../../../components/InfoBox';
import type { MetricValues } from '../../services/api';

type Props = {
  data: MetricValues[];
};

const PullRequestsOpen = ({ data }: Props) => (
  <div className="flex flex-col md:flex-row w-full">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          bottom: 10,
          left: 20,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="prOpened"
          stroke="#8884d8"
          activeDot={{ strokeWidth: 2, r: 8, stroke: '#76D7EA' }}
        />
      </LineChart>
    </ResponsiveContainer>
    <InfoBox title="Average" value="24 prs / repo" />
  </div>
);

export default PullRequestsOpen;
