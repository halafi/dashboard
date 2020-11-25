import type { MetricValues } from '../../../services/api';

// eslint-disable-next-line import/prefer-default-export
export const getAverageReviewTime = (data: MetricValues[]): number => {
  const dataWithReviewTime = data.filter((d) => d.prReviewTime);
  return (
    dataWithReviewTime.reduce((acc, d) => acc + (d.prReviewTime as number), 0) /
    dataWithReviewTime.length
  );
};
