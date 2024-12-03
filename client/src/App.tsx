import { FC, useState } from "react";
import { PageWrapper, Wrapper } from "./StyledComponents";
import { SideBar } from "./components/sideBar/SideBar";
import { MainPage } from "./components/mainPage/mainPage";
import { FetchedData } from "./utils.ts/fetchData";
interface AppProps {
  data: FetchedData;
  fetchAndSetData: () => Promise<void>;
}

export const App: FC<AppProps> = ({ data, fetchAndSetData }) => {
  const [chosenProject, setChosenProject] = useState(0);
  const changeChosenProject = (index: number) => {
    setChosenProject(index);
  };
  return (
    <Wrapper>
      <>
        <SideBar
          onModalSubmit={fetchAndSetData}
          chosenProject={chosenProject}
          changeChosenProject={changeChosenProject}
          projects={data?.map((project) => ({
            title: project.title,
            projectid: project.id,
          }))}
        />
        <PageWrapper>
          {data.length > 0 && data[0].tasks && (
            <MainPage
              tasks={data[chosenProject].tasks}
              onModalSubmit={fetchAndSetData}
              projectid={data[chosenProject].id}
            />
          )}
        </PageWrapper>
      </>
    </Wrapper>
  );
};
