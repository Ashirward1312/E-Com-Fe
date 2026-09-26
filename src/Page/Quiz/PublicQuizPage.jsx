import { useEffect, useState } from "react";
import { getQuizzes } from "../../services/quizApi";

import {
    MessageSquare,
    ChevronDown,
    Search,
    Lightbulb,
    X,
    Layers,
    Zap,
} from "lucide-react";


// ── Single Q&A Card ──
const QuizCard = ({
    item,
    index,
    isOpen,
    onToggle,
}) => {

    return (
        <div
            className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "border-[#C8A45A]/40 shadow-[0_8px_30px_rgba(200,164,90,0.12)] bg-white"
                    : "border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#C8A45A]/20"
                }`}
        >

            {/* Question Row */}
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-4 px-5 sm:px-6 py-5 text-left focus:outline-none"
                aria-expanded={isOpen}
            >

                {/* Number */}
                <span
                    className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold transition-colors duration-300 ${isOpen
                            ? "bg-gradient-to-br from-[#C8A45A] to-[#B19047] text-white shadow"
                            : "bg-[#F3EFE6] text-[#C8A45A]"
                        }`}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>


                {/* Question */}
                <div className="flex-1 min-w-0 pt-1">

                    <p
                        className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${isOpen
                                ? "text-[#C8A45A]"
                                : "text-[#0B1B31] group-hover:text-[#C8A45A]"
                            }`}
                    >
                        {item.question}
                    </p>


                    {item.category && !isOpen && (
                        <span className="inline-block mt-1.5 text-xs bg-[#F3EFE6] text-[#C8A45A] px-2.5 py-0.5 rounded-full font-medium">
                            {item.category}
                        </span>
                    )}

                </div>


                {/* Chevron */}
                <span
                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen
                            ? "bg-[#C8A45A] text-white rotate-180"
                            : "bg-gray-100 text-gray-400 group-hover:bg-[#F3EFE6] group-hover:text-[#C8A45A]"
                        }`}
                >
                    <ChevronDown size={16} />
                </span>

            </button>


            {/* Answer */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
            >

                <div className="px-5 sm:px-6 pb-5 pt-0">

                    <div className="h-px bg-gradient-to-r from-[#C8A45A]/30 via-[#C8A45A] to-[#C8A45A]/30 mb-4 rounded-full" />


                    <div className="flex gap-3 bg-gradient-to-br from-[#FFFDF9] to-[#F9F5EC] border border-[#C8A45A]/15 rounded-2xl px-4 sm:px-5 py-4">

                        <div className="shrink-0 mt-0.5">

                            <div className="w-7 h-7 rounded-lg bg-[#C8A45A]/15 flex items-center justify-center">

                                <Lightbulb
                                    size={14}
                                    className="text-[#C8A45A]"
                                />

                            </div>

                        </div>


                        <div>

                            <p className="text-xs font-bold text-[#C8A45A] uppercase tracking-widest mb-2">
                                Answer
                            </p>

                            <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {item.answer}
                            </p>


                            {item.category && (
                                <span className="inline-block mt-3 text-xs bg-[#C8A45A]/10 text-[#C8A45A] px-2.5 py-0.5 rounded-full font-semibold">
                                    {item.category}
                                </span>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};


// ── Main Public Quiz Page ──
const PublicQuizPage = () => {

    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [openId, setOpenId] = useState(null);

    const [search, setSearch] = useState("");

    const [activeCategory, setActiveCategory] =
        useState("All");


    // Fetch quizzes
    useEffect(() => {

        const fetchQuizzes = async () => {

            try {

                const data = await getQuizzes();

                setItems(data);

            } catch (error) {

                console.log(error);

                setItems([]);

            } finally {

                setLoading(false);

            }
        };


        fetchQuizzes();

    }, []);


    // Unique categories
    const categories = [
        "All",
        ...Array.from(
            new Set(
                items
                    .map((item) => item.category)
                    .filter(Boolean)
            )
        ),
    ];


    // Search + Category filter
    const filtered = items.filter((item) => {

        const question =
            item.question?.toLowerCase() || "";

        const answer =
            item.answer?.toLowerCase() || "";

        const category =
            item.category?.toLowerCase() || "";


        const searchValue =
            search.toLowerCase();


        const matchSearch =
            !search.trim() ||
            question.includes(searchValue) ||
            answer.includes(searchValue) ||
            category.includes(searchValue);


        const matchCategory =
            activeCategory === "All" ||
            item.category === activeCategory;


        return (
            matchSearch &&
            matchCategory
        );
    });


    const handleToggle = (id) => {

        setOpenId((prev) =>
            prev === id
                ? null
                : id
        );

    };


    const clearSearch = () => {

        setSearch("");

        setActiveCategory("All");

    };


    return (

        <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-20">


            {/* Heading */}
            <div className="relative text-center mb-10">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C8A45A]/8 blur-[100px] rounded-full -z-10" />


                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#F3EFE6] text-[#C8A45A] font-semibold text-sm uppercase tracking-widest mb-6">

                    <Zap
                        size={14}
                        className="animate-pulse"
                    />

                    Practice Quiz

                </div>


                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1B31] tracking-tight leading-tight mb-4">

                    Test Your{" "}

                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A45A] to-[#B19047]">
                        Knowledge
                    </span>

                </h1>


                <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
                    Practice with our quiz flashcards. Click any question to reveal the detailed answer.
                </p>


                <div className="mt-6 flex justify-center items-center gap-2">

                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#C8A45A] rounded-full" />

                    <div className="w-2 h-2 bg-[#C8A45A] rounded-full transform rotate-45" />

                    <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#C8A45A] rounded-full" />

                </div>

            </div>


            <div className="max-w-3xl mx-auto">


                {/* Search + Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">


                    {/* Search */}
                    <div className="relative flex-1">

                        <Search
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search questions..."
                            className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0B1B31] bg-white focus:outline-none focus:border-[#C8A45A] focus:ring-2 focus:ring-[#C8A45A]/20 transition shadow-sm"
                        />


                        {search && (

                            <button
                                onClick={() =>
                                    setSearch("")
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                            >
                                <X size={14} />
                            </button>

                        )}

                    </div>


                    {/* Categories */}
                    {categories.length > 1 && (

                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 flex-nowrap sm:flex-wrap">

                            {categories.map((cat) => (

                                <button
                                    key={cat}
                                    onClick={() =>
                                        setActiveCategory(cat)
                                    }
                                    className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${activeCategory === cat
                                            ? "bg-[#0B1B31] text-white border-[#0B1B31] shadow-sm"
                                            : "bg-white text-gray-500 border-gray-200 hover:border-[#C8A45A]/40 hover:text-[#C8A45A]"
                                        }`}
                                >

                                    {cat === "All" && (
                                        <Layers
                                            size={11}
                                            className="inline mr-1 -mt-0.5"
                                        />
                                    )}

                                    {cat}

                                </button>

                            ))}

                        </div>

                    )}

                </div>


                {/* Result count */}
                {(search || activeCategory !== "All") && (

                    <div className="flex items-center justify-between mb-4">

                        <p className="text-xs text-gray-400">

                            Showing{" "}

                            <span className="font-semibold text-[#0B1B31]">
                                {filtered.length}
                            </span>{" "}

                            result
                            {filtered.length !== 1
                                ? "s"
                                : ""}

                        </p>


                        <button
                            onClick={clearSearch}
                            className="text-xs text-[#C8A45A] hover:underline font-medium"
                        >
                            Clear filters
                        </button>

                    </div>

                )}


                {/* Loading */}
                {loading && (

                    <div className="space-y-3">

                        {[1, 2, 3, 4].map((i) => (

                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse"
                            >

                                <div className="flex gap-4">

                                    <div className="w-9 h-9 rounded-xl bg-gray-200 shrink-0" />

                                    <div className="flex-1">

                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

                                        <div className="h-3 bg-gray-100 rounded w-1/3" />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Empty */}
                {!loading && items.length === 0 && (

                    <div className="text-center py-20 bg-gray-50 rounded-3xl shadow-sm border border-gray-100">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F3EFE6] flex items-center justify-center mb-4">

                            <MessageSquare
                                size={28}
                                className="text-[#C8A45A]"
                            />

                        </div>


                        <h2 className="text-xl font-semibold text-[#0B1B31] mb-2">
                            No Quizzes Yet
                        </h2>


                        <p className="text-gray-400 text-sm">
                            Check back soon — new questions are coming!
                        </p>

                    </div>

                )}


                {/* No results */}
                {!loading &&
                    items.length > 0 &&
                    filtered.length === 0 && (

                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">

                            <p className="text-gray-400 text-sm">
                                No results found.
                            </p>


                            <button
                                onClick={clearSearch}
                                className="mt-2 text-[#C8A45A] text-xs hover:underline font-medium"
                            >
                                Clear filters
                            </button>

                        </div>

                    )}


                {/* Quiz Cards */}
                {!loading &&
                    filtered.length > 0 && (

                        <div className="space-y-3">

                            {filtered.map(
                                (item, index) => (

                                    <QuizCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isOpen={
                                            openId ===
                                            item.id
                                        }
                                        onToggle={() =>
                                            handleToggle(
                                                item.id
                                            )
                                        }
                                    />

                                )
                            )}

                        </div>

                    )}

            </div>

        </div>
    );
};


export default PublicQuizPage;