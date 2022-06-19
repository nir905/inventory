import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
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

const Inventory = () => {
  const [list, setList] = useState([
    { id: Math.random(), name: "Coca cola", amount: 4 },
    { id: Math.random(), name: "Coca cola2", amount: 5 },
  ]);
  const [search, setSearch] = useState("");

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

  return (
    <Wrapper>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />

      <List>
        {filteredList.map((item) => (
          <Item {...item} key={item.id} onChangeAmount={handleChangeAmount} />
        ))}
      </List>
    </Wrapper>
  );
};

export default Inventory;
