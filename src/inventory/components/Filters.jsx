import React, { useContext } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as BaseShareIcon } from "../../assets/share.svg";
import AppContext from "../../app/components/AppContext";

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 10px;
  align-items: center;
  position: sticky;
  top: -17px;
  background: #fff;
  margin: -17px -16px 17px;
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
  cursor: pointer;
`;

const ShareIcon = styled(BaseShareIcon)`
  width: 24px;
  height: 24px;
  grid-row: 2;
  grid-column: 2;
  cursor: pointer;
`;

const Filters = ({
  search,
  setSearch,
  selectedFilter,
  setSelectedFilter,
  setShareModal,
}) => {
  const { t } = useTranslation();
  const categoriesOptions = t("categories", { returnObjects: true });
  const { inventory: list } = useContext(AppContext);

  return (
    <SearchWrapper>
      <Search
        placeholder={t("search_items", { total: list.length })}
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
  );
};

export default Filters;
