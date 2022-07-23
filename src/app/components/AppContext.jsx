import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, listenToDB, setDB } from "../services/firebase";

const AppContext = createContext({ lang: "en", inventory: [] });

export const AppProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [lang, setLang] = useState("en");
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    listenToDB(user?.uid, "lang", setLang, "en");
    listenToDB(user?.uid, "inventory", setInventory, []);
  }, [user?.uid]);

  const onChangeLang = useCallback(
    (newLang) => {
      setDB(user?.uid, "lang", newLang);
    },
    [user?.uid]
  );

  const onChangeInventory = useCallback(
    (newValueOrFunction) => {
      let newValue = newValueOrFunction;

      if (typeof newValueOrFunction === "function") {
        newValue = newValueOrFunction(inventory);
      }
      setDB(user?.uid, "inventory", newValue);
    },
    [inventory, user?.uid]
  );

  // migration
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("inventoryV1"));
      if (data) {
        onChangeInventory(() => data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user?.uid]);

  const context = useMemo(
    () => ({
      lang,
      onChangeLang,
      inventory,
      onChangeInventory,
    }),
    [lang, onChangeLang, inventory, onChangeInventory]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
