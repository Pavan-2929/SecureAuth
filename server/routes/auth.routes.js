import express from 'express'
import { deleteUser, google, login, logout, register } from '../controllers/auth.controller.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', verifyToken ,logout)
router.post('/google', google)
router.delete('/delete', verifyToken, deleteUser)

export default router