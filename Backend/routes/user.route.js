import express from 'express';
const router = express.Router();
import {signup,login,logout,getUserProfile,updateUserProfile,deleteUserProfile} from '../controllers/user.controller.js'
import { verifyJwt } from '../middleware/Authentication.js';
import upload from '../middleware/multer.js';
 

router.post('/signup',upload.single('image'), signup);
router.post('/login', verifyJwt,login);
router.post('/logout',verifyJwt, logout);
router.get('/profile',verifyJwt, getUserProfile);
router.put('/profile',upload.single('image'),verifyJwt, updateUserProfile);
router.delete('/profile',verifyJwt, deleteUserProfile);
export default router;