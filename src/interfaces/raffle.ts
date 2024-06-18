import { FormQuestion } from "src/interfaces/formQuestion";

export interface Raffle {
  id: string,
  title: string,
  form: FormQuestion[],
  author_id: string,
}
