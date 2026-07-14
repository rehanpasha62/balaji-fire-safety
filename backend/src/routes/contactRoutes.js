import express from 'express';
import { 
  submitContact, 
  getAllContacts, 
  getContactById, 
  updateContactStatus, 
  deleteContact 
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Protected routes (Admin only)
router.get('/', protect, getAllContacts);
router.get('/:id', protect, getContactById);
router.put('/:id', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

export default router;
