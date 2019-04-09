import ViewTypes from './ViewTypes'

export default {
  resourceName: 'Room',
  monthResourceTableWidth: 70,
  monthCellWidth: 120,
  views: [
    {
      viewName: 'Week',
      viewType: ViewTypes.Week,
      showAgenda: false,
      isEventPerspective: false,
    },
    {
      viewName: 'Month',
      viewType: ViewTypes.Month,
      showAgenda: false,
      isEventPerspective: false,
    },
  ],
}
