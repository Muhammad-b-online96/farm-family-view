
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
  accentColor?: string; // e.g., 'border-business-honey-DEFAULT'
}

export const SummaryCard = ({ title, value, icon: Icon, description, className, accentColor }: SummaryCardProps) => {
  return (
    <Card className={cn("shadow-sm", className, accentColor && `border-l-4 ${accentColor}`)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};
