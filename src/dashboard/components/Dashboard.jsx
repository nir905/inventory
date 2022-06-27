import React from "react";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import { useTranslation } from "react-i18next";
import useStoredState from "../../inventory/hooks/useStoredState";
import SingleValue from "./SingleValue";

const Values = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const COLORS = ["#55549a", "#ff9a9f", "#e482a3", "#bc6ea5", "#8d5fa5"];

const Dashboard = () => {
  const { t } = useTranslation();
  const [list] = useStoredState("inventoryV1", []);

  const categoriesOptions = t("categories", { returnObjects: true });

  return (
    <>
      <Values>
        <SingleValue
          label="Missing"
          value={list.filter(({ amount }) => +amount === 0).length}
        />
        <SingleValue label="Total" value={list.length} />
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
        label={({ dataEntry }) => dataEntry.title}
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
