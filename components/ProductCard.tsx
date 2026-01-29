import Link from 'next/link';
import { Product } from '@prisma/client';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`} className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg dark:bg-neutral-900 dark:border-neutral-800">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-100">
                <img
                    src={product.image || 'https://placehold.co/600x400?text=No+Image'}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>

            <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-1">
                    {product.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                    {product.description}
                </p>

                <p className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                </p>
            </div>
        </Link>
    );
}
