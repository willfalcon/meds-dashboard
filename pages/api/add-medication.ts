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
    const newMedication = await prisma.medication.create({ data: body });
    res.status(200).json(newMedication);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add medication', error });
  }
}
