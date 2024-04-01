import { FormQuestion } from "src/interfaces/formQuestion";

export interface Raffle {
  raffleid: string,
  rafflename: string,
  form: FormQuestion[],
  authorid: string,
}
