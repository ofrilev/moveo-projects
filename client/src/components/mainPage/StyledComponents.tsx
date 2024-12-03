import styled from "styled-components";

export const TaskTitle = styled.h1`
  align-items: center;
  color: black;
  font-size: 35px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
`;
export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #4caf50; /* Green background */
  color: white; /* White text */
  font-size: 24px; /* Larger font for the + symbol */
  font-weight: bold;
  border: none; /* No border */
  border-radius: 50%; /* Circle shape */
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049; /* Darker green on hover */
    transform: scale(1.1); /* Slightly enlarge */
  }

  &:active {
    background-color: #3e8e41; /* Even darker green on click */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Reduced shadow on click */
    transform: scale(1);
  }
`;
export const TaskTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 100%;
`;
export const TaskTableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 10px 20px;
  border-bottom: 1px solid #b0bac8;
`;
export const Container = styled.div`
  height: 50vh;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const Column = styled.div`
  flex: 1;
  margin: 0 10px;
  text-align: center;
  border-right: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

export const EditableDiv = styled.div`
  position: relative;
  width: 30%;
  align-self: center;
  display: inline-block;
  padding: 10px;
  background-color: rgb(128, 118, 138, 0.6);
  border: 2px solid white;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  min-width: 200px;
  text-align: center;
  font-size: 16px;
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
