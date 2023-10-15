import { useState } from 'react';
import { BsCalendarHeart, BsTrash } from 'react-icons/bs';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export default function LogArrayField({ id, index, getValues, setValue, meds, control, remove }) {
  const values = getValues('notes');
  // console.log(values);
  const value = values[index].med;
  const code = values[index].code;
  const [codeOpen, setCodeOpen] = useState(false);
  const note = values[index].note;

  return (
    <Card className="mb-4 p-4 grid gap-3" key={id}>
      <Select
        value={value}
        onValueChange={e => {
          setValue('notes', [
            ...values.slice(0, index),
            {
              ...values[index],
              med: e,
            },
            ...values.slice(index + 1),
          ]);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a medication" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Medications</SelectLabel>
            {meds.map(med => (
              <SelectItem key={med.id} value={med.id}>
                {med.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Popover open={codeOpen} onOpenChange={setCodeOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={codeOpen} className="w-[200px] justify-between">
            {code ? codes.find(codeItem => codeItem.value === code)?.label : 'Select code...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search codes..." />
            <CommandEmpty>No codes found.</CommandEmpty>
            <CommandGroup>
              {codes.map(codeItem => (
                <CommandItem
                  key={codeItem.value}
                  value={codeItem.value}
                  onSelect={currentValue => {
                    // console.log(currentValue);
                    setValue('notes', [...values.slice(0, index), { ...values[index], code: currentValue }, ...values.slice(index + 1)]);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', code === codeItem.value ? 'opacity-100' : 'opacity-0')} />
                  {codeItem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <FormField
        control={control}
        name={`notes.${index}.note`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button variant="secondary" onClick={() => remove(index)}>
        <BsTrash />
      </Button>
    </Card>
  );
}

const codes = [
  {
    value: 'r',
    label: 'Respite',
  },
  {
    value: 'hv',
    label: 'Home visit',
  },
  {
    value: 'rm',
    label: 'Refused meds',
  },
  {
    value: 'h',
    label: 'Hospitalization',
  },
  {
    value: 's',
    label: 'School',
  },
  {
    value: 'd',
    label: 'Discontinued medication',
  },
  {
    value: 'a',
    label: 'Absent from program',
  },
  {
    value: 'other',
    label: 'Other',
  },
];
