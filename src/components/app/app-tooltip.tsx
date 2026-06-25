import type { ComponentProps, ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AppTooltipProviderProps = Readonly<ComponentProps<typeof TooltipProvider>>;

type AppTooltipProps = Readonly<{
  children: ReactNode;
  label: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
}>;

function AppTooltipProvider(props: AppTooltipProviderProps) {
  return <TooltipProvider delayDuration={250} {...props} />;
}

function AppTooltip({ children, label, side = "bottom" }: AppTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  );
}

export { AppTooltip, AppTooltipProvider };
