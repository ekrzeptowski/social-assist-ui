const trackEvent = (category, action, name, value) => {
  if (window?._paq) {
    window._paq.push(["trackEvent", category, action, name, value]);
  }
};

export default trackEvent;
