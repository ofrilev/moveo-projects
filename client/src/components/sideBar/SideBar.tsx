import { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Using react-icons for the edit icon

import {
  AddProjectButton,
  EditableDiv,
  EditIcon,
  ItemsWrapper,
  SideBarWrapper,
} from "./StyledComponent";
import { ProjectModal } from "../modals/projectModal";
import { ModalType } from "../modals/Modal";

type Props = {
  onModalSubmit: () => void;
  projects?: { title: string; projectid: string }[];
  chosenProject?: number;
  changeChosenProject: (index: number) => void;
};
export const SideBar = ({
  onModalSubmit,
  chosenProject,
  projects,
  changeChosenProject,
}: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.ADD);
  const [chosenProjectid, setChosenProjectid] = useState("");
  const handleModalClose = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "unset";
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const handleIconClick = (e: React.MouseEvent, projectid: string) => {
    e.stopPropagation();
    setChosenProjectid(projectid);
    setModalType(ModalType.EDIT);
    handleModalOpen();
  };
  const handleAddClick = () => {
    setModalType(ModalType.ADD);
    handleModalOpen();
  };
  return (
    <SideBarWrapper>
      {modalIsOpen && (
        <ProjectModal
          projectid={chosenProjectid}
          modalType={modalType}
          onModalSubmit={onModalSubmit}
          handleClose={handleModalClose}
        />
      )}
      <ItemsWrapper>
        <h1>Projects</h1>
        <AddProjectButton onClick={() => handleAddClick()}>
          Add Project <span>+</span>
        </AddProjectButton>

        {projects?.map((project, index) => (
          <EditableDiv
            ischosen={index == chosenProject}
            key={project.title}
            onClick={() => changeChosenProject(index)}
          >
            {project.title}
            <EditIcon
              onClick={(e) => handleIconClick(e, project.projectid)}
              className="edit-icon"
            >
              <FaEdit />
            </EditIcon>
          </EditableDiv>
        ))}
      </ItemsWrapper>
    </SideBarWrapper>
  );
};
