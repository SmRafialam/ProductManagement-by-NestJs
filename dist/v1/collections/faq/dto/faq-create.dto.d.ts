import { AnswerDto } from "./answer.dto";
export declare class FaqCreateDto {
    question: string;
    note: string;
    answers: AnswerDto[];
    category: string;
}
