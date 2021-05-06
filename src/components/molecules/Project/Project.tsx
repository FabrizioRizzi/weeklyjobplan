import { ProjectInterface } from 'sharedInterfaces';

interface ProjectProps {
  project: ProjectInterface;
}

const Project: React.FC<ProjectProps> = ({ project }: ProjectProps) => (
  <>
    <div>{project.name}</div>
    <div>{project.description}</div>
  </>
);

export default Project;
