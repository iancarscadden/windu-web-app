import Background from "../components/Background";
import Link from "next/link";

export default function Home() {
  return (
    <Background>
      <div className="min-h-screen">
        <nav className="px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-white/30 dark:bg-black/20 sticky top-0 z-10">
          <div className="font-bold text-xl">Windu</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link href="/background-demo" className="hover:text-blue-600 transition-colors font-medium">Demo</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link href="#" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">Contact</Link>
          </div>
        </nav>
      </div>
    </Background>
  );
}
