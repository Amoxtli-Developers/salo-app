import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";

interface DateRangePickerInputProps {
  value: [Date | null, Date | null];
  onChange: (value: [Date | null, Date | null]) => void;
}

const DateRangePickerInput: React.FC<DateRangePickerInputProps> = ({
  value,
  onChange,
}) => {
  const [startDate, endDate] = value;

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    onChange([start, end]);
  };

  return (
    <ReactDatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      placeholderText="Rango de fechas"
      isClearable
      customInput={<TextField variant="outlined" size="small" fullWidth sx={{ minWidth: 240 }}/>}
    />
  );
};

export default DateRangePickerInput;
