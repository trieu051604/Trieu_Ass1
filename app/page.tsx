import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Latest Collection
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Discover our premium selection of clothing.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">No products found</h2>
          <p className="mt-2 text-gray-500">Get started by adding some products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
