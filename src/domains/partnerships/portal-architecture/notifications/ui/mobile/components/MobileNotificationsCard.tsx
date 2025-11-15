import { NotificationsMenu, type NotificationsMenuItem } from "@/components/ui/notifications-menu";

interface MobileNotificationsCardProps {
  items: NotificationsMenuItem[];
}

export function MobileNotificationsCard({ items }: MobileNotificationsCardProps) {
  return <NotificationsMenu items={items} className="w-full" />;
}
