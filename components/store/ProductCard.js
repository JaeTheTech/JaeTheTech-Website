import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-500">
            ${product.price.toFixed(2)}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            onClick={() => {
              // Add to cart functionality
              console.log('Added to cart:', product.name);
            }}
          >
            <FaShoppingCart />
            Add to Cart
          </motion.button>
        </div>
      </div>

      <Link
        href={`/store/product/${product.id}`}
        className="block py-3 text-center text-sm text-purple-500 hover:text-purple-600 border-t border-gray-200 dark:border-gray-700"
      >
        View Details
      </Link>
    </motion.div>
  );
}