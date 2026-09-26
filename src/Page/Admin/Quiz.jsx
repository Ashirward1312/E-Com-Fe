// import { useEffect, useState } from "react";
// import {
//     PlusCircle,
//     Edit2,
//     Trash2,
//     HelpCircle,
//     X,
//     Save,
//     Loader2,
//     AlertCircle,
//     ChevronDown,
//     Search,
// } from "lucide-react";
// import {
//     adminGetQuizList,
//     adminCreateQuiz,
//     adminUpdateQuiz,
//     adminDeleteQuiz,
// } from "../../services/quizApi";

// const EMPTY_FORM = { question: "", answer: "", category: "" };

// const AdminQuiz = () => {
//     const [items, setItems] = useState([]);
//     const [filtered, setFiltered] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [search, setSearch] = useState("");

//     const [showModal, setShowModal] = useState(false);
//     const [editItem, setEditItem] = useState(null);
//     const [form, setForm] = useState(EMPTY_FORM);
//     const [saving, setSaving] = useState(false);
//     const [deleteId, setDeleteId] = useState(null);

//     // Preview expanded in list
//     const [expanded, setExpanded] = useState(null);

//     useEffect(() => { fetchItems(); }, []);

//     useEffect(() => {
//         if (!search.trim()) {
//             setFiltered(items);
//         } else {
//             const q = search.toLowerCase();
//             setFiltered(items.filter(
//                 (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
//             ));
//         }
//     }, [search, items]);

//     const fetchItems = async () => {
//         try {
//             setLoading(true);
//             const data = await adminGetQuizList();
//             setItems(data);
//         } catch {
//             setError("Failed to load Quizzes.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const openCreate = () => {
//         setEditItem(null);
//         setForm(EMPTY_FORM);
//         setShowModal(true);
//     };

