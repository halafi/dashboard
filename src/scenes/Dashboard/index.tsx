import React, { Reducer, useEffect, useReducer } from 'react';
import DatePicker from 'react-datepicker';
import { subMonths, formatISO } from 'date-fns';
import classNames from 'classnames';

import type { State, DashboardActions } from './services/reducer';
import dashboardReducer, {
  setStartDate,
  setEndDate,
  setError,
  setData,
  setTabIndex,
} from './services/reducer';

import 'react-datepicker/dist/react-datepicker.css';

const API = 'https://api.athenian.co/v1/metrics/prs';
const REPOSITORIES = [
  'github.com/athenianco/athenian-api',
  'github.com/athenianco/athenian-webapp',
  'github.com/athenianco/infrastructure',
  'github.com/athenianco/metadata',
];

const today = new Date();

const Dashboard = () => {
  const [state, dispatch] = useReducer<Reducer<State, DashboardActions>>(dashboardReducer, {
    startDate: subMonths(today, 6),
    endDate: today,
    error: null,
    data: null,
    tabIndex: 0,
  });
  const { startDate, endDate, error, data, tabIndex } = state;

  useEffect(() => {
    if (startDate && endDate) {
      console.log(startDate);
      console.log(endDate);
      // pull request metrics
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
          console.log(json);
          dispatch(setData(json));
        })
        .catch((err) => dispatch(setError(err)));
    }
  }, [startDate, endDate]);

  // TODO: mobile responsivness
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col sm:flex-row items-center justify-center my-16">
        <DatePicker
          className="text-sm shadow-md rounded-md border border-gray-400 py-2 px-4 sm:mr-1"
          selected={startDate}
          placeholderText="start date"
          onChange={(date) => dispatch(setStartDate(date as Date))}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
        />
        <DatePicker
          className="text-sm shadow-md rounded-md border border-gray-400 py-2 px-4 sm:ml-1"
          selected={endDate}
          placeholderText="end date"
          onChange={(date) => dispatch(setEndDate(date as Date))}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div className="flex justify-center">
        <div>
          <nav className="flex bg-white">
            <button
              onClick={() => dispatch(setTabIndex(0))}
              type="button"
              className={classNames(
                'text-gray-600 py-2 px-5 block hover:text-blue-500 focus:outline-black',
                {
                  'border-blue-500 border-b-2 text-blue-500': tabIndex === 0,
                },
              )}
            >
              Review Time
            </button>
            <button
              onClick={() => dispatch(setTabIndex(1))}
              type="button"
              className={classNames(
                'text-gray-600 py-2 px-5 block hover:text-blue-500 focus:outline-black',
                {
                  'border-blue-500 border-b-2 text-blue-500': tabIndex === 1,
                },
              )}
            >
              PRs Created
            </button>
          </nav>
        </div>
      </div>
      <div className="container mx-auto border rounded-md p-4 bg-white">
        Some content in a border
      </div>
    </div>
  );
};

export default Dashboard;
