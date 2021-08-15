import Router from "next/router";
import NProgress from "nprogress";

const addProgressBar = (): void => {
  if (typeof window !== "undefined") {
    NProgress.configure({ showSpinner: false });

    Router.events.on("routeChangeError", () => NProgress.done());
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
  }
};

export default addProgressBar;
