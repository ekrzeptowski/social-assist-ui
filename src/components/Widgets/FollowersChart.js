import React, { memo } from "react";
import {
  Paper,
} from "@material-ui/core";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import { format } from "date-fns";

export default memo(function FollowersChart({
  followersHistory,
  // followersChange,
  children,
  ...props
}) {
  return (
    <Paper {...props}>
      <ResponsiveContainer>
        <AreaChart
          // width={400} height={300}
          data={followersHistory}
        >
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
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
      {children}
    </Paper>
  );
});
