import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper to handle params which might be async
async function getParams(context: { params: Promise<{ id: string }> }) {
    return await context.params;
}

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await getParams(context);
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await getParams(context);
        const body = await request.json();
        const { name, description, price, image } = body;

        const product = await prisma.product.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                description,
                price: parseFloat(price),
                image,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await getParams(context);
        await prisma.product.delete({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
    }
}
