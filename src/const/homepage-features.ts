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
        title: "ユーザーガイド",
        link: "/guide",
    },
    {
        icon: "CircleHelp",
        title: "よくある質問",
        link: "/faq",
    },
    {
        icon: "MessagesSquare",
        title: "お問い合わせ",
        link: "/contact-support",
    },
];