//     const openEdit = (item) => {
//         setEditItem(item);
//         setForm({
//             question: item.question,
//             answer: item.answer,
//             category: item.category || "",
//         });
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setEditItem(null);
//         setForm(EMPTY_FORM);
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             if (editItem) {
//                 await adminUpdateQuiz(editItem.id, form);
//             } else {
//                 await adminCreateQuiz(form);
//             }
//             await fetchItems();
//             closeModal();
//         } catch {
//             setError("Failed to save.");
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await adminDeleteQuiz(id);
//             setItems((prev) => prev.filter((i) => i.id !== id));
//         } catch {
//             setError("Failed to delete.");
//         } finally {
//             setDeleteId(null);
//         }
//     };

//     return (
//         <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen">

//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
//                         Quiz Management
//                     </h1>
//                     <p className="text-gray-500 mt-1 text-sm">
//                         Add question &amp; answer pairs — students click to reveal answers
//                     </p>
//                 </div>
//                 <button
//                     onClick={openCreate}
//                     className="flex items-center gap-2 bg-[#0B1B31] hover:bg-[#132743] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
//                 >
//                     <PlusCircle size={18} />
//                     Add Quiz
//                 </button>
//             </div>

//             {error && (
//                 <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
//                     <AlertCircle size={16} />
//                     {error}
//                 </div>
//             )}

//             {/* Search */}
//             {items.length > 0 && (
//                 <div className="relative max-w-sm">
//                     <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
//                     <input
//                         type="text"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         placeholder="Search quizzes..."
//                         className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition bg-white"
//                     />
//                 </div>
//             )}

//             {/* Stats Row */}
//             {items.length > 0 && (
//                 <div className="flex items-center gap-3 text-sm text-gray-400">
//                     <span className="bg-[#F3EFE6] text-[#C8A45A] font-bold px-3 py-1 rounded-full text-xs">
//                         {items.length} Total Quizzes
//                     </span>
//                     {search && (
//                         <span className="text-gray-400 text-xs">
//                             Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
//                         </span>
//                     )}
//                 </div>
//             )}

//             {/* Quiz List */}
//             {loading ? (
//                 <div className="space-y-4">
//                     {[1, 2, 3].map((i) => (
//                         <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
//                             <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
//                             <div className="h-3 bg-gray-100 rounded w-1/2" />
//                         </div>
//                     ))}
//                 </div>
//             ) : items.length === 0 ? (
//                 <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
//                     <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F3EFE6] flex items-center justify-center mb-4">
//                         <HelpCircle size={28} className="text-[#C8A45A]" />
//                     </div>
//                     <h2 className="text-lg font-semibold text-[#0B1B31] mb-1">No Quizzes Yet</h2>
//                     <p className="text-gray-400 text-sm mb-6">Add your first quiz.</p>
//                     <button
//                         onClick={openCreate}
//                         className="inline-flex items-center gap-2 bg-[#C8A45A] hover:bg-[#B19047] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
//                     >
//                         <PlusCircle size={18} />
//                         Add Quiz
//                     </button>
//                 </div>
//             ) : filtered.length === 0 ? (
//                 <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
//                     <p className="text-gray-400 text-sm">No results for &quot;{search}&quot;</p>
//                 </div>
//             ) : (
//                 <div className="space-y-3">
//                     {filtered.map((item, idx) => (
//                         <div
//                             key={item.id}
//                             className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C8A45A]/20 transition-all duration-200 overflow-hidden group"
//                         >
//                             {/* Question Row */}
//                             <div className="flex items-start gap-4 p-5">
//                                 {/* Number */}
//                                 <span className="shrink-0 w-7 h-7 rounded-lg bg-[#F3EFE6] text-[#C8A45A] flex items-center justify-center text-xs font-bold mt-0.5">
//                                     {idx + 1}
//                                 </span>

//                                 {/* Question */}
//                                 <div className="flex-1 min-w-0">
//                                     <p className="text-sm font-semibold text-[#0B1B31] leading-snug">
//                                         {item.question}
//                                     </p>
//                                     {item.category && (
//                                         <span className="inline-block mt-1.5 text-xs bg-[#F3EFE6] text-[#C8A45A] px-2 py-0.5 rounded-full font-medium">
//                                             {item.category}
//                                         </span>
//                                     )}
//                                 </div>

//                                 {/* Actions */}
//                                 <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <button
//                                         onClick={() => setExpanded(expanded === item.id ? null : item.id)}
//                                         className="p-2 rounded-xl text-gray-300 hover:text-[#C8A45A] hover:bg-[#F3EFE6] transition"
//                                         title="Preview answer"
//                                     >
//                                         <ChevronDown
//                                             size={15}
//                                             className={`transition-transform duration-200 ${expanded === item.id ? "rotate-180" : ""}`}
//                                         />
//                                     </button>
//                                     <button
//                                         onClick={() => openEdit(item)}
//                                         className="p-2 rounded-xl text-gray-300 hover:text-[#C8A45A] hover:bg-[#F3EFE6] transition"
//                                         title="Edit"
//                                     >
//                                         <Edit2 size={15} />
//                                     </button>
//                                     <button
//                                         onClick={() => setDeleteId(item.id)}
//                                         className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition"
//                                         title="Delete"
//                                     >
//                                         <Trash2 size={15} />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Answer Preview (collapsible) */}
//                             {expanded === item.id && (
//                                 <div className="px-5 pb-5 border-t border-gray-50">
//                                     <div className="mt-4 bg-[#F9F7F3] border border-[#C8A45A]/15 rounded-xl px-4 py-3">
//                                         <p className="text-xs font-bold text-[#C8A45A] uppercase tracking-wider mb-1.5">
//                                             Answer
//                                         </p>
//                                         <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
//                                             {item.answer}
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* ── Add / Edit Modal ── */}
//             {showModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
//                     <div
//                         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//                         onClick={closeModal}
//                     />
//                     <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg my-4 animate-fade-in-up">

//                         {/* Header */}
//                         <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
//                             <div>
//                                 <h2 className="text-lg font-bold text-[#0B1B31]">
//                                     {editItem ? "Edit Quiz" : "Add New Quiz"}
//                                 </h2>
//                                 <p className="text-xs text-gray-400 mt-0.5">
//                                     Write the question and its answer
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={closeModal}
//                                 className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>

//                         {/* Form */}
//                         <form onSubmit={handleSave} className="px-6 pt-5 pb-6 space-y-4">

