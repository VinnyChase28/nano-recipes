//////////////////// CONFIG APP

import Constants from "expo-constants";

const isStandAloneApp = Constants.appOwnership == "standalone";

const ConfigApp = {
  // backend url (with slash at end of url)
  URL: "https://fodlmtsqwocmyxtgpqiw.supabase.co",

  // facebook page url
  FACEBOOK: "https://facebook.com",

  // youtube page url
  YOUTUBE: "https://youtube.com",

  // twitter page url
  TWITTER: "https://twitter.com",

  // twitter page url
  INSTAGRAM: "https://instagram.com",

  // banner admob unit id
  BANNER_ID: "ca-app-pub-4232853679195184/4472153551",

  // testdevice id, DON'T CHANGE IT
  TESTDEVICE_ID: isStandAloneApp ? "EMULATOR" : "EMULATOR",
};

export default ConfigApp;

fetch("https://fodlmtsqwocmyxtgpqiw.supabase.co/rest/v1/recipes?select=*", {
  headers: {
    apikey: "EXPO_SUPABASE_KEY",
    Authorization: "Bearer EXPO_SUPABASE_KEY",
  },
});
