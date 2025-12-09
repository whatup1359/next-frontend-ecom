import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // การดึง path ของ URL ที่ร้องขอ
  const { pathname } = request.nextUrl;

  console.log(`Middleware: ${pathname}`);

  // ตรวจสอบ protected routes
  const isProtectedAdminRoute =
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/auth/signin") &&
    !pathname.startsWith("/auth/signup") &&
    !pathname.startsWith("/auth/forgotpassword");

  // ถ้าไม่ใช่ protected route ให้ข้าม middleware
  if (!isProtectedAdminRoute) {
    return NextResponse.next();
  }

  // ตรวจสอบ cookies สำหรับ authToken
  const authToken = request.cookies.get("authToken")?.value;
  const userCookie = request.cookies.get("userData")?.value;

  // Debug loggin the authToken and userCookie
  console.log(`Auth check - Token: ${!!authToken}, User: ${!!userCookie}`);

  // ถ้าไม่มี authentication ให้ redirect ไป login
  if (!authToken || !userCookie) {
    const loginUrl = new URL("/auth/signin", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    loginUrl.searchParams.set(
      "message",
      "กรุณาเข้าสู่ระบบเพื่อเข้าถึงระบบจัดการ"
    );

    return NextResponse.redirect(loginUrl);
  }

  // ตรวจสอบ role สำหรับ admin routes
  if (isProtectedAdminRoute) {
    try {
      const userData = JSON.parse(userCookie);
      const userRole = userData?.role?.name;

      console.log(`User role: ${userRole}`);

      // ถ้าไม่ใช่ admin ให้ redirect ไปหน้าแรก
      if (userRole !== "admin") {
        console.log(`Access denied for role: ${userRole}`);

        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("message", "คุณไม่มีสิทธิ์เข้าถึงระบบจัดการ");

        return NextResponse.redirect(homeUrl);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);

      // ถ้า parse ไม่ได้ให้ไป login ใหม่
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("returnUrl", pathname);
      loginUrl.searchParams.set(
        "message",
        "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่"
      );

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }
}

// กำหนด matcher ให้ชัดเจน เพื่อให้ middleware ทำงานเฉพาะกับ admin routes
// สามารถปรับแต่งได้ตามต้องการ เช่น เฉพาะ /admin หรือ
// เฉพาะ /admin/dashboard หรือ /admin/products เป็นต้น
// ในที่นี้จะทำงานกับทุกเส้นทางที่ขึ้นต้นด้วย /admin
export const config = {
  // matcher: ["/admin/:patch*"],
  matcher: [
    "/admin/dashboard/:patch*",
    "/admin/products/:patch*",
    "/admin/categories/:patch*",
    "/admin/orders/:patch*",
    "/admin/users/:patch*",
    "/admin/payments/:patch*",
    "/admin/reports/:patch*",
    "/admin/settings/:patch*",
    "/admin/profile/:patch*",
  ],
};
