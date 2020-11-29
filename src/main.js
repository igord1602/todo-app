import { setupEventListeners } from "./events.js";

export function startApplication(doc) {
  console.log("TODO Application started");

  const rootDiv = doc.getElementById("root");

  console.log(`Root div is ${rootDiv === null ? "not found" : "found"}`);

  setupEventListeners(doc);
}
