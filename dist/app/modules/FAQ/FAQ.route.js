"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const FAQ_controller_1 = require("./FAQ.controller");
const FAQ_validation_1 = require("./FAQ.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(FAQ_validation_1.FAQValidation.createFAQ), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), FAQ_controller_1.FAQController.insertInToDB);
router.get('/', FAQ_controller_1.FAQController.getAllFromDB);
router.get('/:id', FAQ_controller_1.FAQController.getSingleFromDB);
router.patch('/:id', (0, validateRequest_1.default)(FAQ_validation_1.FAQValidation.updateFAQ), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), FAQ_controller_1.FAQController.updateInToDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), FAQ_controller_1.FAQController.deleteFromDB);
exports.FAQRoutes = router;
