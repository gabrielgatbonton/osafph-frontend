import Pusher from "pusher-js";

// Debug mode
// Pusher.logToConsole = true;
const pusherInstance = new Pusher(process.env.VUE_APP_PUSHER_JS_KEY, {
  cluster: process.env.VUE_APP_PUSHER_JS_CLUSTER,
});

export default pusherInstance