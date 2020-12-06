function setupEventListenerByName(doc, elementId, eventName, handler) {
  const element = doc.getElementById(elementId);
  if (element !== null) {
    element.removeEventListener(eventName, handler);
    element.addEventListener(eventName, handler);
  }
}

function setupEventListener(element, eventName, handler) {
  if (element !== null) {
    element.removeEventListener(eventName, handler);
    element.addEventListener(eventName, handler);
  }
}

export function setupEventListeners(doc, eventHandlers) {
  console.log("Setting up event listeners");

  eventHandlers.forEach((h) => {
    if (h.element === undefined) {
      setupEventListenerByName(doc, h.elementId, h.eventName, h.handler);
    } else {
      setupEventListener(h.element, h.eventName, h.handler);
    }
  });
}
