import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import prisma from '@/lib/prisma';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MedCard from '@/components/medication/MedCard';
import AddMedicationForm from '@/components/forms/AddMedicationForm';
import EditMedicationForm from '@/components/forms/EditMedicationForm';


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
          <DialogContent
            onClose={() => {
              // setModalOpen(false);
              router.push('/medications', undefined, { shallow: true });
            }}
          >
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
        <DialogContent
          onClose={() => {
            router.push('/medications', undefined, { shallow: true });
          }}
        >
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
