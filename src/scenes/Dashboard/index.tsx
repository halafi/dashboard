import React, { Reducer, useEffect, useReducer } from 'react';
import DatePicker from 'react-datepicker';
import { subMonths } from 'date-fns';
import classNames from 'classnames';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
import InfoBox from '../../components/InfoBox';

const today = new Date();

const Dashboard = () => {
  const [state, dispatch] = useReducer<Reducer<State, DashboardActions>>(dashboardReducer, {
    startDate: subMonths(today, 3),
    endDate: today,
    error: null,
    loading: false,
    data: [
      { date: '1.1.2008', values: ['300s', 24] },
      { date: '1.2.2008', values: ['750s', 21] },
    ],
    tabIndex: 0,
  });
  const { startDate, endDate, error, data, tabIndex, loading } = state;

  const mappedData = data.map((d) => ({
    date: d.date,
    prReviewTime: d.values[0] ? Number(d.values[0].slice(0, -1)) : null,
    prOpened: d.values[1],
  }));

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
  // TODO: extract components
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
        />
      </div>
      <div className="flex justify-center">
        <div>
          <nav className="flex bg-white">
            <button
              onClick={() => dispatch(setTabIndex(0))}
              type="button"
              className={classNames(
                'text-gray-600 py-2 px-4 block hover:text-blue-500 focus:outline-black text-xs sm:text-base sm:px-5',
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
                'text-gray-600 py-2 px-4 block hover:text-blue-500 focus:outline-black text-xs sm:text-base sm:px-5',
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
      <div className="container mx-auto border rounded-md p-4 bg-white min-h-1/2">
        {error && <Alert>{error}</Alert>}
        {loading && (
          <div className="flex justify-center my-24">
            <Spinner size={24} />
          </div>
        )}
        {!loading && !error && (
          <div className="flex">
            {tabIndex === 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={mappedData}
                    margin={{
                      top: 10,
                      right: 20,
                      bottom: 10,
                      left: 20,
                    }}
                  >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="prReviewTime"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <InfoBox title="Average" value="16 hours" />
              </>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={mappedData}
                    margin={{
                      top: 10,
                      right: 20,
                      bottom: 10,
                      left: 20,
                    }}
                  >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="prOpened"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <InfoBox title="Average" value="24 prs / repo" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
