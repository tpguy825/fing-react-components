/**
 * The library main module.
 * The module imports from different ES6 modules and re-exports them as a single library module.
 * (https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#re-exporting_aggregating)
 * In other words, one can create a single module concentrating various exports from various modules.
 */

// --------------------------------------------------------------------------------
// UI COMPONENTS
// --------------------------------------------------------------------------------
export { 
    BTN_SIZE_DEFAULT, 
    BTN_SIZE_BIG, 
    BTN_SIZE_JUMBO,
    BTN_TYPE_DEFAULT, 
    BTN_TYPE_LINK, 
    BTN_TYPE_SOFT, 
    BTN_TYPE_OUTLINE, 
    BTN_TYPE_GHOST,
    BTN_TINT_PRIMARY, 
    BTN_TINT_SECONDARY, 
    BTN_TINT_SUCCESS, 
    BTN_TINT_WARNING, 
    BTN_TINT_DANGER, 
    BTN_TINT_INFO,
    BTN_TINT_DARK, 
    BTN_TINT_LIGHT, 
    BTN_TINT_INDIGO, 
    BTN_TINT_NAVY
} from '../src/component/ActionButton';
export { default as ActionButton } from '../src/component/ActionButton';
export { default as DropdownButton } from '../src/component/DropdownButton';

export { 
    SI_SHAPE_CIRCLE, 
    SI_SHAPE_SHIELD, 
    SI_SHAPE_INFO,
    SI_STATUS_SUCCESS, 
    SI_STATUS_WARNING, 
    SI_STATUS_ERROR, 
    SI_STATUS_SYNC
} from '../src/component/icons/StatusIcon';
export { default as StatusIcon } from '../src/component/icons/StatusIcon';
export {
    RTI_FULL, 
    RTI_HALF, 
    RTI_EMPTY,
    RTI_BOLT, 
    RTI_DOT, 
    RTI_HEART, 
    RTI_STAR
} from '../src/component/icons/RatingTypeIcon';
export { default as RatingTypeIcon } from '../src/component/icons/RatingTypeIcon';

export { default as ContactTypeIcon } from '../src/component/icons/ContactTypeIcon';
export { default as DeviceTypeIcon } from '../src/component/icons/DeviceTypeIcon';
export { default as NetworkContextIcon } from '../src/component/icons/NetworkContextIcon';
export { default as GenericIcon } from '../src/component/icons/GenericIcon';
export { default as TrendIcon } from '../src/component/icons/TrendIcon';
export { default as NetworkTypeIcon } from '../src/component/icons/NetworkTypeIcon';
export {
    SC_DIM_DEFAULT,
    SC_DIM_LARGE,
    SC_DIM_SMALL
} from '../src/component/charts/SegmentedChart';
export {
    CC_ANIM_FAST,
    CC_ANIM_SLOW,
    CC_DIM_DEFAULT,
    CC_DIM_LARGE,
    CC_DIM_SMALL,
    CC_RADIUS_DEFAULT,
    CC_RADIUS_LARGE,
    CC_RADIUS_SMALL,
} from '../src/component/CircularChart';
export { default as CopyToClipboard } from '../src/component/CopyToClipboard';
export { default as CircularChart } from '../src/component/CircularChart';
export { default as InfoPanel } from '../src/component/InfoPanel';
export { default as CardPanel } from '../src/component/CardPanel';
export { default as SegmentedChart } from '../src/component/charts/SegmentedChart';
export { default as ComparisonChart } from '../src/component/charts/ComparisonChart';
export { default as EmptyState } from '../src/component/EmptyState';
export { default as PromoState } from '../src/component/PromoState';
export { default as ModalDialog } from '../src/component/ModalDialog';
export { default as SendReportDialog } from '../src/component/SendReportDialog';
export { default as TitleBar } from '../src/component/TitleBar';
export { default as RefreshButton } from '../src/component/RefreshButton';

// SUMMARY

export { default as SummaryTitle} from '../src/component/summary/SummaryTitle';
export { default as SummaryCard} from '../src/component/summary/SummaryCard';
export { default as SummaryCardBody} from '../src/component/summary/SummaryCardBody';
export { default as SummaryCardFooter} from '../src/component/summary/SummaryCardFooter';
export { default as SummaryRow} from '../src/component/summary/SummaryRow';
export { default as SummaryColLeft} from '../src/component/summary/SummaryColLeft';
export { default as SummaryColRight} from '../src/component/summary/SummaryColRight';
export { default as SummaryRowWithCards} from '../src/component/summary/SummaryRowWithCards';
export { default as SummarySection} from '../src/component/summary/SummarySection';
export { default as SummaryInternetScore} from '../src/component/summary/SummaryInternetScore';
export { default as SummarySecurityScore} from '../src/component/summary/SummarySecurityScore';

