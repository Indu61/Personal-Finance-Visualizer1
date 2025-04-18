"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavBar() {
  const router = useRouter();

  const handleTransactionsClick = () => {
    router.push("/TransactionList");
  };

  const handleDashboardClick = () => {
    router.push("/Dashboard");
  };

  const handleBugetsClick = () => {
    router.push("/BudgetList");
  };

  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              onClick={handleDashboardClick}
              className={navigationMenuTriggerStyle()}
            >
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              onClick={handleTransactionsClick}
              className={navigationMenuTriggerStyle()}
            >
              Transactions
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              onClick={handleBugetsClick}
              className={navigationMenuTriggerStyle()}
            >
              Budgets
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const navigationMenuTriggerStyle = () =>
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 h-10 py-2 px-4 group w-max";
