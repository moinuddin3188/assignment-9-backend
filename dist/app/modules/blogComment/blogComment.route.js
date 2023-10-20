"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blogComment_controller_1 = require("./blogComment.controller");
const blogComment_validation_1 = require("./blogComment.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(blogComment_validation_1.BlogCommentValidation.createBlogComment), blogComment_controller_1.BlogCommentController.insertInToDB);
router.get('/', blogComment_controller_1.BlogCommentController.getAllFromDB);
router.get('/:id', blogComment_controller_1.BlogCommentController.getSingleFromDB);
router.patch('/:id', (0, validateRequest_1.default)(blogComment_validation_1.BlogCommentValidation.updateBlogComment), blogComment_controller_1.BlogCommentController.updateInToDB);
router.delete('/:id', blogComment_controller_1.BlogCommentController.deleteFromDB);
exports.BlogCommentRoutes = router;
