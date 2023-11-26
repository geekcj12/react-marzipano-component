import { useContext } from "react";
import { Context } from "../Viewer";

const useViewerContext = () => useContext(Context);

export default useViewerContext;
