import { MainRoutesParams } from "@routes/index";
import { AuthRouterParams } from "@routes/auth.routes";
import { HomeRoutesParams } from "@routes/home.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends MainRoutesParams,
        MainRoutesParams,
        HomeRoutesParams,
        AuthRouterParams {}
  }
}
