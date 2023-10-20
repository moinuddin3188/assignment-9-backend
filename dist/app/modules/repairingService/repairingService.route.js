"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairingServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const repairingService_controller_1 = require("./repairingService.controller");
const repairingService_validation_1 = require("./repairingService.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(repairingService_validation_1.ServiceValidation.createRepairingService), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), repairingService_controller_1.RepairingServiceController.insertInToDB);
router.get('/', repairingService_controller_1.RepairingServiceController.getAllFromDB);
router.get('/:id', repairingService_controller_1.RepairingServiceController.getSingleFromDB);
router.patch('/:id', (0, validateRequest_1.default)(repairingService_validation_1.ServiceValidation.updateRepairingService), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), repairingService_controller_1.RepairingServiceController.updateInToDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), repairingService_controller_1.RepairingServiceController.deleteFromDB);
exports.RepairingServiceRoutes = router;
