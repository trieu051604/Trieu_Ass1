import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import DeleteProductButton from '@/components/DeleteProductButton';

// Helper to handle params which might be async
async function getParams(context: { params: Promise<{ id: string }> }) {
    return await context.params;
}

export default async function ProductPage(context: { params: Promise<{ id: string }> }) {
    const { id } = await getParams(context);
    const productId = parseInt(id);

    if (isNaN(productId)) {
        return notFound();
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        return notFound();
    }

    return (
        <div className="container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 dark:text-gray-400 dark:hover:text-white"
            >
                ← Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 aspect-square dark:bg-neutral-900 dark:border-neutral-800">
                    <img
                        src={product.image || 'https://placehold.co/600x400?text=No+Image'}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {product.name}
                    </h1>

                    <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="mt-6 border-t border-gray-200 py-6 dark:border-neutral-800">
                        <h3 className="sr-only">Description</h3>
                        <p className="text-base text-gray-500 dark:text-gray-400 whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-auto pt-10 flex gap-4 border-t border-gray-200 dark:border-neutral-800">
                        <Link
                            href={`/products/${product.id}/edit`}
                            className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Edit Product
                        </Link>

                        <DeleteProductButton id={product.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
