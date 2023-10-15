import { PiDotsThreeBold } from 'react-icons/pi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export default function MedCard({ id, name, dose, morning, night, asNeeded }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [deleteDialogOpen, setDeleteDialog] = useState(false);
  async function deleteMedication() {
    const res = await fetch('/api/delete-medication', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    // console.log(res);
    if (res.status === 200) {
      setDeleteDialog(false);
      refreshData();
    }
  }
  return (
    <>
      <Card className="flex space-between items-center mb-4">
        <CardHeader className="flex-1 py-3">
          <CardTitle>{name}</CardTitle>
          <CardDescription className="flex divide-x divide-slate-500">
            <span className="pr-1">{dose}mg</span>
            {morning && <span className=" px-1">Morning</span>}
            {night && <span className=" px-1">Night</span>}
            {asNeeded && <span className=" px-1">As Needed</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 py-3 pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full w-11 h-11">
                <PiDotsThreeBold />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  onClick={() => {
                    router.push(`/medications?id=${id}&edit=true`, `/medications/${id}/edit`, { shallow: true });
                  }}
                  className="w-full justify-start"
                >
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button variant="ghost" onClick={() => setDeleteDialog(true)} className="w-full justify-start">
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
      <AlertDialog open={deleteDialogOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this?</AlertDialogTitle>
            <AlertDialogDescription>It won&apos;t appear in the list, but it will still be in the history. I think.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMedication}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
