export function fbqTrack(event, params = {}, options = {}) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params, options);
  }
}
