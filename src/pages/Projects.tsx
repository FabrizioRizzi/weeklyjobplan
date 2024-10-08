import React, { useEffect, useState } from 'react';
import { CreateProjectRequest, ProjectInterface } from '@/sharedInterfaces';
import { ArrowLeft, Plus } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Loading from '@components/atoms/Loading/Loading';
import Button from '@components/atoms/Button/Button';
import Project from '@components/molecules/Project/Project';
import UpdateProjectModal from '@components/organisms/UpdateProjectModal/UpdateProjectModal';
import { onSnapshot } from 'firebase/firestore';
import { getProjects } from '@firebaseUtils/firebase';
import './Projects.scss';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>();
  const [loading, setLoading] = useState<boolean>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectInterface | CreateProjectRequest>();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const getProjectsSubscription = onSnapshot(getProjects(), (querySnapshot) => {
      const parsedProjects = querySnapshot.docs.map((project) => (
        { id: project.id, ...project.data() }
      )) as ProjectInterface[];
      setProjects(parsedProjects.sort((a, b) => (a === b ? 1 : -1)));
      setLoading(false);
    });

    return () => getProjectsSubscription();
  }, []);

  const backHome = () => {
    navigate('/');
  };

  const addProject = () => {
    const emptyProject = {
      name: '',
      description: '',
      technologies: '',
      deploy: '',
      notes: '',
      closed: false,
      repository: '',
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
        {loading
          ? <Loading />
          : projects?.map((project) => (
            <Project
              key={project.id}
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

export default React.memo(Projects);
