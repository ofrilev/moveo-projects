import {
  MainWrapper,
  StyledTitle,
  StyledSubtitle,
  StyledInputWrapper,
  FrameWrapper,
  StyledSubmitButton,
} from "./StyledComponents";
import { Page } from "../Auth";
import { loginTheme, registrationTheme } from "./theme";
import { useRef } from "react";
const PageTheme = [registrationTheme, loginTheme];

export const RightSide = (props: { page: Page }) => {
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const chosenPage = PageTheme[props.page];

  return (
    <FrameWrapper>
      <MainWrapper>
        <StyledTitle>{chosenPage.title}</StyledTitle>
        <StyledSubtitle>{chosenPage.subTitleText}</StyledSubtitle>
        <StyledInputWrapper>
          <div>Email</div>
          <input
            placeholder="Enter your email "
            type="text"
            ref={userNameRef}
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <div>{chosenPage.inputText}</div>
          <input
            placeholder={chosenPage.inputPlaceHolder}
            type="password"
            ref={passwordRef}
          />
        </StyledInputWrapper>
        <StyledSubmitButton
          onClick={() =>
            chosenPage.handleSubmit(
              userNameRef?.current?.value ?? "",
              passwordRef?.current?.value ?? " "
            )
          }
        >
          {chosenPage.buttonText}
        </StyledSubmitButton>
      </MainWrapper>
    </FrameWrapper>
  );
};
