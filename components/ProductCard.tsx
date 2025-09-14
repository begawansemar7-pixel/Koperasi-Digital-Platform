
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { StarIcon, ShoppingCartIcon } from './Icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // In a real app, you'd dispatch an action to add to cart
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <Link to={`/marketplace/${product.id}`} className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-primary font-semibold px-2 py-1 rounded-full text-xs">
          {product.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-primary">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">oleh {product.seller}</p>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <StarIcon className="w-5 h-5 text-amber-400" />
          <span className="ml-1 font-bold">{product.rating}</span>
          <span className="ml-2 text-gray-400">({product.reviews} ulasan)</span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-primary">
            Rp{product.price.toLocaleString('id-ID')}
          </p>
          <button 
            onClick={handleAddToCart}
            className="bg-primary-50 text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300 z-10"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
