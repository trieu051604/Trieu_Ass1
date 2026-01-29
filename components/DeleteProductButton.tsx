'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteProductButton({ id }: { id: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.push('/');
                router.refresh();
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
        >
            {loading ? 'Deleting...' : 'Delete Product'}
        </button>
    );
}
