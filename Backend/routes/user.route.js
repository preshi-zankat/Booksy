import express from 'express';
const router = express.Router();
import {signup,login,logout,getUserProfile,updateUserProfile,deleteUserProfile} from '../controllers/user.controller.js'
import { verifyJwt } from '../middleware/Authentication.js';


router.post('/signup', signup);
router.post('/login', verifyJwt,login);
router.post('/logout',verifyJwt, logout);
router.get('/profile',verifyJwt, getUserProfile);
router.put('/profile',verifyJwt, updateUserProfile);
router.delete('/profile',verifyJwt, deleteUserProfile);
export default router;