export interface TaskInterface {
  id?: string;
  name: string;
  description?: string;
  dayIndex: number;
  done: boolean;
  week: number;
  year: number;
  length?: number;
}