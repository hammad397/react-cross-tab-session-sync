import { persistor, store } from "../store/store";
import { login, logout } from "../store/slices/authSlice";

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

    const isAuth = data.payload.auth.isAuthenticated;

    if (!isAuth && window.location.pathname !== "/") {
      window.location.href = "/";
    } else if (isAuth && window.location.pathname === "/") {
      window.location.href = "/dashboard";
    }
  }

  if (data.type === "LOGOUT") {
    store.dispatch(logout());
    if (window.location.pathname !== "/") window.location.href = "/";
  }

  if (data.type === "LOGIN") {
    store.dispatch(login());
    if (window.location.pathname === "/") window.location.href = "/dashboard";
  }
};

if (!sessionStorage.getItem("persist:root")) {
  bc.postMessage({ type: "REQUEST_STATE", tabId: TAB_ID });
}

export const broadcastLogin = () => {
  store.dispatch(login());
  bc.postMessage({ type: "LOGIN" });
};

export const broadcastLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  persistor.purge();
  store.dispatch(logout());
  bc.postMessage({ type: "LOGOUT" });
};

window.addEventListener("beforeunload", () => {
  bc.close();
});
