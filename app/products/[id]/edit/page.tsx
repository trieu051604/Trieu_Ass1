import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductForm from '@/components/ProductForm';

// Helper to handle params which might be async
async function getParams(context: { params: Promise<{ id: string }> }) {
    return await context.params;
}

export default async function EditProductPage(context: { params: Promise<{ id: string }> }) {
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

    return <ProductForm initialData={product} />;
}
