import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  startDate: Nullable<Date>;
  endDate: Nullable<Date>;
  disabled: boolean;
  onChangeStartDate: (d: Date) => void;
  onChangeEndDate: (d: Date) => void;
};

const DateRangePicker = ({
  startDate,
  endDate,
  disabled,
  onChangeStartDate,
  onChangeEndDate,
}: Props) => (
  <div className="flex flex-col sm:flex-row items-center justify-center my-4 sm:my-8 md:my-16">
    <DatePicker
      className="text-xs sm:text-sm shadow-md rounded-md border border-gray-400 py-2 px-4 sm:mr-1"
      selected={startDate}
      placeholderText="Start Date"
      onChange={onChangeStartDate}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      maxDate={endDate}
      disabled={disabled}
    />
    <DatePicker
      className="text-xs sm:text-sm shadow-md rounded-md border border-gray-400 py-2 px-4 sm:ml-1"
      selected={endDate}
      placeholderText="End Date"
      onChange={onChangeEndDate}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      disabled={disabled}
    />
  </div>
);

export default React.memo(DateRangePicker);
