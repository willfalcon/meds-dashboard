import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from '../ui/button';

import * as z from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format, getMonth, getYear } from 'date-fns';
import { BsCalendarHeart, BsFillPlusSquareFill } from 'react-icons/bs';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import LogArrayField from './LogArrayField';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useRouter } from 'next/router';
import { Label } from '../ui/label';

const logFormSchema = z.object({
  date: z.date({
    required_error: 'Date is required.',
  }),
  notes: z.array(
    z.object({
      med: z.number(),
      code: z.string(),
      note: z.string(),
    }) 
  ),
});

export default function LogForm({ meds, date = new Date(), notes = [] }) {
  console.log(notes);
  const form = useForm({
    resolver: zodResolver(logFormSchema),
    defaultValues: {
      date: date,
      notes: notes.map(note => {
        return { ...note, med: note.medId };
      }),
    },
  });

  const { control, register, handleSubmit, getValues, setValue, watch } = form;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'notes', // unique name for your Field Array
  });

  const router = useRouter();

  const onSubmit = async data => {
    const response = await fetch('/api/log', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (response.status == 200) {
      router.push(`/calendar/${getYear(data.date)}/${getMonth(data.date)}`);
    }
  };

  const selected = getValues('date');

  return (
    <Form {...form}>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn('w-[240px] pl-3 text-left font-normal')}>
                      {selected ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <BsCalendarHeart className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <div className="mb-4">
          <Label>Notes</Label>
          <ul>
            {fields.map((field, index) => (
              <LogArrayField key={field.id} {...field} index={index} {...form} meds={meds} remove={remove} />
            ))}
          </ul>
          <Button
            onClick={e => {
              e.preventDefault();
              append({ med: '', code: '', note: '' });
            }}
            aria-label="Add note"
            variant="ghost"
          >
            <BsFillPlusSquareFill className="h-4 w-4 " />
          </Button>
        </div>
        <Button type="submit">Submit Log</Button>
      </form>
    </Form>
  );
}
