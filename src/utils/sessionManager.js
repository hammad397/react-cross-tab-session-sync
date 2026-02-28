import { store } from "../store/store";

export const bc = new BroadcastChannel("auth_channel");

const TAB_ID = Date.now() + Math.random();
sessionStorage.setItem("TAB_ID", TAB_ID);

bc.onmessage = (event) => {
  const data = event.data;

  if (data.type === "REQUEST_STATE") {
    bc.postMessage({
      type: "SEND_STATE",
      payload: store.getState(),
    });
  }

  if (data.type === "SEND_STATE") {
    store.dispatch({
      type: "HYDRATE_STATE",
      payload: data.payload,
    });
  }
};

if (!sessionStorage.getItem("persist:root")) {
  bc.postMessage({ type: "REQUEST_STATE", tabId: TAB_ID });
}

window.addEventListener("beforeunload", () => {
  bc.close();
});