// DASHBOARD

export { default as DashboardCard} from '../src/component/dashboard/DashboardCard';
export { default as DashboardCardBody} from '../src/component/dashboard/DashboardCardBody';
export { default as DashboardCardFooter} from '../src/component/dashboard/DashboardCardFooter';
export { default as DashboardSection} from '../src/component/dashboard/DashboardSection';
export { default as DashboardRow} from '../src/component/dashboard/DashboardRow';
export { default as DashboardCol} from '../src/component/dashboard/DashboardCol';

// DETAIL

export { default as DetailSectionHeader} from '../src/component/detail/DetailSectionHeader';
export { default as DetailHeader} from '../src/component/detail/DetailHeader';
export { default as SolutionBadge} from '../src/component/detail/SolutionBadge';
export { default as DeviceDetailTable} from '../src/component/detail/DeviceDetailTable';
export { default as DeviceDetailTableRow} from '../src/component/detail/DeviceDetailTableRow';
export { default as DeviceDetailBanner} from '../src/component/detail/DeviceDetailBanner';
export { default as DetailSolution} from '../src/component/detail/DetailSolution';
export { default as DetailImage} from '../src/component/detail/DetailImage';

// TABLE CELLS
export { default as ExpandableCell} from '../src/component/cells/ExpandableCell';
export { default as TitleCell} from '../src/component/cells/TitleCell';
export { default as LinkCell} from '../src/component/cells/LinkCell';
export { default as DescriptionCell} from '../src/component/cells/DescriptionCell';
export { default as CopyTextCell} from '../src/component/cells/CopyTextCell';
export { default as BadgeCell} from '../src/component/cells/BadgeCell';
export { default as ComplexCell} from '../src/component/cells/ComplexCell';
export { default as SegmentedChartCell} from '../src/component/cells/SegmentedChartCell';

// HEADER 

export { default as Header } from '../src/component/header/Header';
export { default as HeaderLeftSide} from '../src/component/header/HeaderLeftSide';
export { default as HeaderRightSide} from '../src/component/header/HeaderRightSide';
export { default as HeaderSubSideDetail} from '../src/component/header/HeaderSubSideDetail';
export { default as HeaderSubSideAction} from '../src/component/header/HeaderSubSideAction';
export { default as HeaderTrailingSide } from '../src/component/header/HeaderTrailingSide';

export {
    ModalDialogBody,
    ModalDialogFooter,
    hideDialogById,
    showDialogById
} from '../src/component/ModalDialog';

export { default as ModalDialogInfoNote } from '../src/component/ModalDialogInfoNote';
export { default as ModalSidebar } from '../src/component/ModalSidebar';
export {
    ModalSidebarBody,
    ModalSidebarFooter,
    sidebarOptions
} from '../src/component/ModalSidebar';
export { default as MetricCard } from '../src/component/MetricCard';
export { default as NavigationBar } from '../src/component/NavigationBar';
export { default as NetworkContextPicker } from '../src/component/NetworkContextPicker';
export { default as OptionBar } from '../src/component/OptionBar';
export { default as ProgressBar } from '../src/component/ProgressBar';
export { 
    PB_SM, 
    PB_MD, 
    PB_XS,
    PB_LG,
    PB_VISIBLE_WHEN_EMPTY,
    PB_VISIBLE_ALWAYS,
    PB_VISIBLE_WHEN_FULL
} from '../src/component/ProgressBar';
export { default as SegmentedBar } from '../src/component/SegmentedBar';
export { default as StatusBadge } from '../src/component/StatusBadge';
export { default as ToolHeader } from '../src/component/ToolHeader';
export { default as DiscountRightArrow } from '../src/component/DiscountRightArrow';
export { default as SideBanner } from '../src/component/SideBanner';
export { default as Badge } from '../src/component/Badge';
export { 
    B_SM, 
    B_MD, 
    B_XS,
    BADGE_TINT_PRIMARY,
    BADGE_TINT_DISABLED,
    BADGE_TINT_PRIMARY_BORDERED,
    BADGE_TINT_DANGER,
    BADGE_TINT_DARK,
    BADGE_TINT_SUCCESS,
    BADGE_TINT_WARNING,
    BADGE_TINT_SECONDARY,
    BADGE_TINT_PINK,
    BADGE_TINT_INDIGO,
    BADGE_TINT_ORANGE
} from '../src/component/Badge';

