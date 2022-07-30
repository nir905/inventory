import React, { useContext } from "react";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import { useTranslation } from "react-i18next";
import SingleValue from "./SingleValue";
import AppContext from "../../app/components/AppContext";

const Values = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;

const COLORS = ["#55549a", "#ff9a9f", "#e482a3", "#bc6ea5", "#8d5fa5"];

const Dashboard = () => {
  const { t } = useTranslation();
  const { inventory: list } = useContext(AppContext);
  const categoriesOptions = t("categories", { returnObjects: true });

  return (
    <>
      <Values>
        <SingleValue
          label={t("missing_items")}
          value={list.filter(({ amount }) => +amount === 0).length}
        />
        <SingleValue label={t("total_items")} value={list.length} />
      </Values>
      <PieChart
        style={{ height: "80%" }}
        data={Object.entries(categoriesOptions)
          .map(([key, value], index) => ({
            title: value,
            value: list.filter((item) => item.category === key).length,
            color: COLORS[index % COLORS.length],
          }))
          .filter(({ value }) => value > 0)}
        label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`}
        labelStyle={{
          fill: "#fff",
          pointerEvents: "none",
          fontSize: 4,
        }}
      />
    </>
  );
};

export default Dashboard;
