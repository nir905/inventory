import React, { useContext } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as BaseShareIcon } from "../../assets/share.svg";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import AppContext from "../../app/components/AppContext";
import { useState } from "react";
import FiltersModal from "../../modal/components/FiltersModal";

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 4px 10px;
  align-items: center;
  position: sticky;
  top: -17px;
  background: #fff;
  margin: -17px -16px 10px;
  padding: 17px 17px 0;
  border-radius: 25px 0 0 0;
`;

const Search = styled.input`
  border: 1px solid #bcbcbc;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
`;

const FilterIconWrapper = styled.div`
  position: relative;
  &:after {
    display: ${({ $filtered }) => ($filtered ? "block" : "none")};
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: #f064bb;
    border-radius: 100%;
    top: 0;
    right: 0;
  }
`;

const ShareIcon = styled(BaseShareIcon)`
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
  const [openFilters, setOpenFilters] = useState(false);
  const { inventory: list } = useContext(AppContext);

  return (
    <>
      <SearchWrapper>
        <Search
          placeholder={t("search_items", { total: list.length })}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterIconWrapper $filtered={!!selectedFilter}>
          <FilterIcon onClick={() => setOpenFilters(true)} />
        </FilterIconWrapper>

        <ShareIcon onClick={() => setShareModal(true)} />
      </SearchWrapper>

      {openFilters && (
        <FiltersModal
          selectedFilter={selectedFilter}
          onClose={() => setOpenFilters(false)}
          onApply={setSelectedFilter}
        />
      )}
    </>
  );
};

export default Filters;
