import prisma from '@/lib/prisma';
export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body);
    if (!body.date) {
      res.status(400).json({ field: 'date', message: 'Must include date!' });
    }
    // check for existing log on this date
    const existing = await prisma.log.findFirst({
      where: {
        date: body.date,
      },
      include: {
        notes: true,
      },
    });
    // console.log('bodyNotes: ', body.notes);
    if (existing) {
      // update existing log
      // console.log('existing: ', existing);

      const notesToUpdate = existing.notes.filter(note => body.notes.some(bodyNote => bodyNote.med === note.medId));

      // console.log('notes to update: ', notesToUpdate);

      const updatedLogNotes = await Promise.all(
        notesToUpdate.map(async note => {
          const bodyNote = body.notes.find(bodyNote => bodyNote.med === note.medId);
          const updatedLogNote = await prisma.logNote.update({
            where: {
              id: note.id,
            },
            data: {
              note: bodyNote.note ? bodyNote.note : note.note,
              code: bodyNote.code ? bodyNote.code : note.code,
            },
          });
          return updatedLogNote;
        })
      );

      // console.log('existing notes updated');
      // console.log('updatedLogNotes: ', updatedLogNotes);

      const newNotes = body.notes.filter(bodyNote => !existing.notes.some(note => note.medId === bodyNote.med));

      const updatedLog = await prisma.log.update({
        where: {
          id: existing.id,
        },
        data: {
          notes: {
            create: newNotes.map(note => {
              return {
                medication: {
                  connect: { id: note.med },
                },
                code: note.code,
                note: note.note,
              };
            }),
          },
        },
      });

      // const updatedLog = await prisma.log.update({
      //   where: {
      //     id: existing.id
      //   },
      //   data: {
      //     notes: {
      //       connectOrCreate: {
      //       }
      //     }
      //   }
      // })
      res.status(200).json(updatedLog);
    } else {
      // create new log

      const newLog = await prisma.log
        .create({
          data: {
            date: body.date,
            notes: {
              create: body.notes.map(note => {
                return {
                  medication: {
                    connect: { id: note.med },
                  },
                  code: note.code,
                  note: note.note,
                };
              }),
            },
          },
        })
        .catch(e => console.error(e));
      // console.log(newLog);
      res.status(200).json({ newLog });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add log', error });
  }
}
