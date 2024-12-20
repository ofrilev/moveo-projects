import styled from "styled-components";
import { Colors } from "../colors";
const colors = new Colors();
interface Props extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: string;
  height?: string;
  alignSelf?: string;
}

const StyledSVG = styled.svg<Props>`
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "30px"};
  align-self: ${({ alignSelf }) => `${alignSelf}` || "unset"};
  path {
    fill: ${({ color }) => color || colors.blue[400]};
  }
`;

const CheckedIcon: React.FC<Props> = (props) => {
  return (
    //@ts-ignore
    <StyledSVG
      viewBox="0 0 24 24" // Updated viewBox
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM17.8 8.6C18.1314 8.15817 18.0418 7.53137 17.6 7.2C17.1582 6.86863 16.5314 6.95817 16.2 7.4L10.8918 14.4776L8.70711 12.2929C8.31658 11.9024 7.68342 11.9024 7.29289 12.2929C6.90237 12.6834 6.90237 13.3166 7.29289 13.7071L10.2929 16.7071C10.4979 16.9121 10.7817 17.018 11.0709 16.9975C11.3601 16.9769 11.6261 16.8319 11.8 16.6L17.8 8.6Z"
        fill="#000000"
      />
    </StyledSVG>
  );
};

export default CheckedIcon;
