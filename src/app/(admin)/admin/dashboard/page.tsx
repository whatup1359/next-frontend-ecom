import Dashboard from "@/components/admin/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "แดชบอร์ด | ร้านค้าออนไลน์",
  description: "ระบบจัดการร้านค้าออนไลน์สำหรับผู้ดูแลระบบ"
}

const DashboardPage = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};
export default DashboardPage;
