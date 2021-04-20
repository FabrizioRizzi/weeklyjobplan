export interface CreateTaskRequest {
  name: string;
  description: string;
  dayIndex: number;
  done: boolean;
  week: number;
  year: number;
  length: number;
}

export interface TaskInterface extends CreateTaskRequest{
  id: string;
}

export interface TaskToPlan {
  id: string;
  name: string;
  description: string;
  priority: 0 | 1 | 2;
}
