function loadScript(scriptSrc, loadedCallback, errorCallback) {
  console.log("Loading script ...");

  let script = document.createElement("script");
  script.src = scriptSrc;

  script.onload = () => loadedCallback(scriptSrc);
  script.onerror = () =>
    errorCallback(new Error(`Script ${scriptSrc} loading failed`));

  document.head.append(script);
}

function loadScriptP(scriptSrc) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = scriptSrc;

    script.onload = () => resolve(scriptSrc);
    script.onerror = () =>
      reject(new Error(`Script ${scriptSrc} loading failed`));

    document.head.append(script);
  });
}

function probe1loaded(src) {
  console.log(`=> Script ${src} loaded...`);
  probe1();

  loadScript("/src/probes/probe2.js", probe2loaded, probeError);
}

function probe2loaded(src) {
  console.log(`=> Script ${src} loaded...`);
  probe2();

  console.log(`I am ready to use probe1 and probe2`);
}

function probeError(error) {
  console.log("### Load failed...");
  console.log(error);
}

function scriptDemo() {
  loadScript("/src/probes/probe1.js", probe1loaded, probeError);

  console.log("==> This line is next after loadScript...");
}

function timeoutDemo() {
  console.log(`=> Start`);

  const now = Date.now();

  setTimeout(() => {
    console.log(`Inside Timeout 2000 ...`);

    const timeout1 = Date.now();
    console.log(`1. Time passed ${timeout1 - now}`);
  }, 2000);

  console.log(`Between timeouts`);

  setTimeout(() => {
    console.log(`Inside Timeout 5000 ...`);

    const timeout2 = Date.now();
    console.log(`2. Time passed ${timeout2 - now}`);
  }, 5000);

  console.log(`=> Processing`);
  console.log(`=> End`);
}

function promiseBasicDemo() {
  // producing code
  // consuming code
  // promise
  const promiseExample = new Promise((resolve, reject) => {
    // executor function === producing code
    // resolve(value) -> all is good
    // reject(error)-> all is bad
    // state:
    // pending - right after creation
    // fulfilled - right after resolve
    // rejected - right after reject
  });

  promiseExample.then(
    (result) => {
      /* handle a successful result */
    },
    (error) => {
      /* handle and error */
    }
  );

  const delayPromise = new Promise((resolve, reject) => {
    console.log(`Executor function run...`);

    setTimeout(() => {
      console.log("timeout passed");
      const randomValue = Math.random() * 100;
      console.log(`edge is ${randomValue}`);
      randomValue <= 50
        ? resolve(randomValue)
        : reject(new Error("Whooops!!!!"));
    }, 2000);
  });

  delayPromise.then(
    (result) => {
      console.log(`Promise result ${result}.`);
    },
    (error) => {
      console.log(error);
    }
  );

  console.log(`After promise`);
}

function promisifiedLoadScriptDemo() {
  loadScriptP("/src/probes/probe1.js").then(
    (src) => {
      console.log(`Script path ${src}`);
      probe1();
    },
    (error) => console.log(error)
  );

  console.log(`After promise`);
}

const delay = (ms) =>
  new Promise((resolve) => setTimeout((_) => resolve(1), ms));

function chainingDemo() {
  console.log(`Before delay`);

  delay(1000)
    .then((_) => console.log(`After delay`))
    .then((_) => console.log(`After promise`));

  delay(1500)
    .then((result) => {
      console.log(`${result}`);
      return result * 2;
    })
    .then((result) => {
      console.log(`${result}`);
      return result * 2;
    })
    .then((result) => {
      console.log(`${result}`);
      return result * 2;
    })
    .then((result) => {
      console.log(`${result}`);
      return result * 2;
    })
    .then((result) => {
      console.log(`${result}`);
    }); // chaining

  console.log(`*******************************`);

  const p = delay(2000);

  p.then((result) => {
    console.log(`${result}`);
    return result * 2;
  });

  p.then((result) => {
    console.log(`${result}`);
    return result * 2;
  });

  p.then((result) => {
    console.log(`${result}`);
    return result * 2;
  });

  p.then((result) => {
    console.log(`${result}`);
    return result * 2;
  });
}

function fullLoadScriptDemo() {
  loadScriptP("/src/probes/probe1.js")
    .then((_) => loadScriptP("/src/probes/probe2.js"))
    .then((_) => loadScriptP("/src/probes/probe3.js"))
    .then((_) => {
      probe1();
      probe2();
      probe3();
    })
    .then((_) => console.log(`After promise`))
    .catch((error) => console.log(error))
    .finally(() => console.log(`always executed`));
}

async function asyncDemo() {
  await delay(1000);
  console.log(`After delay`);
  console.log(`After promise`);
}

async function asyncLoadDemo() {
  await loadScriptP("/src/probes/probe1.js");
  await loadScriptP("/src/probes/probe2.js");
  await loadScriptP("/src/probes/probe3.js");

  probe1();
  probe2();
  probe3();

  console.log(`After promise`);
  // .catch((error) => console.log(error))
  console.log(`always executed`);
}

async function doubleAsyncDemo() {
  await asyncDemo();
  await asyncLoadDemo();
}

function demoTimeoutZero() {
  function executorFunction(resolve, reject) {
    console.log("running ex f");
    setTimeout(() => {
      resolve(42);
    }, 0);
  }

  console.log("Hi!");

  const p = new Promise(executorFunction);

  p.then(() => console.log("from promise"));

  console.log("Welcome to loupe.");
}

export function demo() {
  let start = Date.now();
  Promise.all([delay(1000), delay(2000), delay(3000)]).then((_) => {
    const timeout = Date.now() - start;
    console.log(`All timeout: ${timeout}`);
  });

  start = Date.now();
  Promise.race([delay(1000), delay(2000), delay(3000)]).then((_) => {
    const timeout = Date.now() - start;
    console.log(`Race timeout: ${timeout}`);
  });

  start = Date.now();
  Promise.any([delay(1000), delay(2000), delay(3000)]).then((_) => {
    const timeout = Date.now() - start;
    console.log(`Any timeout: ${timeout}`);
  });
}
