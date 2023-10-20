"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlog), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.EMPLOYEE), blog_controller_1.BlogController.insertInToDB);
router.get('/', blog_controller_1.BlogController.getAllFromDB);
router.get('/:id', blog_controller_1.BlogController.getSingleFromDB);
router.patch('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlog), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), blog_controller_1.BlogController.updateInToDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), blog_controller_1.BlogController.deleteFromDB);
exports.BlogRoutes = router;