// --------------------------------------------------------------------------------
// RATING 
// --------------------------------------------------------------------------------

export { 
    RB_SMALL, 
    RB_DEFAULT, 
    RB_LARGE, 
    RB_TINY 
} from '../src/component/RatingBar';
export { default as RatingBar } from '../src/component/RatingBar';
export { default as RatingComment } from '../src/model/RatingComment';
export { default as RatingEditDialog } from '../src/component/RatingEditDialog';

// --------------------------------------------------------------------------------
// DIAGNOSTIC HEALTH CHECK
// --------------------------------------------------------------------------------

export {default as DiagnosticEditDialog } from "../src/view/diagnostic/DiagnosticEditDialog"; 
export {default as DiagnosticHelpDialog } from "../src/view/diagnostic/DiagnosticHelpDialog"; 
export {default as DiagnosticMuteDialog } from "../src/view/diagnostic/DiagnosticMuteDialog"; 
export {default as DiagnosticShareDialog } from "../src/view/diagnostic/DiagnosticShareDialog"; 
export {default as DiagnosticReportView } from "../src/view/diagnostic/DiagnosticReportView";

// --------------------------------------------------------------------------------
// DIGITAL PRESENCE
// --------------------------------------------------------------------------------
export { 
    AVT_SIZE_MINI, 
    AVT_SIZE_SMALL, 
    AVT_SIZE_DEFAULT, 
    AVT_SIZE_BIG, 
    AVT_SIZE_JUMBO 
} from "../src/view/presence/ContactAvatar";
export {default as ContactAvatar } from "../src/view/presence/ContactAvatar";

export {default as ContactCard } from "../src/view/presence/ContactCard";
export {default as ContactTypePicker} from '../src/view/presence/ContactTypePicker';
export {default as PresenceAutoFillDialog } from "../src/view/presence/PresenceAutoFillDialog";
export {default as PresenceAutoFillTable } from "../src/view/presence/PresenceAutoFillTable";
export {default as PresenceProfileEditDialog } from "../src/view/presence/PresenceProfileEditDialog";
export {default as PresenceConfirmDeleteDialog } from "../src/view/presence/PresenceConfirmDeleteDialog";
export {default as PresenceTimeline } from "../src/view/presence/PresenceTimeline";
export {default as PresenceAvatarStrip } from "../src/view/presence/PresenceAvatarStrip";
export {default as PresenceTimelineTable } from '../src/view/presence/PresenceTimelineTable';
export {default as PresenceTimelineTableRow } from '../src/view/presence/PresenceTimelineTableRow';
// --------------------------------------------------------------------------------
// SPEED TEST
// --------------------------------------------------------------------------------
export {default as SpeedTestAchievementTable} from '../src/view/speedtest/SpeedTestAchievementTable';
export {default as SpeedTestDonuts} from '../src/view/speedtest/SpeedTestDonuts';
export {default as SpeedTestIspCard} from '../src/view/speedtest/SpeedTestIspCard';
export {default as SpeedTestPerformance} from '../src/view/speedtest/SpeedTestPerformance';
export {default as SpeedTestSentimentDistribution} from '../src/view/speedtest/SpeedTestSentimentDistribution';
export {default as SpeedTestStats} from '../src/view/speedtest/SpeedTestStats';
export {default as SpeedTestContactSupport} from '../src/view/speedtest/SpeedTestContactSupport';
// --------------------------------------------------------------------------------
// NOTIFICATIONS
// --------------------------------------------------------------------------------
export {default as NotificationTimeline} from '../src/view/notification/NotificationTimeline';
export {default as NotificationTimelineTable} from '../src/view/notification/NotificationTimelineTable';
export {default as NotificationTimelineTableRow} from '../src/view/notification/NotificationTimelineTableRow';
// --------------------------------------------------------------------------------
// NETWORK PAGE
// --------------------------------------------------------------------------------

