"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRoutes = void 0;
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("./movie.controller");
const review_controller_1 = require("../reviews/review.controller");
const validateRequest_1 = __importDefault(require("../../middlewere/validateRequest"));
const review_validation_1 = require("../reviews/review.validation");
const router = express_1.default.Router();
router.post("/", 
// validateRequest(MovieValidation.createMovieZodSchema),
movie_controller_1.MovieControllers.createMovie);
router.get("/:slug", movie_controller_1.MovieControllers.getMovieBySlug);
router.get("/", movie_controller_1.MovieControllers.getAllMovies);
router.post("/:slug/review", (0, validateRequest_1.default)(review_validation_1.ReviewValidation.addReviewSchema), review_controller_1.ReviewControllers.addReview);
// router.get("/:slug/reviews", ReviewControllers.getAllReviews);
// router.put("/:slug/review", ReviewControllers.getReviewById);
// router.delete("/:slug/review", ReviewControllers.deleteReview);
exports.MovieRoutes = router;
