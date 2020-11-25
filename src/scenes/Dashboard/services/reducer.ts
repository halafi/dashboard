import type { MetricValues } from './api';

const SET_START_DATE = 'SET_START_DATE';
const SET_END_DATE = 'SET_END_DATE';
const SET_ERROR = 'SET_ERROR';
const SET_DATA = 'SET_DATA';
const SET_TAB_INDEX = 'SET_TAB_INDEX';
// const SET_LOADING = 'SET_LOADING';

// TODO: move to global types
type Nullable<T> = T | null;

type SetStartDateAction = {
  type: typeof SET_START_DATE;
  payload: {
    date: Nullable<Date>;
  };
};

type SetEndDateAction = {
  type: typeof SET_END_DATE;
  payload: {
    date: Nullable<Date>;
  };
};

type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: {
    error: string;
  };
};

type SetDataAction = {
  type: typeof SET_DATA;
  payload: {
    data: MetricValues[];
  };
};

type SetTabIndexAction = {
  type: typeof SET_TAB_INDEX;
  payload: {
    index: number;
  };
};

// type SetLoadingAction = {
//   type: typeof SET_LOADING;
//   payload: {
//     loading: boolean;
//   };
// };

export const setStartDate = (date: Nullable<Date>): SetStartDateAction => ({
  type: SET_START_DATE,
  payload: {
    date,
  },
});

export const setEndDate = (date: Nullable<Date>): SetEndDateAction => ({
  type: SET_END_DATE,
  payload: {
    date,
  },
});

export const setError = (error: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: {
    error,
  },
});

export const setData = (data: MetricValues[]): SetDataAction => ({
  type: SET_DATA,
  payload: {
    data,
  },
});

export const setTabIndex = (index: number): SetTabIndexAction => ({
  type: SET_TAB_INDEX,
  payload: {
    index,
  },
});

// export const setLoading = (loading: boolean): SetLoadingAction => ({
//   type: SET_LOADING,
//   payload: {
//     loading,
//   },
// });

export type DashboardActions =
  | SetStartDateAction
  | SetEndDateAction
  | SetErrorAction
  | SetTabIndexAction
  | SetDataAction;
// | SetLoadingAction;

export type State = {
  startDate: Nullable<Date>;
  endDate: Nullable<Date>;
  error: Nullable<string>;
  data: MetricValues[];
  tabIndex: number;
  loading: boolean;
};

const minesweeperReducer = (oldState: State, action: DashboardActions): State => {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...oldState,
        startDate: action.payload.date,
        loading: action.payload.date !== null,
        error: null,
      };
    case SET_END_DATE:
      return {
        ...oldState,
        endDate: action.payload.date,
        loading: action.payload.date !== null,
        error: null,
      };
    case SET_ERROR:
      return { ...oldState, error: action.payload.error, loading: false };
    case SET_DATA:
      return { ...oldState, data: action.payload.data, loading: false, error: null };
    case SET_TAB_INDEX:
      return { ...oldState, tabIndex: action.payload.index };
    // case SET_LOADING: return { ...oldState, loading: action.payload.loading };
    default:
      throw new Error();
  }
};

export default minesweeperReducer;
