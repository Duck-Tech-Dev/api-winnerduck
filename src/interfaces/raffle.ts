import { FormQuestion } from "src/interfaces/formQuestion";

export interface Raffle {
  id: string,
  title: string,
  description: string,
  status: "draft" | "ready" | "running" | "finished" | "archived",
  form: FormQuestion[],
  author_id: string,
}
