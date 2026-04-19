import css from "./SearchBox.module.css";

interface SearchBoxProps {
   value: string;
   onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
   return (
      <input
         type="text"
         className={css.input}
         name="topic"
         id="topic"
         defaultValue={value}
         onChange={(event) => onChange(event.target.value)}
      />
   );
}
