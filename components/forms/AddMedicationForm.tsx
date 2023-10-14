import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { useRouter } from 'next/router';
import { medicationFormSchema } from './medicationFormSchema';

export default function AddMedicationForm() {
  const form = useForm({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: {
      name: '',
      dose: '',
      morning: false,
      night: false,
      asNeeded: false,
    },
  });

  const router = useRouter();

  async function onSubmit(values) {
    const response = await fetch('/api/add-medication', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    const res = await response.json();

    if (response.status === 200) {
      router.push('/medications');
    } else {
      form.setError(res.field, { type: 'custom', message: res.message });
    }
    console.log(res);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medication</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dose (mg)</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="morning"
          render={({ field }) => (
            <FormItem className="flex flx-row items-start space-x-3 space-y-0">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Morning</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="night"
          render={({ field }) => (
            <FormItem className="flex flx-row items-start space-x-3 space-y-0">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Night</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asNeeded"
          render={({ field }) => (
            <FormItem className="flex flx-row items-start space-x-3 space-y-0">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>As Needed</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
