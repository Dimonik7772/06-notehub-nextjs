'use client';
interface ErrorMessageProps {
  error: Error;
}

export default function Error({ error }: ErrorMessageProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
