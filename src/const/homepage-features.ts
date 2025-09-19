import { BookOpenText, CircleHelp, MessagesSquare } from "lucide-react";

export const iconMap = {
    BookOpenText,
    CircleHelp,
    MessagesSquare,
};

export type IconKey = keyof typeof iconMap;

export type HomepageFeature = {
    icon: IconKey; // Restrict to keys of iconMap
    title: string;
    link: string;
};

export const homepageFeatures: HomepageFeature[] = [
    {
        icon: "BookOpenText",
        title: "guide",
        link: "/guide",
    },
    {
        icon: "CircleHelp",
        title: "faq",
        link: "/faq",
    },
    {
        icon: "MessagesSquare",
        title: "contact-us",
        link: "/contact-support",
    },
];