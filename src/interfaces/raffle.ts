import { FormQuestion } from "src/interfaces/formQuestion";

export interface Raffle {
  id: string,
  title: string,
  form: FormQuestion[],
  description: string,
  author_id: string,
}
