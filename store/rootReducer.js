import layout from "./layoutReducer";
import auth from "@/components/partials/auth/store";
import calendar from "@/components/partials/app/calendar/store";

const rootReducer = {
  layout,
  auth,
  calendar,
};
export default rootReducer;
