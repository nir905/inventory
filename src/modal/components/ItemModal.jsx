import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../shared/components/Modal";
import { useTranslation } from "react-i18next";

const Input = styled.input`
  border: 1px solid #bcbcbc;
  background: #fff;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const ItemModal = ({ item = {}, onClose, onSave, onDelete }) => {
  const { t } = useTranslation();
  const [state, setState] = useState({ type: "unit", ...item });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const categoriesOptions = t("categories", { returnObjects: true });

  const onSaveItem = (cb) => {
    if (!state.name || state.amount === undefined) {
      return;
    }
    onSave(state);
    cb();
  };

  const onAddAnotherItemClick = () => {
    onSaveItem(() => setState({ type: "unit" }));
  };

  return (
    <Modal
      onClose={onClose}
      title={item.id ? t("update_item") : t("add_item")}
      primaryText={t("save")}
      onPrimaryClick={() => onSaveItem(onClose)}
      secondaryText={t("cancel")}
      onSecondaryClick={onClose}
      thirdText={item.id ? t("delete") : t("add_another_item")}
      thirdImportant={item.id}
      onThirdClick={
        item.id ? () => setShowDeleteModal(true) : onAddAnotherItemClick
      }
    >
      <Input
        placeholder={t("name")}
        value={state.name || ""}
        onChange={(e) =>
          setState((prev) => ({ ...prev, name: e.target.value }))
        }
        autoFocus
      />

      <Input
        placeholder={t("amount")}
        type="number"
        value={state.amount || ""}
        onChange={(e) =>
          setState((prev) => ({ ...prev, amount: e.target.value }))
        }
      />

      <Input
        as="select"
        value={state.type || ""}
        onChange={(e) =>
          setState((prev) => ({ ...prev, type: e.target.value }))
        }
      >
        <option value="unit">{t("unit")}</option>
        <option value="box">{t("box")}</option>
        <option value="gram">{t("gram")}</option>
      </Input>

      <Input
        as="select"
        value={state.category || ""}
        onChange={(e) =>
          setState((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        <option value="" disabled>
          {t("select_category")}
        </option>
        {Object.entries(categoriesOptions).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </Input>

      <Input
        as="textarea"
        placeholder={t("comment")}
        value={state.comment || ""}
        onChange={(e) =>
          setState((prev) => ({ ...prev, comment: e.target.value }))
        }
      />
      {showDeleteModal && (
        <Modal
          title={t("delete_item")}
          onClose={() => setShowDeleteModal(false)}
          primaryText={t("yes")}
          onPrimaryClick={() => {
            onDelete();
            setShowDeleteModal(false);
            onClose();
          }}
          secondaryText={t("no")}
          onSecondaryClick={() => setShowDeleteModal(false)}
        />
      )}
    </Modal>
  );
};

export default ItemModal;
