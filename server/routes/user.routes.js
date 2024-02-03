import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { updateUser, userData } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/user', verifyToken, userData)
router.post('/user/update', verifyToken, updateUser)

export default router