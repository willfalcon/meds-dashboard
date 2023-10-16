import Calendar from '@/components/calendar';
import prisma from '@/lib/prisma';
import { endOfMonth, startOfMonth } from 'date-fns';

export default function CalendarIndex({ date, logs, meds }) {
    const parsedDate = new Date(date);

  return <Calendar date={parsedDate} logs={logs} meds={meds} />;
}

export const getServerSideProps = async ({ params }) => {
  
  const date = new Date();
  const meds = await prisma.medication.findMany();
  const logs = await prisma.log.findMany({
    where: {
      AND: [
        {
          date: {
            gte: startOfMonth(date),
          },
        },
        {
          date: {
            lte: endOfMonth(date),
          },
        },
      ],
    },
    include: {
      notes: true,
    },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        date,
        logs,
        meds,
      })
    ),
  };
};
