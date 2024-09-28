import BaseLayout from "@/layouts/BaseLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
// import { BlogPage } from "@/pages/Blog/BlogPage";
import Homepage from "@/pages/Homepage/Homepage";
// import HomepageDataLoader from "@/pages/Homepage/HomepageDataLoader";
import HomepageError from "@/pages/Homepage/HomepageError";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy/PrivacyPolicyPage";
import WalletPage from "@/pages/Wallet/WalletPage";
import type { RouteObject } from "react-router-dom";

const baseRoutes = [
  {
    path: "/",
    element: <Homepage />,
    // loader: HomepageDataLoader,
    errorElement: <HomepageError />,
  },
  {
    path: "/privacy-policy",
    element: (
      <BaseLayout>
        <PrivacyPolicyPage />
      </BaseLayout>
    ),
    errorElement: <HomepageError />,
  },
  {
    path: "/wallet",
    element: (
      <ProtectedLayout>
        <WalletPage />
      </ProtectedLayout>
    ),
  },
] satisfies RouteObject[];

export default baseRoutes;