export {default as NetEventsHeatmap} from '../src/view/network/NetEventsHeatmap';
export {default as NetworkTimeline} from '../src/view/network/NetworkTimeline';
export {default as NetworkTimelineTable} from '../src/view/network/NetworkTimelineTable';
export {default as NetworkTimelineTableRow} from '../src/view/network/NetworkTimelineTableRow';

// --------------------------------------------------------------------------------
// SECURITY PAGE
// --------------------------------------------------------------------------------

export {default as ScheduleVulnerabilityTestDialog} from '../src/view/security/ScheduleVulnerabilityTestDialog';
export {default as FindHiddenCameraCard} from '../src/view/security/FindHiddenCameraCard';
export {default as AccessPointCard} from '../src/view/security/AccessPointCard';
export {default as AutomatedVulnerabilityCard} from '../src/view/security/AutomatedVulnerabilityCard';
export {default as ManageNotificationCard} from '../src/view/security/ManageNotificationCard';
export {default as NotificationDeviceCard} from '../src/view/security/NotificationDeviceCard';
export {default as RouterVulnerabilityCard} from '../src/view/security/RouterVulnerabilityCard';
export {default as UnconfirmedDeviceCard} from '../src/view/security/UnconfirmedDeviceCard';
export {default as NotificationAutoBlockCard} from '../src/view/security/NotificationAutoBlockCard';
export {default as AccessPointDialog} from '../src/view/security/AccessPointDialog';
export {default as SecurityDeviceToggleDialog} from '../src/view/security/SecurityDeviceToggleDialog';
export {default as PremiumBadge} from '../src/view/security/PremiumBadge';
export {default as SecurityCardButton, SecurityCardButtonGroup, SCB_TYPE_PRIMARY, SCB_TYPE_SECONDARY, SCB_TYPE_WARNING} from '../src/view/security/SecurityCardButton';
export * from '../src/view/security/SecurityUtils';

// --------------------------------------------------------------------------------
// VULNERABILITY TEST PAGE
// --------------------------------------------------------------------------------

export {default as RouterSetupInfoPanel} from '../src/view/vulnerabilitytest/RouterSetupInfoPanel';
export {default as RouterPortMappingTable} from '../src/view/vulnerabilitytest/RouterPortMappingTable';
export {default as RouterDeviceInfoPanel} from '../src/view/vulnerabilitytest/RouterDeviceInfoPanel';
export {default as VulnerabilityTestTimeline} from '../src/view/vulnerabilitytest/VulnerabilityTestTimeline';
export {default as VulnerabilityTestTimelineTable} from '../src/view/vulnerabilitytest/VulnerabilityTestTimelineTable';
export {default as VulnerabilityTestTimelineTableRow} from '../src/view/vulnerabilitytest/VulnerabilityTestTimelineTableRow';

// --------------------------------------------------------------------------------
// HIDDEN CAMERAS PAGE
// --------------------------------------------------------------------------------

export {default as HiddenCameraDeviceTable} from '../src/view/hiddencamera/HiddenCameraDeviceTable';
export {default as HiddenCameraDeviceTableRow} from '../src/view/hiddencamera/HiddenCameraDeviceTableRow';
export {default as CameraTypesSummaryPanel} from '../src/view/hiddencamera/CameraTypesSummaryPanel';
// --------------------------------------------------------------------------------
// INTERNET PAGE
// --------------------------------------------------------------------------------

export {default as LastSpeedTestSection} from '../src/view/internet/LastSpeedTestSection';
export {default as CurrentNetworkScoreSection} from '../src/view/internet/CurrentNetworkScoreSection';
export {default as InternetAveragePerformanceSection} from '../src/view/internet/InternetAveragePerformanceSection';
export {default as InternetLastSpeedTestSection} from '../src/view/internet/InternetLastSpeedTestSection';
export {default as InternetScoreBoard} from '../src/view/internet/InternetScoreBoard';
export {default as InternetScoreSection} from '../src/view/internet/InternetScoreSection';
//export {default as InternetSetupSection} from '../src/view/internet/InternetSetupSection';
export {default as InternetTimeline} from '../src/view/internet/InternetTimeline';
export {default as InternetTimelineTable} from '../src/view/internet/InternetTimelineTable';
export {default as InternetTimelineTableRow} from '../src/view/internet/InternetTimelineTableRow';
export {default as InternetTrendSection} from '../src/view/internet/InternetTrendSection';
export {default as ScheduleHoursDialog} from '../src/component/ScheduleHoursDialog';
export {default as DailySpeedHistoryChart} from '../src/view/internet/DailySpeedHistoryChart';

