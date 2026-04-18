import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.Client';
const Notes = async () => {
  const queryClient = new QueryClient();
  const page = 1;
  const search = '';
  await queryClient.prefetchQuery({
    queryKey: ['Notes', page, search],
    queryFn: () => fetchNotes(page, search),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
