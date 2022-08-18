import React, { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AddItemModal from "../../modal/components/ItemModal";
import Item from "./Item";
import ShareModal from "../../modal/components/ShareModal";
import AppContext from "../../app/components/AppContext";
import {
  clickAddNewItem,
  clickChangeAmount,
  clickEditItem,
} from "../../app/services/analytics";
import { groupBy } from "../utils/lodash";
import Filters from "./Filters";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";

const Section = styled.div`
  font-size: 21px;
  margin-top: 10px;
  color: #676666;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 50px;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 64px;
  height: 64px;
  background: #7364f0;
  color: #ffffff;
  border-radius: 100%;
  font-size: 32px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
`;

const Empty = styled.div`
  text-align: center;
  font-size: 32px;
  margin-top: 64px;
  color: #9a9999;
`;

const Inventory = () => {
  const { t } = useTranslation();
  const { inventory: list, onChangeInventory: setList } =
    useContext(AppContext);
  const [search, setSearch] = useState("");
  const [selectedItemModal, setSelectedItemModal] = useState();
  const [shareModal, setShareModal] = useState();
  const [selectedFilter, setSelectedFilter] = useState();

  const filteredList = useMemo(
    () =>
      list
        .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
        .filter(
          ({ category }) => !selectedFilter || category === selectedFilter
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [list, search, selectedFilter]
  );

  const groupedList = useMemo(
    () =>
      Object.entries(groupBy(filteredList, "category")).sort(
        ([keyA], [keyB]) => {
          if (keyA === "undefined" && keyB !== "undefined") {
            return 1;
          }
          if (keyA !== "undefined" && keyB === "undefined") {
            return -1;
          }
          return keyA.localeCompare(keyB);
        }
      ),
    [filteredList]
  );

  const handleChangeAmount = useCallback(
    (id, newAmount) => {
      setList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, amount: newAmount } : item
        )
      );
      clickChangeAmount();
    },
    [setList]
  );

  const handleSaveItem = useCallback(
    (newItem) => {
      if (newItem.id) {
        setList((prevList) =>
          prevList.map((item) =>
            item.id === newItem.id ? { ...item, ...newItem } : item
          )
        );
      } else {
        setList((prevList) => [...prevList, { ...newItem, id: Math.random() }]);
      }
    },
    [setList]
  );

  const handleDeleteItem = useCallback(() => {
    setList((prevList) =>
      prevList.filter((item) => item.id !== selectedItemModal.id)
    );
  }, [setList, selectedItemModal]);

  return (
    <>
      <Filters
        {...{
          search,
          setSearch,
          selectedFilter,
          setSelectedFilter,
          setShareModal,
        }}
      />

      {list.length > 0 ? (
        <List>
          {groupedList.map(([category, list]) => (
            <React.Fragment key={category}>
              <Section>
                {category !== "undefined"
                  ? t(`categories.${category}`)
                  : t("uncategorized")}
              </Section>

              {list.map((item) => (
                <Item
                  {...item}
                  key={item.id}
                  onChangeAmount={handleChangeAmount}
                  onEdit={() => {
                    setSelectedItemModal(item);
                    clickEditItem();
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Empty>{t("no_items")}</Empty>
      )}

      {list.length > 0 && filteredList.length === 0 && (
        <Empty>{t("no_items_found")}</Empty>
      )}

      <AddButton
        onClick={() => {
          setSelectedItemModal({});
          clickAddNewItem();
        }}
      >
        <PlusIcon />
      </AddButton>

      {selectedItemModal && (
        <AddItemModal
          item={selectedItemModal}
          onClose={() => setSelectedItemModal()}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
        />
      )}

      {shareModal && (
        <ShareModal list={list} onClose={() => setShareModal(false)} />
      )}
    </>
  );
};

export default Inventory;
