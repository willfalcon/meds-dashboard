import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body);
    // console.log(parseInt(body.id));
    if (!body.id) {
      res.status(400).json({ field: 'name', message: 'Must include id of medication to delete!' });
    }
    await prisma.medication.delete({
      where: {
        id: body.id,
      },
    });
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete medication', error });
  }
}
