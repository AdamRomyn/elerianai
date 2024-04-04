export interface Poll {
    id: number;
    question: string;
    answers: Array<{
        value: string;
        votes: number;
    }>;
}