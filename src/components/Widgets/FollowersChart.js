import React, { memo } from "react";
import { Paper, useTheme } from "@material-ui/core";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { format } from "date-fns";
import useCardStyles from "./styles";
// import { DragHandle } from "./DragHandle";

export default memo(function FollowersChart({
  followersHistory,
  children,
  ...props
}) {
  const classes = useCardStyles();
  const theme = useTheme();

  return (
    <Paper {...props} className={classes.cardContent}>
      <ResponsiveContainer>
        <AreaChart data={followersHistory}>
          <XAxis
            dataKey="timestamp"
            scale="time"
            domain={["dataMin", "dataMax"]}
            type="number"
            tickFormatter={(date) => format(new Date(date * 1000), "M/d")}
          ></XAxis>
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip
            labelFormatter={(label) =>
              format(new Date(label * 1000), "yyyy/M/d")
            }
          />
          <Area
            type="monotone"
            dataKey={"followers"}
            stroke={theme.palette.primary.main}
            // fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* <DragHandle/> */}
      {children}
    </Paper>
  );
});
