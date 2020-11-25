/* eslint-disable camelcase */
import { formatISO } from 'date-fns';

export interface PrMetricsResponse {
  calculated: Calculated[];
  metrics: string[];
  date_from: string;
  date_to: string;
  timezone: number;
  granularities: string[];
  quantiles: any;
  exclude_inactive: boolean;
}

type Calculated = {
  for: For;
  granularity: string;
  values: MetricValues[];
};

type For = {
  repositories: string[];
};

export type MetricValues = {
  date: string;
  values: [string | null, number];
  confidence_scores?: number | undefined[];
  confidence_mins?: string | undefined[];
  confidence_maxs?: string | undefined[];
};

const API = 'https://api.athenian.co/v1/metrics/prs';
const REPOSITORIES = [
  'github.com/athenianco/athenian-api',
  'github.com/athenianco/athenian-webapp',
  'github.com/athenianco/infrastructure',
  'github.com/athenianco/metadata',
];

export const fetchPrMetrics = (startDate: Date, endDate: Date) =>
  new Promise<MetricValues[]>((resolve, reject) =>
    fetch(API, {
      body: JSON.stringify({
        for: [
          {
            repositories: REPOSITORIES,
          },
        ],
        metrics: ['pr-review-time', 'pr-opened'],
        date_from: formatISO(startDate, { representation: 'date' }),
        date_to: formatISO(endDate, { representation: 'date' }),
        granularities: ['day'],
        exclude_inactive: true, // hardcoded - whether pull requests without events occurring in the date range provided should be excluded or not.
        account: 1, // hardcoded
        timezone: 60,
      }),
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.calculated && json.calculated[0]) {
          resolve(json.calculated[0].values);
        }
        resolve([]);
      })
      .catch((err) => reject(String(err))),
  );
