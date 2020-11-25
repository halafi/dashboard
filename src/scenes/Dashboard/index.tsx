import React, { Reducer, useEffect, useReducer } from 'react';
import DatePicker from 'react-datepicker';
import { subMonths } from 'date-fns';
import classNames from 'classnames';
import type { State, DashboardActions } from './services/reducer';
import dashboardReducer, {
  setStartDate,
  setEndDate,
  setError,
  setData,
  setTabIndex,
} from './services/reducer';
import { fetchPrMetrics } from './services/api';
import Spinner from '../../components/Spinner';

import 'react-datepicker/dist/react-datepicker.css';
import Alert from '../../components/Alert';
import ReviewTime from './scenes/ReviewTime';
import PullRequestsOpen from './scenes/PullRequestsOpen';
import TabNavigation from '../../components/TabNavigation';

const today = new Date();

const Dashboard = () => {
  const [state, dispatch] = useReducer<Reducer<State, DashboardActions>>(dashboardReducer, {
    startDate: subMonths(today, 3),
    endDate: today,
    error: null,
    loading: true,
    data: [],
    tabIndex: 0,
  });
  const { startDate, endDate, error, data, tabIndex, loading } = state;

  useEffect(() => {
    if (startDate && endDate) {
      // pull request metrics
      fetchPrMetrics(startDate, endDate)
        .then((json) => {
          dispatch(setData(json));
        })
        .catch((err) => dispatch(setError(err)));
    }
  }, [startDate, endDate]);

  // TODO: memoization / re-renders
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col sm:flex-row items-center justify-center my-4 sm:my-8 md:my-16">
        <DatePicker
          className="text-xs sm:text-sm shadow-md rounded-md border border-gray-400 py-2 px-4 sm:mr-1"
          selected={startDate}
          placeholderText="Start Date"
          onChange={(date) => dispatch(setStartDate(date as Date))}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          disabled={loading}
        />
        <DatePicker
          className="text-xs sm:text-sm shadow-md rounded-md border border-gray-400 py-2 px-4 sm:ml-1"
          selected={endDate}
          placeholderText="End Date"
          onChange={(date) => dispatch(setEndDate(date as Date))}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          disabled={loading}
        />
      </div>
      <div className="flex justify-center">
        <TabNavigation
          items={['Review Time', 'PRs Created']}
          tabIndex={tabIndex}
          onTabChange={(newTabIndex) => dispatch(setTabIndex(newTabIndex))}
        />
      </div>
      <div className="container mx-auto border rounded-md p-4 bg-white">
        {error && <Alert>{error}</Alert>}
        {loading && (
          <div className="flex justify-center my-24">
            <Spinner size={24} />
          </div>
        )}
        {!loading && !error && (
          <>{tabIndex === 0 ? <ReviewTime data={data} /> : <PullRequestsOpen data={data} />}</>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
