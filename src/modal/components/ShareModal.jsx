import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Modal from "../../shared/components/Modal";
import { useTranslation } from "react-i18next";
import Button from "../../shared/components/Button";
import RadioButton from "../../shared/components/RadioButton";

const Content = styled.div`
  > button,
  > a {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 12px;
    text-decoration: none;
  }
`;

const ShareModal = ({ list: baseList, onClose }) => {
  const { t } = useTranslation();
  const [listType, setListType] = useState("full");

  const list = useMemo(() => {
    if (listType === "full") {
      return baseList;
    }

    return baseList.filter(({ amount }) => amount === 0);
  }, [listType, baseList]);

  return (
    <Modal onClose={onClose} title={t("share")}>
      <Content>
        <RadioButton
          label="Full list"
          value={listType === "full"}
          onChange={() => setListType("full")}
        />
        <RadioButton
          label="Missing items"
          value={listType === "finished"}
          onChange={() => setListType("finished")}
        />

        <Button
          as="a"
          href={`whatsapp://send?text=${list
            .map(({ name }) => name)
            .join("\n")}`}
          rel="nofollow noopener"
          target="_blank"
        >
          Share on Whatsapp
        </Button>
        <Button>Copy</Button>
      </Content>
    </Modal>
  );
};

export default ShareModal;
