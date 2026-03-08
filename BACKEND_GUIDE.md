# Vishwasi Sangati NGO Website - Admin & Backend Features

## Overview

This website now includes a complete backend system with admin capabilities, allowing you to manage content, handle contact form submissions, track newsletter subscribers, and upload media files.

## Features Implemented

### 1. **Admin Authentication System**
- Secure login system using Supabase Authentication
- Session management with automatic token refresh
- Protected admin routes

### 2. **Admin Dashboard**
- **Hero Section Management**: Update hero text, images, and background
- **Impact Statistics**: Edit all 11 impact statistics with numbers and labels
- **Impact Stories**: Add, edit, delete impact stories with image uploads
- **Contact Form Submissions**: View all contact form submissions
- **Newsletter Subscribers**: View and manage email subscribers

### 3. **Media Upload System**
- Upload photos and videos through the admin dashboard
- Secure storage using Supabase Storage
- Automatic signed URL generation for private files
- Support for images (JPG, PNG, GIF) and videos (MP4, WebM)

### 4. **Functional CTA Buttons**
- **Donate Now**: Opens contact form for donation inquiries
- **Newsletter Subscribe**: Collects email addresses in database
- **Contact Form**: Stores messages in backend with timestamp
- **Admin Login**: Navigate to admin panel

### 5. **Backend API Endpoints**
All endpoints are accessible at: `https://${projectId}.supabase.co/functions/v1/make-server-dff980ef`

#### Public Endpoints:
- `POST /contact/submit` - Submit contact form
- `POST /newsletter/subscribe` - Subscribe to newsletter
- `GET /content/hero` - Get hero section content
- `GET /content/impact-stats` - Get impact statistics
- `GET /content/impact-stories` - Get impact stories

#### Admin-Only Endpoints (Require Authentication):
- `POST /auth/signup` - Create admin account
- `PUT /content/hero` - Update hero content
- `PUT /content/impact-stats` - Update statistics
- `PUT /content/impact-stories` - Update stories
- `POST /media/upload` - Upload media files
- `GET /contact/all` - Get all contact submissions
- `GET /newsletter/subscribers` - Get all subscribers

## Getting Started

### Step 1: Create Your First Admin Account

1. Navigate to `/admin/setup` in your browser
2. Fill in the form with:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
3. Click "Create Admin Account"
4. You'll be redirected to the login page

### Step 2: Login to Admin Dashboard

1. Navigate to `/admin/login` or click the "Admin" button in the navbar
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to the admin dashboard

### Step 3: Manage Content

#### Update Hero Section:
1. Click on "Hero Section" in the sidebar
2. Edit text fields (Badge, Title, Highlight Text, Description)
3. Upload new images by clicking the file input
4. Click "Save Changes"

#### Update Impact Statistics:
1. Click on "Impact Stats" in the sidebar
2. Edit numbers and labels for each statistic
3. Click "Save Changes"

#### Manage Impact Stories:
1. Click on "Impact Stories" in the sidebar
2. Edit existing stories or click "Add Story" for new ones
3. Upload images for each story
4. Click "Save Changes"
5. Remove stories with the trash icon

#### View Contact Submissions:
1. Click on "Contacts" in the sidebar
2. View all messages with name, email, phone, and message
3. Contact details are sorted by newest first

#### View Newsletter Subscribers:
1. Click on "Subscribers" in the sidebar
2. See complete list with subscription dates
3. Total count displayed at top

## User Journey

### For Website Visitors:

1. **Homepage**: 
   - View hero section with engaging content
   - Click "Explore Our Work" to scroll to impact stories
   - Click "Donate Now" to open contact form

2. **Newsletter Subscription**:
   - Enter email in footer newsletter section
   - Click "Subscribe" button
   - Receive confirmation toast notification

3. **Contact Form**:
   - Click any "Donate Now" button
   - Fill in name, email, phone (optional), and message
   - Click "Send Message"
   - Receive confirmation toast notification

### For Administrators:

1. **Initial Setup**:
   - Visit `/admin/setup`
   - Create first admin account

2. **Daily Management**:
   - Login at `/admin/login`
   - Access dashboard at `/admin/dashboard`
   - Update content as needed
   - Monitor contact submissions and subscribers

3. **Content Updates**:
   - Navigate through tabs in sidebar
   - Edit content inline
   - Upload new media files
   - Save changes with one click

## Technical Details

### Backend Architecture:
- **Framework**: Hono.js (Edge Functions)
- **Database**: Supabase (Key-Value Store)
- **Storage**: Supabase Storage (Private Buckets)
- **Authentication**: Supabase Auth

### Frontend Architecture:
- **Framework**: React 18.3.1
- **Routing**: React Router 7.13.0
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Notifications**: Sonner (Toast)
- **Icons**: Lucide React

### Security Features:
- Password-protected admin routes
- JWT token authentication
- Middleware verification for admin endpoints
- Private storage buckets with signed URLs
- CORS enabled for authorized domains

## Data Storage

All data is stored in Supabase:
- **Hero Content**: `content:hero` key
- **Impact Stats**: `stat:*` prefix keys
- **Impact Stories**: `story:*` prefix keys
- **Contact Forms**: `contact:*` prefix keys
- **Newsletter**: `newsletter:*` prefix keys
- **Media Files**: `make-dff980ef-media` bucket

## Important Notes

1. **First Admin Account**: Must be created through `/admin/setup`
2. **Media Uploads**: Files are stored securely in private buckets
3. **Contact Data**: Not encrypted - suitable for prototyping only
4. **Email Confirmations**: Auto-confirmed (no email server configured)
5. **PII Warning**: This system collects contact information - ensure compliance with data protection regulations for production use

## Troubleshooting

### Cannot Login:
- Ensure you created an account at `/admin/setup`
- Check email and password are correct
- Clear browser cache and try again

### Images Not Loading:
- Check that files are under 50MB
- Supported formats: JPG, PNG, GIF, MP4, WebM
- Wait for upload completion before saving

### Changes Not Saving:
- Ensure you're logged in (check if redirected to login)
- Click "Save Changes" button after editing
- Check browser console for error messages

## Future Enhancements

Consider adding:
- Email notifications for contact form submissions
- Analytics dashboard
- Bulk operations for content management
- Image optimization and compression
- Social media integration
- Payment gateway for donations
- Multi-language support

## Support

For issues or questions:
- Email: vishwasisangati@gmail.com
- Phone: +91 98480 51358

---

**Built with ❤️ for Vishwasi Sangati NGO**
