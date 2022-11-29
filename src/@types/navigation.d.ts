import { MainRoutesParams } from "@routes/index";
import { SignInRouterParams } from "@routes/signIn.routes";
import { HomeRoutesParams } from "../routes/home.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends MainRoutesParams,
        HomeRoutesParams,
        SignInRouterParams {}
  }
}
