import { Badge } from "./ui/badge";

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'active' | 'accepted' | 'awaiting' | 'liquidated' | 'expired';
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'active':
        return 'bg-accent text-accent-foreground border-accent';
      case 'accepted':
        return 'bg-primary text-primary-foreground border-primary';
      case 'awaiting':
        return 'bg-warning text-warning-foreground border-warning';
      case 'liquidated':
        return 'bg-error text-error-foreground border-error';
      case 'expired':
        return 'bg-neutral-medium text-white border-neutral-medium';
      default:
        return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  return (
    <Badge 
      className={`text-caption px-3 py-1 rounded-full border ${getVariantClasses(variant || 'default')}`}
    >
      {status}
    </Badge>
  );
}