import type { MetricValuesInput, MetricValues } from './api';

// eslint-disable-next-line import/prefer-default-export
export const mapperPrMetrics = (input: MetricValuesInput[]): MetricValues[] =>
  input.map((d) => ({
    date: d.date,
    prReviewTime: d.values[0] ? Number(d.values[0].slice(0, -1)) : null,
    prOpened: d.values[1],
  }));
