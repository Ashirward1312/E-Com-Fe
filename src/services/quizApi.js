import API from "../api/axios";

// =====================
// PUBLIC QUIZ APIs (Flashcards)
// =====================

export const getPublicQuizList = async () => {
    try {
        const response = await API.get("qna/");
        return response.data;
    } catch (error) {
        console.warn("Backend QnA endpoint failed. Returning demo data.");
        // Return 6-7 high-quality demo flashcards
        return [
            {
                id: 1,
                category: "Polity",
                question: "What is the difference between a Fundamental Right and a Directive Principle of State Policy?",
                answer: "Fundamental Rights (Part III) are justiciable, meaning they are enforceable by courts if violated. Directive Principles of State Policy (DPSP, Part IV) are non-justiciable; they are guidelines for the government to frame laws and policies for a just society but cannot be legally enforced."
            },
            {
                id: 2,
                category: "History",
                question: "What was the significance of the Poona Pact of 1932?",
                answer: "The Poona Pact was an agreement between Mahatma Gandhi and B.R. Ambedkar. It abandoned the idea of separate electorates for the depressed classes (which Gandhi opposed by fasting) and instead provided a larger number of reserved seats for them within the general electorate."
            },
            {
                id: 3,
                category: "Economy",
                question: "What is 'Stagflation'?",
                answer: "Stagflation is an economic situation characterized by stagnant economic growth (stagnation), high unemployment, and high inflation. It poses a dilemma for economic policy, since actions designed to lower inflation may exacerbate unemployment."
            },
            {
                id: 4,
                category: "Geography",
                question: "Why does the western coast of India receive more rainfall than the eastern coast during the southwest monsoon?",
                answer: "The western coast is on the windward side of the Western Ghats. The moisture-laden southwest monsoon winds hit these high mountains and are forced to rise, causing heavy orographic rainfall. The eastern coast lies in the rain shadow region for these winds."
            },
            {
                id: 5,
                category: "Current Affairs",
                question: "What is the primary objective of the 'Aditya-L1' mission launched by ISRO?",
                answer: "Aditya-L1 is India's first space-based observatory dedicated to studying the Sun. Its primary objective is to observe the solar corona, understand the coronal heating mechanism, solar flares, and the dynamics of space weather from a halo orbit around the Lagrangian point 1 (L1)."
            },
            {
                id: 6,
                category: "Environment",
                question: "What are 'Keystone Species'?",
                answer: "A keystone species is a species that has a disproportionately large effect on its natural environment relative to its abundance. Removing them can drastically alter the ecosystem. Examples include tigers, elephants, and bees."
            },
            {
                id: 7,
                category: "Polity",
                question: "Which article of the Indian Constitution grants special status to the Election Commission of India?",
                answer: "Article 324 of the Indian Constitution provides for an independent Election Commission to superintend, direct, and control the preparation of electoral rolls and the conduct of all elections to Parliament and the State Legislatures."
            }
        ];
    }
};

// =====================
// ADMIN QUIZ APIs
// =====================

export const adminGetQuizList = async () => {
    const response = await API.get("qna/admin/");
    return response.data;
};

export const adminCreateQuiz = async (data) => {
    const response = await API.post("qna/admin/", data);
    return response.data;
};

export const adminUpdateQuiz = async (id, data) => {
    const response = await API.put(`qna/admin/${id}/`, data);
    return response.data;
};

export const adminDeleteQuiz = async (id) => {
    const response = await API.delete(`qna/admin/${id}/`);
    return response.data;
};