//                             {/* Category (optional) */}
//                             <div>
//                                 <label className="block text-xs font-semibold text-[#0B1B31] mb-1.5">
//                                     Category <span className="text-gray-400 font-normal">(optional)</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={form.category}
//                                     onChange={(e) => setForm({ ...form, category: e.target.value })}
//                                     placeholder="e.g. History, Polity, Geography..."
//                                     className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition"
//                                 />
//                             </div>

//                             {/* Question */}
//                             <div>
//                                 <label className="block text-xs font-semibold text-[#0B1B31] mb-1.5">
//                                     Question <span className="text-red-400">*</span>
//                                 </label>
//                                 <textarea
//                                     rows={3}
//                                     required
//                                     value={form.question}
//                                     onChange={(e) => setForm({ ...form, question: e.target.value })}
//                                     placeholder="Type your question here..."
//                                     className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition resize-none"
//                                 />
//                             </div>

//                             {/* Answer */}
//                             <div>
//                                 <label className="block text-xs font-semibold text-[#0B1B31] mb-1.5">
//                                     Answer <span className="text-red-400">*</span>
//                                 </label>
//                                 <textarea
//                                     rows={5}
//                                     required
//                                     value={form.answer}
//                                     onChange={(e) => setForm({ ...form, answer: e.target.value })}
//                                     placeholder="Write the detailed answer here..."
//                                     className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition resize-none"
//                                 />
//                             </div>

//                             <div className="flex gap-3 pt-2">
//                                 <button
//                                     type="button"
//                                     onClick={closeModal}
//                                     className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={saving}
//                                     className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C8A45A] hover:bg-[#B19047] text-white text-sm font-semibold transition disabled:opacity-60"
//                                 >
//                                     {saving ? (
//                                         <Loader2 size={16} className="animate-spin" />
//                                     ) : (
//                                         <Save size={16} />
//                                     )}
//                                     {editItem ? "Update" : "Save Quiz"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* ── Delete Confirm ── */}
//             {deleteId && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//                     <div
//                         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//                         onClick={() => setDeleteId(null)}
//                     />
//                     <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-in-up">
//                         <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                             <Trash2 size={24} className="text-red-500" />
//                         </div>
//                         <h3 className="text-lg font-bold text-[#0B1B31] mb-2">Delete Quiz?</h3>
//                         <p className="text-gray-400 text-sm mb-6">
//                             This question and answer will be permanently removed.
//                         </p>
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={() => setDeleteId(null)}
//                                 className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(deleteId)}
//                                 className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
//                             >
//                                 Yes, Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminQuiz;

import { useEffect, useState } from "react";

import {
    PlusCircle,
    Edit2,
    Trash2,
    HelpCircle,
    X,
    Save,
    Loader2,
    AlertCircle,
    ChevronDown,
    Search,
} from "lucide-react";

import {
    getQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz,
} from "../../services/quizApi";


const EMPTY_FORM = {
    question: "",
    answer: "",
    category: "",
};


