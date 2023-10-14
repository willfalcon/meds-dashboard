import { setWeek } from 'date-fns';
import { createContext, useContext, useState } from 'react';

import Header from './Header';
import { getArrayOfWeeks } from './utils';
import { Day, TH } from './calComponents';

const CalContext = createContext({
  date: new Date(),
  logs: [],
  meds: []
});

export default function index({ date = new Date(), logs = [], meds }) {
  const weeks = getArrayOfWeeks(date);

  return (
    <CalContext.Provider value={{ date, logs, meds }}>
      <div className="rounded-md border col-span-3 p-3">
        <Header />
        <table className="w-full border-collapse space-y-1" role="grid">
          <thead>
            <tr className="flex">
              <TH label="Sunday" text="Su" />
              <TH label="Monday" text="Mo" />
              <TH label="Tuesday" text="Tu" />
              <TH label="Wednesday" text="We" />
              <TH label="Thursday" text="Th" />
              <TH label="Friday" text="Fr" />
              <TH label="Saturday" text="Sa" />
            </tr>
          </thead>
          <tbody>
            {weeks.map(row => {
              const week = setWeek(date, row);

              return (
                <tr className="flex w-full mt-2" key={week.toString()}>
                  <Day week={week} day={0} date={date} />
                  <Day week={week} day={1} date={date} />
                  <Day week={week} day={2} date={date} />
                  <Day week={week} day={3} date={date} />
                  <Day week={week} day={4} date={date} />
                  <Day week={week} day={5} date={date} />
                  <Day week={week} day={6} date={date} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CalContext.Provider>
  );
}

export const useCalContext = () => useContext(CalContext);
