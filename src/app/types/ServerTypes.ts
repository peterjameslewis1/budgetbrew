import { SubmitData } from "./ClientTypes";

export type Response = {
  data: SubmitData[] | [];
  message?: string;
  status?: number;
}