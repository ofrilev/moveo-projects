import { ModalOverlay } from "./StyledComponents"

export enum ModalType  {
    ADD=0,
    EDIT=1
  }
export const Modal = ({ children }: any) => {
    return (
        <ModalOverlay>{children}</ModalOverlay>
    )
}