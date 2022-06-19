import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../shared/components/Modal";

const Input = styled.input`
  border: 1px solid #bcbcbc;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 32px;
`;

const ItemModal = ({ item = {}, onClose, onSave }) => {
  const [state, setState] = useState({ type: "unit", ...item });

  return (
    <Modal
      onClose={onClose}
      title={item.id ? "Update item" : "Add item"}
      primaryText="Save"
      onPrimaryClick={() => {
        if (!state.name || state.amount === undefined) {
          return;
        }
        onSave(state);
        onClose();
      }}
      secondaryText="Cancel"
      onSecondaryClick={onClose}
    >
      <Input
        placeholder="Name"
        value={state.name || ""}
        onChange={(e) =>
          setState((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <Input
        placeholder="Amount"
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
        <option value="unit">Unit</option>
        <option value="box">Box</option>
        <option value="gram">Gram</option>
      </Input>

      <Input
        as="textarea"
        placeholder="Comment"
        value={state.comment || ""}
        onChange={(e) =>
          setState((prev) => ({ ...prev, comment: e.target.value }))
        }
      />
    </Modal>
  );
};

export default ItemModal;
