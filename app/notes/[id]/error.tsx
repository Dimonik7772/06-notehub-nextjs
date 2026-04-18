'use client';
interface ErrorMessageProps {
  message: string;
}

export default function Error({ message }: ErrorMessageProps) {
  return <p>Could not fetch the list of notes. {message}</p>;
}
