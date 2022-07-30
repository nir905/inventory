import React, { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AddItemModal from "../../modal/components/ItemModal";
import { ReactComponent as BaseShareIcon } from "../../assets/share.svg";
import Item from "./Item";
import ShareModal from "../../modal/components/ShareModal";
import AppContext from "../../app/components/AppContext";
import {
  clickAddNewItem,
  clickChangeAmount,
  clickEditItem,
} from "../../app/services/analytics";

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 10px;
  align-items: center;
  position: sticky;
  top: -17px;
  background: #fff;
  margin: -17px -17px 17px;
  padding: 17px 17px 0;
  border-radius: 25px 0 0 0;
`;

const Search = styled.input`
  border: 1px solid #bcbcbc;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
  grid-column: 1/-1;
`;

const Select = styled(Search).attrs(() => ({ as: "select" }))`
  grid-column: 1;
  background: #fff;

  :hover {
    cursor: pointer;
  }
`;

const ShareIcon = styled(BaseShareIcon)`
  width: 24px;
  height: 24px;
  grid-row: 2;
  grid-column: 2;

  :hover {
    cursor: pointer;
  }
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

  :hover {
    cursor: pointer;
  }
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

  const categoriesOptions = t("categories", { returnObjects: true });

  return (
    <>
      <SearchWrapper>
        <Search
          placeholder={t("search_items")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ShareIcon onClick={() => setShareModal(true)} />

        <Select
          value={selectedFilter || ""}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="">{t("all_categories")}</option>
          {Object.entries(categoriesOptions).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </Select>
      </SearchWrapper>

      {list.length > 0 ? (
        <List>
          {filteredList.map((item) => (
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
        +
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
