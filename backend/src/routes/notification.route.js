import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getNotification, deleteNotification} from "../controllers/notification.controller.js"

const router = express.Router();

router.get('/', protectRoute, getNotification);
router.get('/:notificationId', protectRoute, deleteNotification);

export default router;