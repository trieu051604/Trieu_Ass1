import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                        LuxeWear
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Home
                    </Link>
                    <Link
                        href="/products/create"
                        className="text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Add Product
                    </Link>
                </div>
            </div>
        </nav>
    );
}
