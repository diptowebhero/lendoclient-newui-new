import { getUser } from "@src/helpers/authUtils";
import { useState } from "react";
import { createContainer } from "unstated-next";

function useUser() {
  let [user, setUser] = useState(getUser());
  let set = userData => setUser(userData);
  return { user, set };
}
let UserContainer = createContainer(useUser);
export default UserContainer;
