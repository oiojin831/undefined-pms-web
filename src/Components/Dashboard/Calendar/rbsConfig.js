import ViewTypes from "./ViewTypes";

export default height => {
  return {
    resourceName: "Room",
    monthResourceTableWidth: 60,
    monthCellWidth: 60,
    weekResourceTableWidth: "10%",
    tableHeaderHeight: 30,
    eventItemHeight: 22,
    eventItemLineHeight: 24,
    schedulerMaxHeight: height - 170,
    views: [
      {
        viewName: "Week",
        viewType: ViewTypes.Week,
        showAgenda: false,
        isEventPerspective: false
      },
      {
        viewName: "Month",
        viewType: ViewTypes.Month,
        showAgenda: false,
        isEventPerspective: false
      }
    ]
  };
};
