import { Box } from "@mui/material";
import LandingPage from "../pages/LandingPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsCondition from "../pages/TermsCondition";
import ServerMaintenance from '../pages/ServerMaintenance';

const appRouter = [
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
    },
    {
        path: '/terms-and-conditions',
        element: <TermsCondition />
    }
]

export default appRouter;
