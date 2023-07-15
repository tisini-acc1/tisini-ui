import BaseLayout from "@/layouts/BaseLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Organizationspage from "@/pages/Organizations/Organizationspage";
import QuestionSetsPage from "@/pages/QuestionSets/QuestionSetsPage";
import QuizPrePlayPage from "@/pages/QuizPrePlay/QuizPrePlayPage";
import { Outlet, type RouteObject } from "react-router-dom";

const organizationRoutes = {
  path: "/organizations",
  element: (
    <BaseLayout>
      <ProtectedLayout>
        <Outlet />
      </ProtectedLayout>
    </BaseLayout>
  ),
  children: [
    {
      path: "/organizations",
      index: true,
      element: <Organizationspage />,
    },
    {
      // TODO: Add a route for the organization page
      path: "/organizations/:organizationId",
      element: <QuestionSetsPage />,
      children: [],
    },
    {
      // TODO: Add a route for the single question set page
      path: "/organizations/:organizationId/question-sets/:questionSetId",
      element: <QuizPrePlayPage />,
      children: [],
    },
  ],
} satisfies RouteObject;

export default organizationRoutes;
