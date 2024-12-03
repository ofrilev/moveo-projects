import { FC, useState } from "react";
import {
  MainWrapper,
  Image,
  LeftSide,
  NavButtonsWrapper,
  NavBarButton,
  MainTextFrame,
  MainTitle,
  StyledWord,
} from "./StyledComponents";
import background from "../consts/images/background-pattern.png";
import { AnimatedLogo } from "../consts/Components/AnimatedLogo/AnimatedLogo";
import { RightSide } from "./RightSide/RightSide";

export enum Page {
  registration = 0,
  login = 1,
}

export const Auth: FC = () => {
  const [page, setPage] = useState<Page>(Page.registration);

  return (
    <MainWrapper>
      <Image src={background} />
      <LeftSide>
        <NavButtonsWrapper>
          <NavBarButton
            selected={page === Page.login}
            onClick={() => setPage(Page.login)}
          >
            LOG IN
          </NavBarButton>
          <NavBarButton
            selected={page === Page.registration}
            onClick={() => setPage(Page.registration)}
          >
            Sign Up
          </NavBarButton>
        </NavButtonsWrapper>
        <MainTextFrame>
          <div>
            <MainTitle>Welcome Back To</MainTitle>
            <StyledWord>PROJECTS APP</StyledWord>
          </div>
        </MainTextFrame>
      </LeftSide>
      <RightSide page={page} />
    </MainWrapper>
  );
};
