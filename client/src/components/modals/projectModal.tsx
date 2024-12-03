import { Modal, ModalType } from "./Modal";
import {
  ModalContent,
  StyledTitle,
  StyledInputWrapper,
  CloseButton,
  InfoButtonWrapper,
  SubmitButton,
  DeleteButton,
} from "./StyledComponents";
import { useRef } from "react";
import { deleteProject, postProject, updateProject } from "../../api/projects";

export const ProjectModal = ({
  projectid,
  modalType,
  onModalSubmit,
  handleClose,
}: {
  projectid?: string;
  modalType: ModalType;
  onModalSubmit: () => void;
  handleClose: () => void;
}) => {
  const handleSubmitClick = async (projectid?: string) => {
    const title = titleRef.current?.value ?? "";
    const description = descriptionRef.current?.value ?? "";
    if (modalType == ModalType.ADD) {
      postProject(title, description).then(() => {
        handleClose();
        onModalSubmit();
      });
    } else {
      updateProject({ title, description, projectid: projectid ?? ""}).then(() => {
        handleClose();
        onModalSubmit();
      });
    }
  };
  const handleDeleteClick = async (projectid: string) => {
    deleteProject(projectid).then(() => {
      handleClose();
      onModalSubmit();
    });
  };
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  return (
    <Modal>
      <ModalContent>
        <StyledTitle>
          {modalType == ModalType.ADD ? "Add Project" : "Edit project"}
        </StyledTitle>
        <StyledInputWrapper>
          <div>Project Title</div>
          <input
            type="text"
            placeholder="Enter your project title"
            ref={titleRef}
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <div>Project description</div>
          <input
            type="text"
            placeholder="Enter your project description"
            ref={descriptionRef}
          />
        </StyledInputWrapper>
        <InfoButtonWrapper>
          <SubmitButton shouldShow={true} onClick={() => handleSubmitClick(projectid)}>
            {modalType == ModalType.ADD ? "Add" : "Edit"}
          </SubmitButton>
          {modalType == ModalType.EDIT && (
            <DeleteButton
              onClick={() => handleDeleteClick(projectid as string)}
            >
              Delete
            </DeleteButton>
          )}
          <CloseButton onClick={handleClose}> Close</CloseButton>
        </InfoButtonWrapper>
      </ModalContent>
    </Modal>
  );
};
