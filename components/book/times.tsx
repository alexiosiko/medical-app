import React, { useState } from "react";
import { Button } from "../ui/button";

type Time = {
  time: string;
  disabled: boolean;
};

const timesData: Time[] = [
  { time: "8:00am", disabled: true },
  { time: "9:00am", disabled: true },
  { time: "10:00am", disabled: false },
  { time: "11:00am", disabled: true },
  { time: "12:00pm", disabled: false },
  { time: "1:00pm", disabled: true },
  { time: "2:00pm", disabled: false },
  { time: "3:00pm", disabled: true },
  { time: "4:00pm", disabled: false },
  { time: "5:00pm", disabled: false },
];

interface TimesProps {
  selectedTime: string;
  setTime: (time: string) => void;
}

const Times: React.FC<TimesProps> = ({ selectedTime, setTime }) => {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {timesData.map((time, index) => (
        <Button
          key={index}
          disabled={time.disabled}
          onClick={() => setTime(time.time)}
          className={time.time === selectedTime ? "bg-blue-500 text-white" : ""}
        >
          {time.time}
        </Button>
      ))}
    </div>
  );
};

export default Times;
