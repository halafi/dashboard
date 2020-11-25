import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import InfoBox from '../../../../components/InfoBox';
import type { MetricValues } from '../../services/api';
import CustomTooltip from './components/CustomTooltip';
import CustomizedYAxisTick from './components/CustomizedYAxisTick';
import CustomizedXAxisTick from './components/CustomizedXAxisTick';
import { getAverageReviewTime } from './services/utils';
import { formatHours } from '../../../../services/utils';

// TODO: setup tailwind theme referencing in javascript without increasing bundle size

type Props = {
  data: MetricValues[];
};

const ReviewTime = ({ data }: Props) => (
  <div className="flex flex-col md:flex-row w-full">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          bottom: 20,
          left: 0,
        }}
      >
        <XAxis tick={CustomizedXAxisTick} dataKey="date" />
        <YAxis tick={CustomizedYAxisTick} />
        <Tooltip content={CustomTooltip} />
        <Line type="monotone" dataKey="prReviewTime" connectNulls stroke="#3b83f6" />
      </LineChart>
    </ResponsiveContainer>
    <div className="flex justify-center my-6">
      <InfoBox title="Average" value={formatHours(getAverageReviewTime(data))} />
    </div>
  </div>
);

export default ReviewTime;
