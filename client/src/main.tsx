import { createRoot } from "react-dom/client";
import "./index.css";
import {App} from "./App.tsx";
import { fetchData, FetchedData } from "./utils.ts/fetchData";
import { Wrapper } from "./StyledComponents.tsx";
import { useState, useEffect } from "react";
import LoaderGif from "./components/LoaderGif.tsx";
const AppWrapper = () => {
  const [data, setData] = useState<FetchedData | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchAndSetData = async () => {
    setLoading(true);
    const fetchedData = await fetchData();
    setData(fetchedData);
    setLoading(false);
  };
  useEffect(() => {


    fetchAndSetData();
  }, []);

  return (
    <Wrapper>
      {loading && <LoaderGif />}
      {data && <App data={data} fetchAndSetData={fetchAndSetData} />}
    </Wrapper>
  );
};
createRoot(document.getElementById("root")!).render(<AppWrapper />);
