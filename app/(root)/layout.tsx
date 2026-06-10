import { Navbar } from "@/components/web/Navbar";
import { Footer } from "@/components/web/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}