const AdminQuiz = () => {

    const [items, setItems] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const [form, setForm] = useState(
        EMPTY_FORM
    );

    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [expanded, setExpanded] = useState(null);


    useEffect(() => {
        fetchItems();
    }, []);


    useEffect(() => {

        if (!search.trim()) {

            setFiltered(items);

        } else {

            const q = search.toLowerCase();

            setFiltered(
                items.filter(
                    (item) =>
                        item.question
                            .toLowerCase()
                            .includes(q) ||

                        item.answer
                            .toLowerCase()
                            .includes(q) ||

                        (item.category || "")
                            .toLowerCase()
                            .includes(q)
                )
            );
        }

    }, [search, items]);


    const fetchItems = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getQuizzes();

            setItems(data);

        } catch (error) {

            console.log(error);

            setError(
                "Failed to load Quizzes."
            );

        } finally {

            setLoading(false);

        }
    };


    const openCreate = () => {

        setEditItem(null);

        setForm({
            ...EMPTY_FORM,
        });

        setShowModal(true);
    };


    const openEdit = (item) => {

        setEditItem(item);

        setForm({
            question: item.question,
            answer: item.answer,
            category: item.category || "",
        });

        setShowModal(true);
    };


    const closeModal = () => {

        setShowModal(false);

        setEditItem(null);

        setForm({
            ...EMPTY_FORM,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            if (editItem) {
                await updateQuiz(
                    editItem.id,
                    form
                );
            } else {
                await createQuiz(form);
            }

            await fetchItems();

            closeModal();

        } catch (error) {

            console.log(error);

            setError(
                "Failed to save quiz."
            );

        } finally {

            setSaving(false);

        }
    };


    const handleDelete = async (id) => {

        try {

            setError("");

            await deleteQuiz(id);

            setItems((prev) =>
                prev.filter(
                    (item) => item.id !== id
                )
            );

        } catch (error) {

            console.log(error);

            setError(
                "Failed to delete quiz."
            );

        } finally {

            setDeleteId(null);

        }
    };


    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1C33]">
                        Quiz Management
                    </h1>

                    <p className="text-gray-500 mt-1 text-sm">
                        Add question &amp; answer pairs — students click to reveal answers
                    </p>

                </div>

                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-[#0B1B31] hover:bg-[#132743] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <PlusCircle size={18} />
                    Add Quiz
                </button>

            </div>


            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">

                    <AlertCircle size={16} />

                    {error}

                </div>
            )}


            {/* Search */}
            {items.length > 0 && (
                <div className="relative max-w-sm">

                    <Search
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search quizzes..."
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition bg-white"
                    />

                </div>
            )}


            {/* Stats */}
            {items.length > 0 && (
                <div className="flex items-center gap-3 text-sm text-gray-400">

                    <span className="bg-[#F3EFE6] text-[#C8A45A] font-bold px-3 py-1 rounded-full text-xs">
                        {items.length} Total Quizzes
                    </span>

                    {search && (
                        <span className="text-gray-400 text-xs">
                            Showing {filtered.length} result
                            {filtered.length !== 1 ? "s" : ""}
                        </span>
                    )}

                </div>
            )}


            {/* Quiz List */}
            {loading ? (

                <div className="space-y-4">

                    {[1, 2, 3].map((i) => (

                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse"
                        >
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-100 rounded w-1/2" />
                        </div>

                    ))}

                </div>

            ) : items.length === 0 ? (

                /* Empty State */
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">

                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F3EFE6] flex items-center justify-center mb-4">

                        <HelpCircle
                            size={28}
                            className="text-[#C8A45A]"
                        />

                    </div>

                    <h2 className="text-lg font-semibold text-[#0B1B31] mb-1">
                        No Quizzes Yet
                    </h2>

                    <p className="text-gray-400 text-sm mb-6">
                        Add your first quiz.
                    </p>

                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 bg-[#C8A45A] hover:bg-[#B19047] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    >
                        <PlusCircle size={18} />
                        Add Quiz
                    </button>

                </div>

            ) : filtered.length === 0 ? (

                /* No Search Results */
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">

                    <p className="text-gray-400 text-sm">
                        No results for &quot;{search}&quot;
                    </p>

                </div>

            ) : (

                /* Quiz List */
                <div className="space-y-3">

                    {filtered.map((item, idx) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C8A45A]/20 transition-all duration-200 overflow-hidden group"
                        >

                            {/* Question Row */}
                            <div className="flex items-start gap-4 p-5">

                                {/* Number */}
                                <span className="shrink-0 w-7 h-7 rounded-lg bg-[#F3EFE6] text-[#C8A45A] flex items-center justify-center text-xs font-bold mt-0.5">
                                    {idx + 1}
                                </span>


                                {/* Question */}
                                <div className="flex-1 min-w-0">

                                    <p className="text-sm font-semibold text-[#0B1B31] leading-snug">
                                        {item.question}
                                    </p>

                                    {item.category && (
                                        <span className="inline-block mt-1.5 text-xs bg-[#F3EFE6] text-[#C8A45A] px-2 py-0.5 rounded-full font-medium">
                                            {item.category}
                                        </span>
                                    )}

                                </div>


                                {/* Actions */}
                                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">

                                    {/* Preview */}
                                    <button
                                        onClick={() =>
                                            setExpanded(
                                                expanded === item.id
                                                    ? null
                                                    : item.id
                                            )
                                        }
                                        className="p-2 rounded-xl text-gray-300 hover:text-[#C8A45A] hover:bg-[#F3EFE6] transition"
                                        title="Preview answer"
                                    >
                                        <ChevronDown
                                            size={15}
                                            className={`transition-transform duration-200 ${expanded === item.id
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                        />
                                    </button>


                                    {/* Edit */}
                                    <button
                                        onClick={() =>
                                            openEdit(item)
                                        }
                                        className="p-2 rounded-xl text-gray-300 hover:text-[#C8A45A] hover:bg-[#F3EFE6] transition"
                                        title="Edit"
                                    >
                                        <Edit2 size={15} />
                                    </button>


                                    {/* Delete */}
                                    <button
                                        onClick={() =>
                                            setDeleteId(item.id)
                                        }
                                        className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>

                                </div>

                            </div>


                            {/* Answer Preview */}
                            {expanded === item.id && (

                                <div className="px-5 pb-5 border-t border-gray-50">

                                    <div className="mt-4 bg-[#F9F7F3] border border-[#C8A45A]/15 rounded-xl px-4 py-3">

                                        <p className="text-xs font-bold text-[#C8A45A] uppercase tracking-wider mb-1.5">
                                            Answer
                                        </p>

                                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                            {item.answer}
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}


            {/* Add / Edit Modal */}
            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeModal}
                    />


                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg my-4 animate-fade-in-up">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">

                            <div>

                                <h2 className="text-lg font-bold text-[#0B1B31]">
                                    {editItem
                                        ? "Edit Quiz"
                                        : "Add New Quiz"}
                                </h2>

                                <p className="text-xs text-gray-400 mt-0.5">
                                    Write the question and its answer
                                </p>

                            </div>

                            <button
                                onClick={closeModal}
                                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition"
                            >
                                <X size={20} />
                            </button>

                        </div>


                        {/* Form */}
                        <form
                            onSubmit={handleSave}
                            className="px-6 pt-5 pb-6 space-y-4"
                        >

                            {/* Category */}
                            <div>

                                <label className="block text-xs font-semibold text-[#0B1B31] mb-1.5">
                                    Category{" "}
                                    <span className="text-gray-400 font-normal">
                                        (optional)
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={form.category}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            category: e.target.value,
                                        })
                                    }
                                    placeholder="e.g. History, Polity, Geography..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition"
                                />

                            </div>


                            {/* Question */}
                            <div>

                                <label className="block text-xs font-semibold text-[#0B1B31] mb-1.5">
                                    Question{" "}
                                    <span className="text-red-400">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    rows={3}
                                    required
                                    value={form.question}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            question: e.target.value,
                                        })
                                    }
                                    placeholder="Type your question here..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition resize-none"
                                />

                            </div>


                            {/* Answer */}
                            <div>

                                <label className="block text-xs font-semibold text-[#0B1B31] mb-1.5">
                                    Answer{" "}
                                    <span className="text-red-400">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    rows={5}
                                    required
                                    value={form.answer}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            answer: e.target.value,
                                        })
                                    }
                                    placeholder="Write the detailed answer here..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0B1B31] focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition resize-none"
                                />

                            </div>


                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C8A45A] hover:bg-[#B19047] text-white text-sm font-semibold transition disabled:opacity-60"
                                >

                                    {saving ? (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Save size={16} />
                                    )}

                                    {editItem
                                        ? "Update"
                                        : "Save Quiz"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* Delete Confirmation */}
            {deleteId && (

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() =>
                            setDeleteId(null)
                        }
                    />


                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-in-up">

                        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">

                            <Trash2
                                size={24}
                                className="text-red-500"
                            />

                        </div>


                        <h3 className="text-lg font-bold text-[#0B1B31] mb-2">
                            Delete Quiz?
                        </h3>


                        <p className="text-gray-400 text-sm mb-6">
                            This question and answer will be permanently removed.
                        </p>


                        <div className="flex gap-3">

                            <button
                                onClick={() =>
                                    setDeleteId(null)
                                }
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>


                            <button
                                onClick={() =>
                                    handleDelete(deleteId)
                                }
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                            >
                                Yes, Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdminQuiz;



