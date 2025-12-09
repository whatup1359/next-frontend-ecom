import ProfileComponent from "@/components/admin/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "โปรไฟล์ | ร้านค้าออนไลน์",
  description: "หน้าจัดการโปรไฟล์ผู้ใช้งานสำหรับผู้ดูแลระบบ",
};

const ProfilePage = () => {
  return (
    <>
      <ProfileComponent />
    </>
  );
};
export default ProfilePage;
