import { ProjectInterface } from 'sharedInterfaces';
import './Project.scss';

export interface ProjectProps {
  project: ProjectInterface;
}

const Project: React.FC<ProjectProps> = ({ project }: ProjectProps) => (
  <div className="Project__Project">
    <div>
      Name:
      {project.name}
    </div>
    <div>
      Description:
      {project.description}
    </div>
    <div>
      Technologies:
      {project.technologies}
    </div>
    <div>
      Deploy:
      {project.deploy}
    </div>
    <div>
      Notes:
      {project.notes}
    </div>
    <div>
      Closed:
      {project.closed}
    </div>
  </div>
);

export default Project;
