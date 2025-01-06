"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import {Signature} from "lucide-react";
import {usePathname} from "next/navigation";

type NavItem = {
    title: string;
    url?: string;
    items?: { title: string; url: string; description?: string }[];
};

const navMainData: NavItem[] = [
    {
        title: "User Guides",
        items: [],
    },
    {
        title: "FAQs",
        url: "/faq",
    },
    {
        title: "Contact",
        url: "/contact",
    },
];

export default function HeaderNav() {
    const categories = useCategories();
    const pathname = usePathname();

    // Populate the "User Guides" menu with categories and descriptions
    const navMain = navMainData.map((item) => {
        if (item.title === "User Guides") {
            return {
                ...item,
                items: categories.map((category) => ({
                    title: category.name,
                    url: `/user-guide/category/${category.slug}`,
                    description: category.description || "No description available.",
                })),
            };
        }
        return item;
    });

    if (pathname === "/" || pathname === "/search" || pathname === "/user-guide") return null;

    return (
        <div className="hidden md:flex w-full justify-end gap-4">
            <NavigationMenu>
                <NavigationMenuList>
                    {navMain.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            {item.items && item.items.length > 0 ? (
                                <>
                                    <NavigationMenuTrigger className="text-md bg-transparent dark:bg-transparent">{item.title}</NavigationMenuTrigger>
                                    <NavigationMenuContent
                                        className="md:w-[300px] lg:w-[350px] overflow-auto bg-gray-50 dark:bg-darkbg"
                                    >
                                        <ul className="grid gap-3 p-4 lg:grid-cols-[.75fr_1fr] bg-gray50 dark:bg-darkbg">
                                            <li className="row-span-3">
                                                <Link
                                                    href="/"
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                >
                                                    <div className="flex items-center mb-4">
                                                        <Signature size={64}/>
                                                    </div>
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            Welcome
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Learn how to get started with our platform and tools.
                                                        </p>
                                                </Link>
                                            </li>
                                            {item.items.map((subItem) => (
                                                <ListItem
                                                    key={subItem.title}
                                                    href={subItem.url || "#"}
                                                    title={subItem.title}
                                                >
                                                    {subItem.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <Link href={item.url || "#"} legacyBehavior passHref>
                                    <NavigationMenuLink className="px-4 py-2 text-md font-medium hover:underline">
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
    <li>
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
                {...props}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    </li>
));
ListItem.displayName = "ListItem";