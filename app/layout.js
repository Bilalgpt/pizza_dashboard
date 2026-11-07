import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export const metadata = {
  title: "WhatsApp Growth · Customer Database",
  description:
    "Demo dashboard for a WhatsApp marketing & customer-database growth system for pizza / fast-food brands.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen bg-surface-base">
          {/* ambient mesh + grid backdrop */}
          <div className="pointer-events-none fixed inset-0 bg-mesh opacity-80" />
          <div className="pointer-events-none fixed inset-x-0 top-0 h-[520px] grid-floor opacity-60" />

          <div className="relative flex min-h-screen">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <Topbar />
              <main className="flex-1 px-5 pb-16 pt-6 sm:px-8">
                <div className="mx-auto w-full max-w-[1400px]">{children}</div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
