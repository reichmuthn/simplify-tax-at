# Simplify Tax

## 📖 Introduction

The SimplifyTax-AT project is designed to streamline the management of tax-related information and processes. This repository encompasses various components that facilitate the creation, updating, and management of tax tags, questions, and answers. By leveraging advanced tools and frameworks, SimplifyTax-AT aims to provide a comprehensive solution for tax professionals and organizations to efficiently handle tax data and operations.

## ✨ Features

- Tag Management: Create and update tag groups and individual tags, enabling easy categorization and retrieval of tax-related information.
- Question and Answer System: Management of tax-related questions and answers, facilitating a structured knowledge base.
- Email Handling: Integration with email services to manage transactional emails and email contacts.
- Booking System: Supports a multi-step form for booking management, including viewing and confirming booking slots.
- Progress Tracking: Includes a progress bar component to visually track user progress through various processes.
- Map Integration: Utilizes Google Maps for displaying location-based information.
- Image and File Upload: Facilitates uploading images to a cloud storage (Cloudinary) with validation and progress indication.
- Rich Text Editing: Provides a customizable text editor with support for embedding images, links, and video content.
- Data Handling: Utilizes Prisma for database interactions and Zod for data validation schemas.

## ⚙️ Requirements

To set up and run the project, ensure the following requirements are met:

- Node.js: Version 14 or above.
- Database: A configured Prisma-supported database for storing application data. Planetscale is used as the database solution.
- Environment Variables: Properly configure environment variables for services like Cloudinary, Google Maps, and email providers.
- Dependencies: Install necessary dependencies using a package manager like npm or yarn.

## 🛠️ Technologies Used
- Node.js: Server-side JavaScript runtime.
- TypeScript: For static typing in JavaScript.
- Prisma: ORM for database interactions.
- Vercel: For deploying the application.
- Clerk.dev: For authentication services.
- Planetscale: Database solution for storing legal regulations and laws.
- Tiptap: for rich text editing
- React Hook Form: Manages form state and validation using Zod schemas.

## 📚 Frameworks Used

- React: Used for building interactive UIs.
- Next.js: Provides server-side rendering and static site generation capabilities.
- Tailwind CSS: Offers a utility-first approach to styling.

## 🌍 Internalisation (i18n)
The application uses <code>next-intl</code> for internationalization, allowing the content to be translated into different languages. This ensures that users from various regions can use the application in their preferred language.

## 📡 APIs
The project integrates several APIs to enhance its functionality:

- Google Maps API: Utilized for displaying and interacting with map data such as location markers and information windows.
- Cloudinary: Handles image uploads to Cloudinary with file validation.
- Brevo Email Provider: Handles sending transactional emails and managing email contacts through API requests. And it manages email contact creation with double opt-in confirmation.

This documentation should provide a comprehensive overview of the repository reichmuthn/simplifytax-at, detailing its features, requirements, and the technologies it employs.
