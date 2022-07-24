import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

export const clickAddNewItem = () => logEvent(analytics, "add_new_item");

export const clickEditItem = () => logEvent(analytics, "edit_item");

export const clickChangeAmount = () => logEvent(analytics, "change_amount");

export const clickShareWhatsapp = () => logEvent(analytics, "share_whatsapp");

export const clickShareCopy = () => logEvent(analytics, "share_copy");
