import { useNavItems } from "@/hooks/useNavItems";
import { usePathname } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function HeaderNav() {
    const { navItems, loading, error } = useNavItems();
    const pathname = usePathname();

    if (loading || error) return null;

    if (
        pathname === "/" ||
        pathname === "/search" ||
        pathname.startsWith("/guide") ||
        pathname.startsWith("/category")
    ) {
        return null;
    }

    return (
        <div className="hidden md:flex w-full justify-end gap-4">
            <NavigationMenu>
                <NavigationMenuList>
                    {navItems.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            {item.items ? (
                                <>
                                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-4">
                                            {item.items.map((subItem) => (
                                                <li key={subItem.url}>
                                                    <Link href={subItem.url}>{subItem.title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <Link href={item.url || "#"} legacyBehavior passHref>
                                    <NavigationMenuLink>{item.title}</NavigationMenuLink>
                                </Link>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}