import ReactPixel from "react-facebook-pixel";

const options = {
  autoConfig: true,
  debug: false,
};

export const initFacebookPixel = (pixelId) => {
  ReactPixel.init(pixelId, undefined, options);
};

export const pageView = () => {
  ReactPixel.pageView();
};

export const trackEvent = (event, data = {}) => {
  ReactPixel.track(event, data);
};
