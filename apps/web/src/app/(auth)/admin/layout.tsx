import { DashboardRootView } from "@ui/views/dashboard/root/view";
import { ModeToggle } from "@/components/mode-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardRootView modeToggle={<ModeToggle />}>
      {children}
    </DashboardRootView>
  );
}
