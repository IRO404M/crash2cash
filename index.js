// Adding Hero Section on Home Page
// pages/index.js
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="container">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
        <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400">Crash2Cash</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Buy and Sell Used & Damaged Cars with Live Auctions</p>
        <div className="mt-6">
          <Link href="/auctions">
            <a className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Browse Auctions</a>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
