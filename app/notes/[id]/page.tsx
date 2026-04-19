import { getNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async (props: Props) => {
  const queryClient = new QueryClient();
  const { id } = await props.params;
  await queryClient.prefetchQuery({
    queryKey: ['Notes', id],
    queryFn: () => getNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
