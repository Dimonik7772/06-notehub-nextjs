import css from "./NoteForm.module.css";
import type { NoteFormValues } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api";

type NoteFormProps = {
   onClose: () => void;
};

const initialValues: NoteFormValues = {
   title: "",
   content: "",
   tag: "Todo",
};

const NoteFormValidationSchema = Yup.object().shape({
   title: Yup.string()
      .min(3, "Title is too short min 3 chars")
      .max(50)
      .required("This is a required field"),
   content: Yup.string().max(500),
   tag: Yup.string()
      .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
      .required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
   const queryClient = useQueryClient();
   const mutation = useMutation({
      mutationFn: createNote,
   });

   const handleSubmit = (
      values: NoteFormValues,
      actions: FormikHelpers<NoteFormValues>,
   ) => {
      mutation.mutate(values, {
         onSuccess: () => {
            actions.resetForm();
            onClose();
            queryClient.invalidateQueries({
               queryKey: ["Notes"],
            });
         },
      });
   };
   return (
      <Formik
         initialValues={initialValues}
         validationSchema={NoteFormValidationSchema}
         onSubmit={handleSubmit}
      >
         <Form className={css.form}>
            <div className={css.formGroup}>
               <label htmlFor="title">Title</label>
               <Field
                  id="title"
                  type="text"
                  name="title"
                  className={css.inpput}
               />
               <ErrorMessage
                  component={"span"}
                  name="title"
                  className={css.error}
               />
            </div>
            <div className={css.formGroup}>
               <label htmlFor="content">Content</label>
               <Field
                  as="textarea"
                  id="content"
                  name="content"
                  rows={8}
                  className={css.textarea}
               />
               <ErrorMessage
                  component={"span"}
                  name="content"
                  className={css.error}
               />
            </div>
            <div className={css.formGroup}>
               <label htmlFor="tag">Tag</label>
               <Field as="select" id="tag" name="tag" className={css.select}>
                  <option value="Todo">Todo</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Shopping">Shopping</option>
               </Field>
            </div>
            <div className={css.formGroup}>
               <button
                  type="button"
                  className={css.cancelButton}
                  onClick={onClose}
               >
                  Cancel
               </button>
               <button type="submit" className={css.submitButton}>
                  {mutation.isPending ? "Creating ..." : "Create Note"}
               </button>
            </div>
         </Form>
      </Formik>
   );
}
