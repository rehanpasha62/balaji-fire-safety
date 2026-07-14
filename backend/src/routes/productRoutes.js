import express from 'express';
import { 
  getProducts, 
  getProductById, 
  getProductsByCategory,
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Protected routes (Admin only)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
