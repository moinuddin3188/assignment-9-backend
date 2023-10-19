import express from 'express';
import { FAQRoutes } from '../modules/FAQ/FAQ.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BlogCommentRoutes } from '../modules/blogComment/blogComment.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { EmployeeRoutes } from '../modules/employee/employee.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { RepairingServiceRoutes } from '../modules/repairingService/repairingService.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/admins',
    routes: AdminRoutes,
  },
  {
    path: '/employees',
    routes: EmployeeRoutes,
  },
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
  {
    path: '/services',
    routes: RepairingServiceRoutes,
  },
  {
    path: '/reviews',
    routes: ReviewRoutes,
  },
  {
    path: '/bookings',
    routes: BookingRoutes,
  },
  {
    path: '/faqs',
    routes: FAQRoutes,
  },
  {
    path: '/blogs',
    routes: BlogRoutes,
  },
  {
    path: '/blog-comments',
    routes: BlogCommentRoutes,
  },
  {
    path: '/profiles',
    routes: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
