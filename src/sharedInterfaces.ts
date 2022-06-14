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

export interface CreateTaskToPlanRequest {
  name: string;
  description: string;
  priority: 0 | 1 | 2;
}

export interface TaskToPlanInterface extends CreateTaskToPlanRequest {
  id: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  technologies: string;
  deploy: string;
  notes: string;
  closed: boolean;
  repository: string;
}

export interface ProjectInterface extends CreateProjectRequest {
  id: string;
}

export interface CreateIdeaRequest {
  title: string;
  description: string;
  priority: 0 | 1 | 2;
}

export interface Idea extends CreateIdeaRequest {
  id: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  priority: 0 | 1 | 2;
  onHold: boolean;
  done: boolean;
  lastUpdate: Date;
}

export interface Todo extends CreateTodoRequest {
  id: string;
}

export interface CreateStepRequest {
  description: string;
  done: boolean;
}

export interface Step extends CreateStepRequest {
  id: string;
}
