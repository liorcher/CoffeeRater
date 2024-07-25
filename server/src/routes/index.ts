import { Router } from 'express';
import nutritionRoutes from './nutrition.routes'
import workoutRoutes from './workout.routes'

const router = Router();

router.use('/nutrition', nutritionRoutes)
router.use('/workout', workoutRoutes)

export default router;