import { useEffect, useState } from "react";
import {
   getLibrary,
   downloadEbook,
} from "../../services/orderApi";

const Library = () => {

   const [books, setBooks] = useState([]);

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchLibrary();
   }, []);

   const fetchLibrary = async () => {
      try {
         const data = await getLibrary();
         setBooks(data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleDownload = async (id) => {

      try {

         const blob = await downloadEbook(id);

         const url = window.URL.createObjectURL(blob);

         const link = document.createElement("a");

         link.href = url;

         link.download = "ebook.pdf";

         document.body.appendChild(link);

         link.click();

         link.remove();

         window.URL.revokeObjectURL(url);

      } catch (error) {

         console.log(error);

         alert("Unable to download book.");

      }

   };

   if (loading) {
      return <div>Loading...</div>;
   }

   if (books.length === 0) {
      return <div>No purchased books found.</div>;
   }

   return (

      <div>

         <h2>My Library</h2>

         <br />

         {books.map((book) => (

            <div
               key={book.id}
               style={{
                  border: "1px solid #ccc",
                  marginBottom: 20,
                  padding: 15,
               }}
            >

               <img
                  src={book.image}
                  alt={book.product_name}
                  width={120}
               />

               <h3>{book.product_name}</h3>

               <p>
                  Author : {book.author}
               </p>

               <p>
                  Downloads : {book.download_count}
               </p>

               <button
                  onClick={() =>
                     handleDownload(book.id)
                  }
               >
                  Download PDF
               </button>

            </div>

         ))}

      </div>

   );

};

export default Library;