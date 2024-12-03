import styled from "styled-components";

export const SideBarWrapper = styled.div`
  height: 1024px;
  top: 3386px;
  gap: 44px;
  min-width: 344px;
  width: 23%;
  border-radius: 0px 25px 25px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
export const ItemsWrapper = styled.div`
  flex-direction: column;
  justify-items: center;
  height: 259px;
  top: 217px;
  left: 61px;
  gap: 50px;
  opacity: 0px;
  display: flex;
`;

export const EditableDiv = styled.div<{ ischosen?: boolean }>`
  position: relative;
  display: inline-block;
  padding: 10px;
  background-color: grey; /* Light background */
  box-shadow: ${(props) =>
    props.ischosen ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "unset"};
  border: ${(props) => (props.ischosen ? "2px solid white" : "unset")};
  border-radius: 8px;
  transition: background-color 0.3s ease;
  min-width: 200px; /* Ensures a minimum size */
  text-align: center;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:hover .edit-icon {
    opacity: 1;
    visibility: visible;
  }
`;

export const EditIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  visibility: hidden;
  font-size: 18px;
  color: white; /* Blue edit icon */
  cursor: pointer;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8); /* White with slight opacity */
  }
`;
export const AddProjectButton = styled.button`
  display: flex;
  opacity: 0.8;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Space between the + symbol and text */
  padding: 10px 20px;
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  font-size: 16px; /* Font size for text */
  font-weight: bold;
  border: none; /* No border */
  border-radius: 5px; /* Slightly rounded corners */
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: translateY(-2px); /* Slight hover effect */
  }

  &:active {
    background-color: #004494; /* Even darker blue on click */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Reduced shadow on click */
    transform: translateY(0);
  }

  span {
    font-size: 20px; /* Slightly larger font for + symbol */
    font-weight: bold;
  }
`;
