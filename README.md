<div align="center">

# 💪 GYMVORTEXT
### *Your Ultimate Fitness & Gym Management Platform*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Site-GYMVORTEXT-orange?style=for-the-badge)](https://b13-a10-frontend.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

</div>

---

## 🌐 Live URL

🔗 **[https://b13-a10-frontend.vercel.app/](https://gymvortex.vercel.app/)**

---

## 📌 Project Purpose

**GYMVORTEXT** is a comprehensive Fitness & Gym Management Platform built for fitness enthusiasts, professional trainers, and administrators. It provides a seamless experience for discovering and booking fitness classes, participating in community discussions, and managing the entire gym ecosystem — all in one place.

Whether you're a member looking to track your fitness journey, a trainer looking to grow your classes, or an admin maintaining platform quality — GYMVORTEXT has you covered.

---

## ✨ Key Features

### 👤 For Members (Users)
- 🔍 **Browse & Search** fitness classes by name and filter by category
- 📅 **Book Classes** with integrated Stripe payment checkout
- ❤️ **Save Favorite Classes** and manage from personal dashboard
- 📝 **Apply to become a Trainer** with a detailed application form
- 💬 **Community Forum** — read, comment, reply, like/dislike posts
- 📊 **Personal Dashboard** — track bookings, favorites, and application status

### 🏋️ For Trainers
- ➕ **Create & Manage Classes** (Name, Category, Schedule, Difficulty, Price, Description)
- 👥 **View Enrolled Students** via modal for each class
- 📢 **Post on Community Forum** to share fitness knowledge
- 📋 **My Classes & Forum Posts** with full update/delete control
- 📈 **Performance Metrics** — view total classes and enrolled students

### 🛡️ For Admins
- 👥 **Manage All Users** — Block/Unblock (soft block), Promote to Admin
- ✅ **Approve/Reject Trainer Applications** with written feedback
- 🏫 **Manage All Classes** — Approve, Reject, or Delete submissions
- 💰 **View All Transactions** — full Stripe payment history
- 🗂️ **Moderate Forum Posts** — delete inappropriate content
- 📊 **Platform-wide Stats** — Total Users, Classes, Bookings

### 🌟 General Features
- 🔐 **Better Auth** — Email/Password + Google OAuth login
- 🔒 **JWT Authentication** stored in HTTPOnly Cookies
- 💳 **Stripe Checkout** integration for class payments
- 🔄 **Role-Based Access Control** (User / Trainer / Admin)
- 📱 **Fully Responsive** — Mobile, Tablet & Desktop
- 🎞️ **Framer Motion Animations** on Homepage sections
- 📃 **Server-Side Pagination** on Classes & Forum pages
- 🌙 **Dark / Light Theme Toggle**
- 🔎 **MongoDB `$regex` Search** & **`$in` Filter** for classes
- 🔔 **In-app Notifications** when Trainer application is approved
- 📈 **Advanced Analytics Charts** using Recharts (Admin Dashboard)
- 🖼️ **ImgBB Integration** for image uploads (Forum posts, Classes)

---

## 🗺️ Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home — Banner, Featured Classes, Latest Forum Posts |
| `/classes` | Public | All approved classes with Search & Filter |
| `/classes/[id]` | Private | Class details, Book Now, Add to Favorites |
| `/forum` | Public | Community Forum with pagination |
| `/forum/[id]` | Private | Full post, Likes, Comments & Replies |
| `/auth/login` | Public | Email/Password & Google Login |
| `/auth/register` | Public | New user registration |
| `/api/auth/[...all]` | System | Better Auth API handler |
| `/api/checkout_sessions` | Private | Stripe checkout session creator |
| `/dashboard/admin` | Admin | Admin overview & stats |
| `/dashboard/admin/add-post` | Admin | Create a community forum post |
| `/dashboard/admin/admin-posts` | Admin | Manage all admin forum posts |
| `/dashboard/admin/applied-trainers` | Admin | Review trainer applications |
| `/dashboard/admin/forum-manage` | Admin | Moderate all forum content |
| `/dashboard/admin/manage-classes` | Admin | Approve/Reject/Delete classes |
| `/dashboard/admin/manage-trainers` | Admin | View & demote active trainers |
| `/dashboard/admin/manage-users` | Admin | Block/Unblock/Promote users |
| `/dashboard/admin/transactions` | Admin | All Stripe payment records |

---

## 📁 Project Structure

```
gymvortext-client/
│
├── .next/                          # Next.js build output
├── .vercel/                        # Vercel deployment config
├── public/                         # Static assets
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   └── register/
│   │   │       └── page.jsx
│   │   │
│   │   ├── (main)/
│   │   │   ├── classes/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── page.jsx
│   │   │   ├── forum/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── page.jsx
│   │   │   ├── layout.jsx
│   │   │   └── page.js             # Home Page
│   │   │
│   │   └── api/
│   │       ├── auth/[...all]/
│   │       │   └── route.js        # Better Auth handler
│   │       ├── checkout_sessions/
│   │       │   └── route.js        # Stripe session API
│   │       └── dashboard/
│   │           └── admin/
│   │               ├── add-post/
│   │               ├── admin-posts/
│   │               ├── applied-trainers/
│   │               ├── forum-manage/
│   │               ├── manage-classes/
│   │               ├── manage-trainers/
│   │               ├── manage-users/
│   │               ├── transactions/
│   │               └── page.jsx
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   │   ├── ClassStats.jsx
│   │   │   │   ├── ClassTable.jsx
│   │   │   │   ├── ForumPostManage.jsx
│   │   │   │   ├── ManageUsersHeader.jsx
│   │   │   │   ├── MassAndAuditCards.jsx
│   │   │   │   ├── StatusBadge.jsx
│   │   │   │   ├── TrainerRegistry.jsx
│   │   │   │   ├── TransactionTable.jsx
│   │   │   │   └── UsersTable.jsx
│   │   │   │
│   │   │   ├── trainer/
│   │   │   │   ├── AddClassForm.jsx
│   │   │   │   ├── AddForumPostForm.jsx
│   │   │   │   ├── EnrolledListModal.jsx
│   │   │   │   ├── MetricsGrid.jsx
│   │   │   │   ├── MyClassess.jsx
│   │   │   │   ├── PerformanceFeed.jsx
│   │   │   │   ├── RightSidebar.jsx
│   │   │   │   └── TopNavBar.jsx
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── ApplicationStatus.jsx
│   │   │   │   ├── DynamicProtocolTerminal.jsx
│   │   │   │   ├── FavoriteRegimes.jsx
│   │   │   │   ├── ForgeCommunity.jsx
│   │   │   │   ├── MyBookings.jsx
│   │   │   │   ├── MyFavoriteClasses.jsx
│   │   │   │   ├── OverviewHeader.jsx
│   │   │   │   ├── TrainerApplicationStatus.jsx
│   │   │   │   ├── TrainerForm.jsx
│   │   │   │   ├── UpcomingSessions.jsx
│   │   │   │   ├── UserProfileStatus.jsx
│   │   │   │   ├── UserStatsCards.jsx
│   │   │   │   └── WorkoutProgress.jsx
│   │   │   │
│   │   │   ├── DashboardShell.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── forum/
│   │   │   ├── CommentSection.jsx
│   │   │   ├── ForumPostCard.jsx
│   │   │   └── MyForumPosts.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── EliteTrainers.jsx
│   │   │   ├── FeaturedClasses.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── LatestPosts.jsx
│   │   │   └── StatsSection.jsx
│   │   │
│   │   ├── modals/
│   │   │   ├── AttendeesModal.jsx
│   │   │   └── TrainerDetailsModal.jsx
│   │   │
│   │   └── shared/
│   │       ├── DynamicDeleteModal.jsx
│   │       ├── Footer.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── Navbar.jsx
│   │
│   ├── config/
│   │   └── dashboardRoutes.js      # Role-based sidebar route config
│   │
│   └── lib/
│       ├── action/                 # Server Actions
│       │   ├── application.js
│       │   ├── booking.js
│       │   ├── classes.js
│       │   ├── favorite.js
│       │   ├── forumAction.js
│       │   ├── trainerManagement.js
│       │   └── userManagement.js
│       │
│       ├── api/                    # API call functions
│       │   ├── applications.js
│       │   ├── booking.js
│       │   ├── dashboard.js
│       │   ├── favorite.js
│       │   ├── forumPostActions.js
│       │   ├── getClasses.js
│       │   ├── trainerManagment.js
│       │   └── userManagement.js
│       │
│       ├── core/
│       │   ├── serverMutation.js
│       │   └── session.js
│       │
│       ├── auth-client.js          # Better Auth client config
│       ├── auth.js                 # Better Auth server config
│       └── stripe.js               # Stripe config
│
├── .env                            # Environment variables
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs                 # Next.js config
├── package.json
├── postcss.config.mjs
└── README.md
```

---

## 🛠️ NPM Packages Used

### Core Framework
| Package | Purpose |
|---|---|
| `next` | React Framework with App Router (SSR/SSG) |
| `react` | UI Library |
| `react-dom` | DOM Rendering |

### Styling & Animation
| Package | Purpose |
|---|---|
| `tailwindcss` | Utility-first CSS Framework |
| `daisyui` | Tailwind Component Library |
| `framer-motion` | Page & Section Animations |
| `postcss` | CSS Processing |

### Authentication
| Package | Purpose |
|---|---|
| `better-auth` | Auth system — Email/Password + Google OAuth |

### Data Fetching
| Package | Purpose |
|---|---|
| `@tanstack/react-query` | Server State, Caching & Mutations |
| `axios` | HTTP Client for API calls |

### Payment
| Package | Purpose |
|---|---|
| `@stripe/react-stripe-js` | Stripe React UI Components |
| `@stripe/stripe-js` | Stripe.js Core SDK |
| `stripe` | Stripe Node.js SDK (server-side) |

### UI & UX
| Package | Purpose |
|---|---|
| `react-icons` | Comprehensive Icon Library |
| `react-hot-toast` | Non-blocking Toast Notifications |
| `sweetalert2` | Styled Confirmation Modals |
| `recharts` | Charts & Analytics (Admin Dashboard) |

### Forms & Utilities
| Package | Purpose |
|---|---|
| `react-hook-form` | Form Handling & Validation |
| `mongoose` | MongoDB ODM (if used server-side) |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# ImgBB
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

> ⚠️ **Never commit `.env` to version control. All sensitive keys must remain in environment variables only.**

---

## 🚀 Getting Started (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/amirulislambd/GymVortex.git

# 2. Navigate into the project
cd gymvortext-client

# 3. Install all dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Fill in your actual values in .env

# 5. Run the development server
npm run dev

# 6. Open in browser
# http://localhost:3000
```

---

## 🎨 Design Highlights

- ⚡ **Energetic Color Palette** — Bold, high-contrast colors built for fitness motivation
- 🖋️ **Consistent Typography** — Clean headings, readable body text, proper hierarchy
- 📐 **Proper Alignment** — Equal card heights, balanced grid spacing throughout
- 🌓 **Dark / Light Mode** — Togglable theme with DaisyUI theme system
- 🎬 **Framer Motion Animations** — Hero section, cards, and page transitions
- 📱 **Mobile-First Responsive** — Perfectly functional across all screen sizes
- 🗂️ **Role-based Sidebar** — Dynamic navigation built from `dashboardRoutes.js`

---

## 👑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@super.com | Password123 |

> You can register a new account and test as a **User**. Apply for Trainer from the dashboard to test the Trainer flow.

---

## 📦 Deployment

| Layer | Platform |
|---|---|
| **Frontend + API Routes** | [Vercel](https://vercel.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| **Image Hosting** | [ImgBB](https://imgbb.com/) |
| **Payments** | [Stripe](https://stripe.com/) |

---

## 🤝 Author

**GYMVORTEXT** — Built with 💪 passion and modern web technologies.

> *"Transforming the way the world works out."*

---

<div align="center">

⭐ If you like this project, give it a star on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/your-username/gymvortext-client?style=social)](https://github.com/your-username/gymvortext-client)

</div>