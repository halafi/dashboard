import type { GroupedMetricValues } from '../../../services/api';

type MappedData = { name: string; prOpened: number; fill: string };

// tailwind blue- colors - FIXME - should go from theme
const COLORS = ['#60A5FA', '#3b83f6', '#2563EB', '#1D4ED8'];

export const mapperPullRequestsOpen = (data: GroupedMetricValues[]): MappedData[] =>
  data.map((repogroup, i) => ({
    name: repogroup.forRepositories[0],
    prOpened: repogroup.values[repogroup.values.length - 1].prOpened,
    fill: COLORS[i],
  }));

export const getAveragePrsPerRepo = (mappedData: MappedData[]): number =>
  mappedData.length === 0
    ? 0
    : mappedData.reduce((acc, repogroupData) => acc + repogroupData.prOpened, 0) /
      mappedData.length;
