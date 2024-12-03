import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 1, 0.3);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffff;
  border-radius: 8px;
  padding: 40px;
  max-width: 2875px;
  width: 65%;
  height: 520px;
`;
export const UpperSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
export const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 39.89px;
  color: #242424;
`;
export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  & > div {
    color: black;
    display: block;
    height: 33px;
    font-size: 20px;
    font-weight: 600;
    line-height: 33.24px;
    text-align: left;
  }
  & > input {
    background-color: white;
    color: black;
    width: 382px;
    height: 22px;
    padding: 14px;
    border-radius: 100px;
    border: 1px solid lightgray;
  }
`;

export const InfoButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
export const SubmitButton = styled.button<{ shouldShow: boolean }>`
  background-color: orange;
  display: ${(props) => (props.shouldShow ? "flex" : "none")};
  align-items: center;
`;
export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  svg:hover path {
    cursor: pointer;
  }
`;
export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  background-color: red;
  opacity: 0.6;
  svg:hover path {
    cursor: pointer;
  }
`
export const RadiosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const RadiosTitle = styled.div`
  align-self: center;
  color: black;
  display: block;
  height: 33px;
  font-size: 20px;
  font-weight: 600;
  line-height: 33.24px;
  text-align: left;
`;
export const StatusItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 16px;
  white-space: nowrap;
  width: 180px;
  color: ${(props) => (props.selected ? "#FAA980" : "black")};
  height: 27px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.selected ? "#FAA980" : "#808080")};
  &:hover {
    opacity: ${(props) => (!props.selected ? 0.4 : 1)};
    transition-delay: 0.3;
  }
`;
export const RadioButton = styled.label<{ selected: boolean }>`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => (props.selected ? "#FAA980" : "#808080")}; /* Outer circle color */
  border-radius: 60px;
  cursor: pointer;

  input {
    opacity: 0; /* Hide the default radio input */
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  /* Inner circle */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    background-color: ${(props) =>
      props.selected ? "#FAA980" : "none"}; /* Inner circle color */
    border-radius: 50px;
    transition: background-color 0.3s ease;
  }
`;
