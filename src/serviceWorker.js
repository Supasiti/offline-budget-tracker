const registerWorker = async () => {
  try {
    const res = await navigator.serviceWorker.register(
      './service-worker.js',
    );
    // console.log(res);
    // console.log('Service Worker registered successfully.');
  } catch (err) {
    console.log('Service Worker registration failed:', err);
  }
};

export const addServiceWorker = () => {
  // check if it is compatible with browser
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', registerWorker);
  }
};
