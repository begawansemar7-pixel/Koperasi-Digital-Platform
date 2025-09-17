
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_COMMENTS, MOCK_USER } from '../constants';
import { StarIcon, ShoppingCartIcon, ArrowLeftIcon } from '../components/Icons';
import type { Comment } from '../types';

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const product = MOCK_PRODUCTS.find(p => p.id === productId);

    const [comments, setComments] = useState<Comment[]>(
        MOCK_COMMENTS.filter(c => c.productId === productId)
    );
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentToAdd: Comment = {
            id: `CMT${Date.now()}`,
            productId: productId!,
            authorName: MOCK_USER.name,
            authorAvatar: MOCK_USER.avatarUrl,
            text: newComment,
            date: new Date().toISOString().split('T')[0],
        };

        setComments(prevComments => [commentToAdd, ...prevComments]);
        setNewComment('');
    };
    
    if (!product) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold">Produk Tidak Ditemukan</h2>
                <Link to="/marketplace" className="text-primary hover:underline mt-4 inline-block">Kembali ke Marketplace</Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Link to="/marketplace" className="inline-flex items-center text-primary hover:underline">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Kembali ke Marketplace
            </Link>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-primary">{product.category}</span>
                        <h1 className="text-4xl font-bold text-gray-800 mt-1">{product.name}</h1>
                        <p className="text-md text-gray-500 mt-2">oleh {product.seller}</p>
                        <div className="flex items-center text-sm text-gray-600 my-4">
                            <StarIcon className="w-5 h-5 text-amber-400" />
                            <span className="ml-1 font-bold">{product.rating}</span>
                            <span className="ml-2 text-gray-400">({product.reviews} ulasan)</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        
                        <div className="mt-auto pt-6">
                            <p className="text-3xl font-bold text-primary mb-4">
                                Rp{product.price.toLocaleString('id-ID')}
                            </p>
                            <button className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                                <ShoppingCartIcon className="w-6 h-6 mr-2" />
                                Tambah ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ulasan & Komentar ({comments.length})</h2>
                
                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="flex items-start space-x-4">
                        <img src={MOCK_USER.avatarUrl} alt="Your avatar" className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                             <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={3}
                                placeholder="Tulis komentar Anda di sini..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-gray-900"
                            ></textarea>
                            <button type="submit" className="mt-2 px-5 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors">
                                Kirim Komentar
                            </button>
                        </div>
                    </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-start space-x-4">
                            <img src={comment.authorAvatar} alt={comment.authorName} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-gray-800">{comment.authorName}</p>
                                        <p className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <p className="text-gray-700 mt-2">{comment.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;