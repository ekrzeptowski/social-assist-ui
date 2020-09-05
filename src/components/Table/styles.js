import { grey } from "@material-ui/core/colors";

const { makeStyles } = require("@material-ui/core");

const useTableStyles = makeStyles({
  avatar: {
    paddingRight: 0,
    width: 40,
  },
  followers: {
    width: 60,
  },
  unfollowDate: {
    width: 170,
  },
  suspended: {
    color: grey[500],
  },
  nestedCell: {
    marginRight: 10,
  },
  sortBy: {
    minWidth: 100,
    "& > div": {
      paddingRight: "0 !important",
    },
  },
  tablePagination: {
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
});

export default useTableStyles;
