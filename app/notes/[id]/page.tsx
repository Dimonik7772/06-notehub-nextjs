import { getNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetailsClient';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async (props: Props) => {
  const { id } = await props.params;
  const note = await getNoteById(id);
  return <NoteDetailsClient note={note} />;
};

export default NoteDetails;
