'use client';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NoteList } from '@/components/NoteList/NoteList';
import css from './NoteClient.module.css';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/app/loading';
import Error from '@/app/notes/[id]/error';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputTopic, setInputTopic] = useState('');

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['Notes', currentPage, inputTopic],
    queryFn: () => fetchNotes(currentPage, inputTopic),
    placeholderData: keepPreviousData,
  });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const changeValue = useDebouncedCallback((value: string) => {
    setInputTopic(value);
    setCurrentPage(1);
  }, 300);

  const totalPage: number = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={inputTopic} onChange={changeValue} />
        {data && data.notes.length < 1 && (
          <p className={css.text}>Nothing was found on your request</p>
        )}
        {isError && <Error error={error} />}
        {isLoading ? (
          <Loader />
        ) : (
          data &&
          data.totalPages > 1 && (
            <Pagination
              pageCount={totalPage}
              forcePage={currentPage}
              onPageChange={setCurrentPage}
            />
          )
        )}
        <button type="button" onClick={openModal} className={css.button}>
          Create
        </button>
      </div>
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
