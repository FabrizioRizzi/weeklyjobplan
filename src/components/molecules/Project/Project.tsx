import { Award, Edit2 } from 'react-feather';
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
      <div onClick={updateProjectModal} className="Project__Name">
        {project.name}
      </div>
      <div className="Project__Fields">
        <span>Description:</span>
        <span>{project.description}</span>
        <span>Technologies:</span>
        <span>{project.technologies}</span>
        <span>Deploy:</span>
        <span>{project.deploy}</span>
        <span>Notes:</span>
        <span>{project.notes}</span>
        <span>Status:</span>
        {project.closed ? <Award /> : <Edit2 />}
      </div>
    </div>
  );
};

export default Project;
