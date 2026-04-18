import Link from "next/link";
import css from "./Footer.module.css";
export default function Footer() {
   return (
      <footer className={css.footer}>
         <div className={css.container}>
            <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
            <div className={css.wrap}>
               <p>Developer: Dima </p>
               <p>Contact us:</p>
               <Link href="mailto:student@notehub.app">
                  student@notehub.app
               </Link>
            </div>
         </div>
      </footer>
   );
}
