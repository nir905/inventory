import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../shared/components/Modal";
import { useTranslation } from "react-i18next";

const Search = styled.input`
  border: 1px solid #bcbcbc;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
`;

const Select = styled(Search).attrs(() => ({ as: "select" }))`
  background: #fff;
  cursor: pointer;
`;

const FiltersModal = ({ selectedFilter, onApply, onClose }) => {
  const { t } = useTranslation();
  const categoriesOptions = t("categories", { returnObjects: true });

  const [internalFilter, setInternalFilter] = useState(selectedFilter);

  return (
    <Modal
      onClose={onClose}
      title={t("filter")}
      primaryText={t("apply")}
      onPrimaryClick={() => {
        onApply(internalFilter);
        onClose();
      }}
      secondaryText={t("cancel")}
      onSecondaryClick={onClose}
      thirdText={selectedFilter && t("reset")}
      onThirdClick={() => {
        onApply();
        onClose();
      }}
    >
      <Select
        value={internalFilter || ""}
        onChange={(e) => setInternalFilter(e.target.value)}
      >
        <option value="">{t("all_categories")}</option>
        {Object.entries(categoriesOptions).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </Select>
    </Modal>
  );
};

export default FiltersModal;
