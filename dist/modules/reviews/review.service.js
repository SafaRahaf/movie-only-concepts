"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const movie_model_1 = require("../movies/movie.model");
const review_model_1 = require("./review.model");
const addReview = (slug, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield movie_model_1.Movie.startSession();
    const movie = yield movie_model_1.Movie.findOne({ slug });
    if (!movie) {
        throw new Error("Movie not found");
    }
    try {
        session.startTransaction();
        const review = yield review_model_1.Review.create([
            Object.assign({ movie: movie._id }, reviewData),
        ], { session });
        const reviewsCount = yield review_model_1.Review.countDocuments({
            movie: movie._id,
        }).session(session);
        // throw new Error("Movie not found");
        yield movie_model_1.Movie.updateOne({ slug }, { totalRating: reviewsCount }, { session });
        yield session.commitTransaction();
        return review[0];
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        throw error;
    }
    session.endSession();
});
exports.ReviewServices = {
    addReview,
    //   getAllReviews,
    //   getReviewById
    //   updateReview,
    //   deleteReview,
};
