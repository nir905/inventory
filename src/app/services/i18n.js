import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      app_name: "Inventory App",
      english: "English",
      hebrew: "Hebrew",
      search_items: "Search items...",
      no_items: "No items yet",
      no_items_found: "No items found",
      update_item: "Update item",
      add_item: "Add item",
      save: "Save",
      cancel: "Cancel",
      name: "Name",
      amount: "Amount",
      unit: "Unit",
      box: "Box",
      gram: "Gram",
      comment: "Comment",
      delete_item: "Delete item?",
      yes: "Yes",
      no: "No",
      share: "Share",
      full_list: "Full list",
      missing_items: "Missing items",
      share_whatsapp: "Share on Whatsapp",
      copy: "Copy",
    },
  },
  he: {
    translation: {
      app_name: "אפליקצית מלאי",
      english: "אנגלית",
      hebrew: "עברית",
      search_items: "חיפוש מוצרים...",
      no_items: "אין עדיין מוצרים",
      no_items_found: "מוצרים לא נמצאו",
      update_item: "עידכון מוצר",
      add_item: "הוספת מוצר",
      save: "שמירה",
      cancel: "ביטול",
      name: "שם",
      amount: "כמות",
      unit: "יחידה",
      box: "קופסא",
      gram: "גרם",
      comment: "הערה",
      delete_item: "למחוק מוצר?",
      yes: "כן",
      no: "לא",
      share: "שיתוף",
      full_list: "כל הרשימה",
      missing_items: "מוצרים חסרים",
      share_whatsapp: "שתף בווטאספ",
      copy: "העתק",
    },
  },
};

const getDefaultLang = () => {
  try {
    return JSON.parse(localStorage.getItem("lang"));
  } catch (err) {
    return "en";
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDefaultLang(),
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
