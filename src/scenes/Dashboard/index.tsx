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
import { fetchPrMetrics } from './services/api';
import Spinner from '../../components/Spinner';

const today = new Date();

const Dashboard = () => {
  const [state, dispatch] = useReducer<Reducer<State, DashboardActions>>(dashboardReducer, {
    startDate: subMonths(today, 3),
    endDate: today,
    error: null,
    data: [],
    tabIndex: 0,
  });
  const { startDate, endDate, error, data, tabIndex } = state;

  useEffect(() => {
    if (startDate && endDate) {
      console.log(startDate);
      console.log(endDate);
      // pull request metrics
      fetchPrMetrics(startDate, endDate)
        .then((json) => {
          console.log(json);
          dispatch(setData(json));
        })
        .catch((err) => dispatch(setError(err)));
    }
  }, [startDate, endDate]);

  // TODO: memoization / re-renders
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
        {error}
        {!data.length && (
          <div className="flex justify-center my-24">
            <Spinner size={24} />
          </div>
        )}
        {data.map((d) => (
          <div key={d.date}>
            {d.date}: {d.values[0]}, {d.values[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
