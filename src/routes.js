import React from "react";
//layouts
import PublicLayout from "./layout/Public";
// pages
import Reset from "./pages/reset";
import Home from "./pages/home";
import Jobs from "./pages/jobs";
import Network from "./pages/network";
import NotFound from "./components/not-found";

const routes = [
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "reset/:token", element: <Reset /> },
            { path: "/jobs", element: <Jobs /> },
            { path: "/network", element: <Network /> },
        ],
    },
    {
        path: "*",
        element: <PublicLayout />,
        children: [{ path: "*", element: <NotFound /> }],
    },
];

export default routes;
