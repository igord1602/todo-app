import configureRouter from "./routerConfig.js";

export function startApplication(doc) {
  console.log("TODO Application started");

  const router = configureRouter(doc, "/");

  router.navigate("/");
}
