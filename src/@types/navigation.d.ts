import { BottomTabParams } from "../routes/home.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomTabParams {}
  }
}
