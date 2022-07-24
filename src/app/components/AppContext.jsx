import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useStoredState from "../hooks/useStoredState";
import { auth, listenToValue, setValue } from "../services/firebase";

const AppContext = createContext({ lang: "en", inventory: [] });

export const AppProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [lang, setLang] = useStoredState("lang", "en");
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    listenToValue(user?.uid, "inventory", setInventory, []);
  }, [user?.uid]);

  const onChangeInventory = useCallback(
    (newValueOrFunction) => {
      let newValue = newValueOrFunction;

      if (typeof newValueOrFunction === "function") {
        newValue = newValueOrFunction(inventory);
      }
      setValue(user?.uid, "inventory", newValue);
    },
    [inventory, user?.uid]
  );

  const context = useMemo(
    () => ({
      lang,
      onChangeLang: setLang,
      inventory,
      onChangeInventory,
    }),
    [lang, setLang, inventory, onChangeInventory]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
