import API from "../api/axios";


// Get all quizzes
export const getQuizzes = async () => {
    const response = await API.get("quizzes/");

    return response.data;
};


// Get single quiz
export const getQuiz = async (id) => {
    const response = await API.get(`quizzes/${id}/`);

    return response.data;
};


// Create quiz
export const createQuiz = async (data) => {
    const response = await API.post(
        "quizzes/",
        data
    );

    return response.data;
};


// Update quiz
export const updateQuiz = async (id, data) => {
    const response = await API.patch(
        `quizzes/${id}/`,
        data
    );

    return response.data;
};


// Delete quiz
export const deleteQuiz = async (id) => {
    const response = await API.delete(
        `quizzes/${id}/`
    );

    return response.data;
};