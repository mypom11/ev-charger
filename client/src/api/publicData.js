import axios from "axios";
import { setInterceptors } from "./interceptors";

function createInstancePublic() {
  // Token값과 특정 url을 붙여서 셋팅
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_LOCAL_URI}`,
  });
  return setInterceptors(instance);
}

const publicData = createInstancePublic();

export function getCharger(data) {
  return publicData.get("getChargerInfo", { params: data });
}
