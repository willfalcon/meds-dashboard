import classNames from 'classnames';
import { getDate, isPast, isSameDay, isSameMonth, setDay } from 'date-fns';
import { useCalContext } from '.';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import LogForm from '../forms/LogForm';
import { cn } from '@/lib/utils';

export function TH({ label, text }) {
  return (
    <th scope="col" className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] flex-1" aria-label={label}>
      {text}
    </th>
  );
}

export function Day({ week, day, date }) {
  const cellDay = setDay(week, day);
  const thisMonth = isSameMonth(cellDay, date);
  const { logs, meds } = useCalContext();
  const log = logs.find(log => isSameDay(new Date(log.date), cellDay));
  const past = isPast(cellDay);

  const color = log?.notes ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <Popover>
      <td
        className="flex-1 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:rounded-md"
        role="presentation"
      >
        <PopoverTrigger asChild>
          <button
            name="day"
            className={cn(
              `inline-flex flex-col items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100`,
              !thisMonth && 'text-muted-foreground opacity-50'
            )}
            role="gridcell"
            tabIndex={-1}
            type="button"
          >
            {getDate(cellDay)}
            {past && <span className={cn(`w-1 h-1 block rounded-full`, color)} />}
          </button>
        </PopoverTrigger>
      </td>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
          </div>
          <LogForm date={cellDay} meds={meds} notes={log?.notes} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
