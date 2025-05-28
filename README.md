# WINDU Web App

A modern Next.js web application built with TypeScript, Tailwind CSS, and the latest React features.

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Runtime**: React 19.x
- **Package Manager**: npm
- **Development**: Turbopack (enabled for dev mode)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.17 or later
- **npm**: Version 9.0 or later (comes with Node.js)
- **Git**: For cloning the repository

You can check your versions with:
```bash
node --version
npm --version
git --version
```

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd windu-web-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000). Open this URL in your browser to view the app.

The development server uses **Turbopack** for faster builds and hot reloading.

## 📝 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## 🏗️ Project Structure

```
windu-web-app/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout component
│       ├── page.tsx        # Home page component
│       ├── globals.css     # Global styles with Tailwind
│       └── favicon.ico     # App favicon
├── public/                 # Static assets
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🎨 Styling

This project uses **Tailwind CSS v4** with the new simplified configuration. Global styles are defined in `src/app/globals.css` with:

- CSS custom properties for theming
- Dark mode support via `prefers-color-scheme`
- Tailwind utility classes
- Custom font variables (Geist Sans & Geist Mono)

## 🔧 Configuration

### Next.js Features Enabled:
- **App Router** - Modern routing system
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development
- **Image Optimization** - Built-in image optimization
- **Font Optimization** - Automatic font optimization

### Development Features:
- Hot reloading with Turbopack
- TypeScript error checking
- ESLint integration
- Automatic code formatting

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Start Production Server

```bash
npm run start
```

### Deploy to Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect it's a Next.js project and deploy it

Alternative deployment platforms:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Troubleshooting

### Common Issues:

1. **Port 3000 already in use**:
   ```bash
   # Kill any process using port 3000
   lsof -ti:3000 | xargs kill -9
   # Or use a different port
   npm run dev -- -p 3001
   ```

2. **Node version issues**:
   - Ensure you're using Node.js 18.17 or later
   - Consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions

3. **Dependencies not installing**:
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript errors**:
   ```bash
   # Check TypeScript issues
   npx tsc --noEmit
   ```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - Learn TypeScript

---

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**
