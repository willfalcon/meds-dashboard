import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import prisma from '@/lib/prisma';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MedCard from '@/components/medication/MedCard';
import AddMedicationForm from '@/components/forms/AddMedicationForm';
import EditMedicationForm from '@/components/forms/EditMedicationForm';

function CloseButton({ onClick }) {
  return (
    <button
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      onClick={onClick}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Close</span>
    </button>
);
}

export default function Medications({ meds }) {

  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(0);

  useEffect(() => {
    if (router.query?.new == 'true') {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
    if (router.query?.edit == 'true') {
      setEditModal(parseInt(router.query.id as string));
    } else {
      setEditModal(0);
    }
  }, [router.query]);

  return (
    <>
      <div className="flex space-between items-center col-span-3">
        <h2 className="text-4xl font-bold mb-4">Medications</h2>
        <Dialog open={modalOpen}>
          <Button
            className="ml-auto"
            onClick={() => {
              // setModalOpen(true);
              router.push('/medications?new=true', '/medications/new', { shallow: true });
            }}
          >
            Add New
          </Button>
          <DialogContent>
            <CloseButton
              onClick={() => {
                // setModalOpen(false);
                router.push('/medications', undefined, {shallow: true});
              }}
            />
            <DialogHeader>
              <DialogTitle>Add Medication</DialogTitle>
            </DialogHeader>
            <AddMedicationForm />
          </DialogContent>
        </Dialog>
      </div>

      {meds.map(med => (
        <MedCard key={med.id} {...med} />
      ))}

      <Dialog open={!!editModal}>
        <DialogContent>
          <CloseButton onClick={() => {
            router.push('/medications', undefined, { shallow: true });
          }} />
          <DialogHeader>
            <DialogTitle>Edit Medication</DialogTitle>
          </DialogHeader>
          <EditMedicationForm defaults={meds.find(med => med.id === editModal)} />
        </DialogContent>
      </Dialog>
    </>
  );
}


export const getServerSideProps = async context => {
  const meds = await prisma.medication.findMany();
  return { props: { meds: JSON.parse(JSON.stringify(meds)) } };
};

