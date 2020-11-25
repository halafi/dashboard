import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import InfoBox from '../../../../components/InfoBox';
import type { GroupedMetricValues } from '../../services/api';
import CustomTooltip from './components/CustomTooltip';
import CustomizedYAxisTick from './components/CustomizedYAxisTick';
import CustomizedXAxisTick from './components/CustomizedXAxisTick';

type Props = {
  data: GroupedMetricValues[];
};

const PullRequestsOpen = ({ data }: Props) => {
  // TODO: extract to mapper + test
  const mappedData = data.map((repogroup) => ({
    name: repogroup.forRepositories[0],
    prOpened: repogroup.values[repogroup.values.length - 1].prOpened,
  }));
  const average =
    mappedData.reduce((acc, repogroupData) => acc + repogroupData.prOpened, 0) / mappedData.length;
  return (
    <div className="flex flex-col md:flex-row w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mappedData} margin={{ top: 10, right: 20, bottom: 40, left: 0 }}>
          <XAxis tick={CustomizedXAxisTick} dataKey="name" interval={0} />
          <YAxis tick={CustomizedYAxisTick} />
          <Tooltip content={CustomTooltip} />
          <Bar dataKey="prOpened" fill="#3b83f6" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center my-6">
        <InfoBox title="Average" value={`${average} PRs / repo`} />
      </div>
    </div>
  );
};

export default PullRequestsOpen;
