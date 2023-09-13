import { useState } from "react";
import { createContainer } from "unstated-next";

function useLoading() {
  let [status, setLoading] = useState(false);
  let set = loadingStatus => setLoading(loadingStatus);
  return { status, set };
}
let LoadingContainer = createContainer(useLoading);
export default LoadingContainer;
