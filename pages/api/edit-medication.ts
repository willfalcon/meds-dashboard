import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body);
    if (!body.name) {
      res.status(400).json({ field: 'name', message: 'Must include name!' });
    }
    if (!body.dose) {
      res.status(400).json({ field: 'dose', message: 'Must include dose!' });
    }
    const updatedMedication = await prisma.medication.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(500).json({ message: 'Failed to edit medication', error });
  }
}
