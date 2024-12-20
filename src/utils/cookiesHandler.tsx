// Set
export const setCookie = (name: string, value: string, hours: number = 24 * 7) => {
  let expires = "";
  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "; expires=Session"; // Default to session cookie if hours is 0
  }

  // Remove the Secure flag entirely for HTTP (this will work for both HTTP and HTTPS)
  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Strict`;
};

// Get
export const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

// Delete
export const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Strict`;
};