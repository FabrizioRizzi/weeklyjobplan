import { ProjectInterface } from 'sharedInterfaces';
import './Project.scss';

export interface ProjectProps {
  project: ProjectInterface;
  updateSelectedProject: (project: ProjectInterface) => void;
}

const Project: React.FC<ProjectProps> = ({ project, updateSelectedProject }: ProjectProps) => {
  const updateProjectModal = () => {
    updateSelectedProject(project);
  };

  return (
    <div className="Project__Project">
      <div onClick={updateProjectModal}>
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
};

export default Project;
