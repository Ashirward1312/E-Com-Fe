import { useEffect, useState } from "react";
import { Download } from "lucide-react";
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
      return (
         <div className="flex justify-center items-center py-20 text-lg font-semibold text-gray-500">
            Loading...
         </div>
      );
   }

   if (books.length === 0) {
      return (
         <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-200 rounded-2xl">
               <h2 className="text-xl sm:text-2xl font-bold text-[#0B1C33]">
                  No Purchased Books
               </h2>
               <p className="text-gray-500 mt-3 text-sm sm:text-base">
                  Your digital library is currently empty.
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="p-4 sm:p-6 lg:p-8">

         {/* Header */}
         <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
               My Digital Library
            </h1>
            <div className="mt-2 h-1 w-16 bg-[#C8A45A] rounded-full"></div>
            <p className="mt-3 text-gray-500 text-sm sm:text-base">
               Access and download your purchased e-books anytime.
            </p>
         </div>

         {/* Book Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">

            {books.map((book) => (

               <div
                  key={book.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition duration-300 flex flex-col"
               >

                  <div className="flex justify-center mb-4">
                     <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 w-28 h-40 sm:w-32 sm:h-44 flex items-center justify-center">
                        <img
                           src={book.image}
                           alt={book.product_name}
                           className="max-h-full max-w-full object-contain"
                        />
                     </div>
                  </div>

                  <div className="text-center flex-1 flex flex-col">

                     <h3 className="text-base sm:text-lg font-bold text-[#0B1C33] leading-snug">
                        {book.product_name}
                     </h3>

                     <p className="text-gray-500 text-sm mt-1.5">
                        {book.author}
                     </p>

                     <p className="text-xs text-gray-400 mt-1">
                        Downloads: {book.download_count}
                     </p>

                     <button
                        onClick={() => handleDownload(book.id)}
                        className="mt-5 w-full flex items-center justify-center gap-2 bg-[#0B1C33] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162e4f] transition"
                     >
                        <Download size={16} />
                        <span>Download E-Book</span>
                     </button>

                  </div>

               </div>

            ))}

         </div>

      </div>
   );

};

export default Library;