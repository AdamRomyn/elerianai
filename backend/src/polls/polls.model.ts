export interface Poll {
    id: number;
    question: string;
    answers: Array<{
        answer: string;
        votes: number;
    }>;
}