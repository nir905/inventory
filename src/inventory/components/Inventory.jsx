import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AddItemModal from "../../modal/components/ItemModal";
import useStoredState from "../hooks/useStoredState";
import Item from "./Item";

const Wrapper = styled.main`
  background: #ffffff;
  border-radius: 25px 0 0 0;
  padding: 16px;
  height: 100%;
  overflow: scroll;
`;

const SearchWrapper = styled.div`
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
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
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
`;

const Empty = styled.div`
  text-align: center;
  font-size: 32px;
  margin-top: 64px;
  color: #9a9999;
`;

const Inventory = () => {
  const { t } = useTranslation();
  const [list, setList] = useStoredState("inventoryV1", []);
  const [search, setSearch] = useState("");
  const [selectedItemModal, setSelectedItemModal] = useState();

  const filteredList = useMemo(
    () =>
      list
        .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [list, search]
  );

  const handleChangeAmount = useCallback((id, newAmount) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, amount: newAmount } : item
      )
    );
  }, []);

  const handleSaveItem = useCallback((newItem) => {
    if (newItem.id) {
      setList((prevList) =>
        prevList.map((item) =>
          item.id === newItem.id ? { ...item, ...newItem } : item
        )
      );
    } else {
      setList((prevList) => [...prevList, { ...newItem, id: Math.random() }]);
    }
  }, []);

  const handleDeleteItem = useCallback(() => {
    setList((prevList) =>
      prevList.filter((item) => item.id !== selectedItemModal.id)
    );
  }, [selectedItemModal]);

  return (
    <Wrapper>
      <SearchWrapper>
        <Search
          placeholder={t("search_items")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>

      {list.length > 0 ? (
        <List>
          {filteredList.map((item) => (
            <Item
              {...item}
              key={item.id}
              onChangeAmount={handleChangeAmount}
              onEdit={() => setSelectedItemModal(item)}
            />
          ))}
        </List>
      ) : (
        <Empty>{t("no_items")}</Empty>
      )}

      {list.length > 0 && filteredList.length === 0 && (
        <Empty>{t("no_items_found")}</Empty>
      )}

      <AddButton onClick={() => setSelectedItemModal({})}>+</AddButton>

      {selectedItemModal && (
        <AddItemModal
          item={selectedItemModal}
          onClose={() => setSelectedItemModal()}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
        />
      )}
    </Wrapper>
  );
};

export default Inventory;
