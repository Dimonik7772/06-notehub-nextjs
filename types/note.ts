export type Note = {
   id: string;
   title: string;
   content: string;
   createdAt: string;
   updatedAt: string;
   tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
};
export type NoteFormValues = {
   title: string;
   content: string;
   tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
};
