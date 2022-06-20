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

    return baseList.filter(({ amount }) => amount?.toString() === "0");
  }, [listType, baseList]);

  const title = t(listType === "full" ? "full_list" : "missing_items");

  return (
    <Modal onClose={onClose} title={t("share")}>
      <Content>
        <RadioButton
          label={t("full_list")}
          value={listType === "full"}
          onChange={() => setListType("full")}
        />

        <RadioButton
          label={t("missing_items")}
          value={listType === "missing"}
          onChange={() => setListType("missing")}
        />

        <Button
          as="a"
          href={`whatsapp://send?text=${title}:%0a${list
            .map(({ name }) => name)
            .join("%0a")}`}
          rel="nofollow noopener"
          target="_blank"
          onClick={onClose}
        >
          {t("share_whatsapp")}
        </Button>

        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${title}:\n${list.map(({ name }) => name).join("\n")}`
            );
            onClose();
          }}
        >
          {t("copy")}
        </Button>
      </Content>
    </Modal>
  );
};

export default ShareModal;
