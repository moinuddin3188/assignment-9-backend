"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FAQ_route_1 = require("../modules/FAQ/FAQ.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const blogComment_route_1 = require("../modules/blogComment/blogComment.route");
const booking_route_1 = require("../modules/booking/booking.route");
const category_route_1 = require("../modules/category/category.route");
const employee_route_1 = require("../modules/employee/employee.route");
const profile_route_1 = require("../modules/profile/profile.route");
const repairingService_route_1 = require("../modules/repairingService/repairingService.route");
const review_route_1 = require("../modules/review/review.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/admins',
        routes: admin_route_1.AdminRoutes,
    },
    {
        path: '/employees',
        routes: employee_route_1.EmployeeRoutes,
    },
    {
        path: '/categories',
        routes: category_route_1.CategoryRoutes,
    },
    {
        path: '/services',
        routes: repairingService_route_1.RepairingServiceRoutes,
    },
    {
        path: '/reviews',
        routes: review_route_1.ReviewRoutes,
    },
    {
        path: '/bookings',
        routes: booking_route_1.BookingRoutes,
    },
    {
        path: '/faqs',
        routes: FAQ_route_1.FAQRoutes,
    },
    {
        path: '/blogs',
        routes: blog_route_1.BlogRoutes,
    },
    {
        path: '/blog-comments',
        routes: blogComment_route_1.BlogCommentRoutes,
    },
    {
        path: '/profiles',
        routes: profile_route_1.ProfileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
