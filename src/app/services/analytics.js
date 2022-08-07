import { logEvent as fbLogEvent } from "firebase/analytics";
import { analytics } from "./firebase";

const isLocalhost = window.location.hostname === "localhost";

const logEvent = isLocalhost
  ? (_, eventName) => console.log("analytics event:", eventName)
  : fbLogEvent;

export const clickAddNewItem = () => logEvent(analytics, "add_new_item");

export const clickEditItem = () => logEvent(analytics, "edit_item");

export const clickChangeAmount = () => logEvent(analytics, "change_amount");

export const clickShareWhatsapp = () => logEvent(analytics, "share_whatsapp");

export const clickShareCopy = () => logEvent(analytics, "share_copy");
