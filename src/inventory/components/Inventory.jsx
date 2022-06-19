import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import AddItemModal from "../../modal/components/ItemModal";
import Item from "./Item";

const Wrapper = styled.main`
  background: #ffffff;
  border-radius: 9% 0 0 0;
  padding: 16px 32px;
  height: 100%;
`;

const Search = styled.input`
  border: 1px solid #bcbcbc;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 32px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const Inventory = () => {
  const [list, setList] = useState([
    { id: Math.random(), name: "Coca cola", amount: 4, type: "unit" },
    { id: Math.random(), name: "Coca cola2", amount: 5, type: "gram" },
  ]);
  const [search, setSearch] = useState("");
  const [selectedItemModal, setSelectedItemModal] = useState();

  const filteredList = useMemo(
    () =>
      list.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
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

  return (
    <Wrapper>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />

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

      <AddButton onClick={() => setSelectedItemModal({})}>+</AddButton>

      {selectedItemModal && (
        <AddItemModal
          item={selectedItemModal}
          onClose={() => setSelectedItemModal()}
          onSave={handleSaveItem}
        />
      )}
    </Wrapper>
  );
};

export default Inventory;
