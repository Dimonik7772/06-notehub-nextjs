'use client';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import Error from './error';
import Loader from '@/app/loading';

type NoteDetailsClientProps = {
  id: string;
};
export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });
  if (!note) return null;
  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {isError && <Error error={error} />}
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
