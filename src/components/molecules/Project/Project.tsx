import { ProjectInterface } from 'sharedInterfaces';

export interface ProjectProps {
  project: ProjectInterface;
}

const Project: React.FC<ProjectProps> = ({ project }: ProjectProps) => (<div>{project.name}</div>);

export default Project;
