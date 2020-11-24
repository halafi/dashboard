const SET_START_DATE = 'SET_START_DATE';
const SET_END_DATE = 'SET_END_DATE';
const SET_ERROR = 'SET_ERROR';
const SET_DATA = 'SET_DATA';

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
    data: any;
  };
};

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

// TODO: type
export const setData = (data: any): SetDataAction => ({
  type: SET_DATA,
  payload: {
    data,
  },
});

export type DashboardActions =
  | SetStartDateAction
  | SetEndDateAction
  | SetErrorAction
  | SetDataAction;

export type State = {
  startDate: Nullable<Date>;
  endDate: Nullable<Date>;
  error: Nullable<string>;
  data: Nullable<any>; // TODO: type
};

const minesweeperReducer = (oldState: State, action: DashboardActions): State => {
  switch (action.type) {
    case SET_START_DATE:
      return { ...oldState, startDate: action.payload.date };
    case SET_END_DATE:
      return { ...oldState, endDate: action.payload.date };
    case SET_ERROR:
      return { ...oldState, error: action.payload.error };
    case SET_DATA:
      return { ...oldState, data: action.payload.data };
    default:
      throw new Error();
  }
};

export default minesweeperReducer;
