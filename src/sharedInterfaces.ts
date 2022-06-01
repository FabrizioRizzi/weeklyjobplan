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

export interface CreateSircleLeaderIdeaRequest {
  title: string;
  description: string;
  priority: 0 | 1 | 2;
}

export interface SircleLeaderIdea extends CreateSircleLeaderIdeaRequest {
  id: string;
}
