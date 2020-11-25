import React, { Reducer, useEffect, useReducer } from 'react';
import { subMonths } from 'date-fns';
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
import Alert from '../../components/Alert';
import ReviewTime from './scenes/ReviewTime';
import PullRequestsOpen from './scenes/PullRequestsOpen';
import TabNavigation from '../../components/TabNavigation';
import DateRangePicker from '../../components/DateRangePicker';

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
      // TODO: response caching
      fetchPrMetrics(startDate, endDate, tabIndex === 1)
        .then((json) => {
          dispatch(setData(json));
        })
        .catch((err) => dispatch(setError(err)));
    }
  }, [startDate, endDate, tabIndex]);

  return (
    <div className="h-screen flex flex-col">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        disabled={loading}
        onChangeStartDate={(date) => dispatch(setStartDate(date as Date))}
        onChangeEndDate={(date) => dispatch(setEndDate(date as Date))}
      />
      <div className="flex justify-center">
        <TabNavigation
          items={['Review Time', 'PRs Opened']}
          tabIndex={tabIndex}
          onTabChange={(newTabIndex) => dispatch(setTabIndex(newTabIndex))}
          disabled={loading}
        />
      </div>
      <div className="container mx-auto border rounded-md p-4 bg-white">
        {error && <Alert>{error}</Alert>}
        {loading && (
          <div className="flex justify-center my-24">
            <Spinner size={24} />
          </div>
        )}
        {!loading && !error && data.length && (
          <>
            {tabIndex === 0 ? (
              <ReviewTime data={data[0].values} />
            ) : (
              <PullRequestsOpen data={data} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
