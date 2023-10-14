const { getWeeksInMonth, getWeekOfMonth, getWeek } = require('date-fns');

export function getArrayOfWeeks(date) {
  // This makes an array of each week of the month's week number within the year.
  // EG, if the current set date is in the 2nd week of October, and that's the 41st week of the year, and there's 5 weeks in the month,
  // the array is [40, 41, 42, 43, 44];
  const weeksInMonth = getWeeksInMonth(date);
  const weekOfMonth = getWeekOfMonth(date);
  const weekOfYear = getWeek(date);

  let rows = [];

  for (let i = 1; i <= weeksInMonth; i++) {
    rows.push(weekOfYear + (i - weekOfMonth));
  }

  return rows;
}
