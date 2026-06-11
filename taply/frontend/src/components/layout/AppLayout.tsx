import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-6 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
