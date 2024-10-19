import { Box, Tab, Tabs } from "@mui/material";
import { useCreateTransactionState } from ".";
import { IVisualizeTransactions } from "./types";
import { useEffect, useState } from "react";
import { TabPanel } from "..";
import { BarChart, PieChart } from "@mui/x-charts";

const VisualizeTransactions = ({ spaceId }: IVisualizeTransactions) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    transactions,
    transactionTypes,
  } = useCreateTransactionState({
    spaceId: spaceId,
  });

  const [barChartData, setBarChartData] = useState<{ xData: string[]; seriesData: number[] }>({
    xData: [],
    seriesData: [],
  });

  const [pieChartData, setPieChartData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    if (transactionTypes && transactions) {
      const xData = transactionTypes.map((transactionType) => transactionType.value);

      const seriesData = transactionTypes.map((transactionType) =>
        transactions
          .filter((transaction) => transaction.type.id === transactionType.id)
          .reduce((acc, transaction) => acc + Number(transaction.amount), 0)
      );

      setBarChartData({
        xData,
        seriesData,
      });

      const pieData = transactionTypes.map((transactionType) => ({
        label: transactionType.value,
        value: transactions
          .filter((transaction) => transaction.type.id === transactionType.id)
          .reduce((acc, transaction) => acc + Number(transaction.amount), 0),
      }));

      setPieChartData(pieData);
    }
  }, [transactionTypes, transactions]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        minHeight: '100%',
        height: '100%',
        minWidth: '100%',
        width: '100%',
        maxWidth: '100%',
        paddingX: '1rem',
        paddingY: '1rem',
        flexGrow: 1,
      }}
    >
      {
        (transactionTypes && transactions) && (
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              minWidth: '100%',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <Tab label="Bar Chart" />
            <Tab label="Pie Chart" />
          </Tabs>
        )
      }
      {
        ["BarChart", "PieChart"].map((chartType, index) => (
          <TabPanel
            key={`tab-panel-${index}-${chartType}`}
            value={value}
            index={index}
          >
            {
              chartType === "BarChart" && (
                <BarChart
                  xAxis={[{ scaleType: "band", data: barChartData.xData }]}
                  series={[{ data: barChartData.seriesData }]}
                />
              )
            }
            {
              chartType === "PieChart" && (
                <PieChart
                  series={[
                    {
                      data: pieChartData,
                    },
                  ]}
                />
              )
            }
          </TabPanel>
        ))
      }
    </Box>
  );
};

export default VisualizeTransactions;