// --------------------------------------------------------------------------------
// TOOL PAGE 
// --------------------------------------------------------------------------------

export {default as ToolSection} from '../src/view/tools/ToolSection';
export {default as ToolCard} from '../src/view/tools/ToolCard';
export {default as ToolCardAlternative} from '../src/view/tools/ToolCardAlternative';
export {default as ToolCardColored} from '../src/view/tools/ToolCardColored';
export {default as ToolCardHorizontal} from '../src/view/tools/ToolCardHorizontal';
export {default as ToolCardLargeIcon} from '../src/view/tools/ToolCardLargeIcon';
export {default as ToolCardSmall} from '../src/view/tools/ToolCardSmall';
export {default as LinkCard} from '../src/view/tools/LinkCard';
export {default as ToolIcon} from '../src/component/icons/ToolIcon';
// --------------------------------------------------------------------------------
// DEVICE DETAIL
// --------------------------------------------------------------------------------
export {default as ClearDeviceDialog} from '../src/view/devicedetail/dialogs/ClearDeviceDialog';
export {default as DeviceDetailIconPickerDialog} from '../src/view/devicedetail/dialogs/DeviceDetailIconPickerDialog';
export {default as EditDeviceDialog} from '../src/view/devicedetail/dialogs/EditDeviceDialog';
export {default as WakeOnLanDialog} from '../src/view/devicedetail/dialogs/WakeOnLanDialog';

export {default as FeedbackBanner} from '../src/view/devicedetail/banners/FeedbackBanner';
export {default as ChooseModelBanner} from '../src/view/devicedetail/banners/ChooseModelBanner';
export {default as RevertBanner} from '../src/view/devicedetail/banners/RevertBanner';

export {default as ClickToScrollBar} from '../src/view/devicedetail/ClickToScrollBar';
export {default as DeviceDetailHeader} from '../src/view/devicedetail/DeviceDetailHeader';
export {default as EmptyStateSection} from '../src/view/devicedetail/EmptyStateSection';
export {default as NotificationCard} from '../src/view/devicedetail/NotificationCard';

// --------------------------------------------------------------------------------
// MODEL
// --------------------------------------------------------------------------------

export * from "../src/model/Constants";
export {default as Contact} from "../src/model/Contact";
export {newContactWithId} from "../src/model/Contact";
export {default as NetNode} from "../src/model/NetNode";
export {default as NetEvent} from "../src/model/NetEvent";
export {NetEventChangeState, NetEventDeviceBlock} from "../src/model/NetEvent";
export {default as DeviceRecognition} from "../src/model/DeviceRecognition";

// --------------------------------------------------------------------------------
// CONVERSION LOGIC
// --------------------------------------------------------------------------------

export * from "../src/view/diagnostic/DiagnosticLogic";
export * from "../src/view/presence/PresenceLogic";
export * from "../src/view/speedtest/SpeedTestLogic";
export * from '../src/view/internet/InternetPerformanceLogic';
export * from "../src/view/vulnerabilitytest/VulnerabilityTestLogic";
export * from "../src/view/hiddencamera/HiddenCameraLogic";

// --------------------------------------------------------------------------------
// HELPERS
// --------------------------------------------------------------------------------
export * from "../src/helpers/WIFIRadioSignalHelper";
export * from "../src/helpers/DateHelper";
export * from "../src/helpers/RecogHelper";
export * from "../src/helpers/ExponentialMovingAverage";
export * from "../src/helpers/GeoCountriesHelper";
export * from "../src/helpers/JsonHelper";
export * from "../src/helpers/NetworkHelper";
export * from "../src/helpers/LocaleHelper";
export * from "../src/helpers/ContactTypeHelper";
export * from "../src/helpers/MathHelper";
export * from "../src/helpers/TableHelper";

// --------------------------------------------------------------------------------
// IN-APP MESSAGING
// --------------------------------------------------------------------------------

export { default as IAMManager } from "../src/model/iam/IAMManager";
export { default as IAMDialog } from "../src/component/IAMDialog";

// --------------------------------------------------------------------------------
// INTL COMPONENTS
// --------------------------------------------------------------------------------

export { default as AnchorResponder } from "../src/component/intl/AnchorResponder";
export { default as ActiveIntl } from "../src/component/intl/ActiveIntl";