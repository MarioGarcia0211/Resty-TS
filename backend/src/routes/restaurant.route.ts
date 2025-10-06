import { Router } from "express";
import * as restaurantController from "../controllers/restaurant.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../validators/restaurant.validator";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post(
  "/",
  upload.single("logo_url"),
  validate(createRestaurantSchema),
  restaurantController.createRestaurant
);
router.get("/", restaurantController.getRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.put(
  "/:id",
  upload.single("logo_url"),
  validate(updateRestaurantSchema),
  restaurantController.updateRestaurant
);
router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
