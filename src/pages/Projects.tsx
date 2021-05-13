import { useEffect, useState } from 'react';
import { CreateProjectRequest, ProjectInterface } from 'sharedInterfaces';
import { ArrowLeft, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import Project from 'components/molecules/Project/Project';
import UpdateProjectModal from 'components/organisms/UpdateProjectModal/UpdateProjectModal';
import { getProjects } from '../firebaseUtils/firebase';
import './Projects.scss';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>();
  const [loading, setLoading] = useState<boolean>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectInterface | CreateProjectRequest>();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const fbaseSubscription = getProjects().onSnapshot((querySnapshot) => {
      const parsedProjects = querySnapshot.docs.map((project) => (
        { id: project.id, ...project.data() }
      )) as ProjectInterface[];
      setProjects(parsedProjects);
      setLoading(false);
    });
    return () => fbaseSubscription();
  }, []);

  const backHome = () => {
    history.replace('./');
  };

  const addProject = () => {
    const emptyProject = {
      name: '',
      description: '',
      technologies: '',
      deploy: '',
      notes: '',
      closed: false,
    };
    setSelectedProject(emptyProject);
    setUpdateModalVisible(true);
  };

  const updateSelectedProject = (project: ProjectInterface) => {
    setSelectedProject(project);
    setUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  return (
    <>
      <div className="Projects__Buttons">
        <Button primary onClick={backHome}>
          <ArrowLeft />
        </Button>
        <Button primary onClick={addProject}>
          <Plus />
        </Button>
      </div>
      <div className="Projects__Projects">
        {!loading && projects?.map((project) => (
          <Project
            project={project}
            updateSelectedProject={updateSelectedProject}
          />
        ))}
      </div>

      {selectedProject && (
        <UpdateProjectModal
          project={selectedProject}
          isVisible={updateModalVisible}
          closeModal={closeUpdateModal}
        />
      )}
    </>
  );
};

export default Projects;
