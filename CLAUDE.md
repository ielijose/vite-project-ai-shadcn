# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production (includes TypeScript compilation)
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build

## Architecture

This is a React + TypeScript + Vite project using shadcn/ui components with Tailwind CSS.

### Key Technologies
- **React 19** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** for UI components (New York style)
- **Tailwind CSS v4** for styling
- **React Hook Form** with Zod validation
- **Radix UI** primitives for accessible components
- **Lucide React** for icons

### Project Structure
- `src/components/ui/` - shadcn/ui components
- `src/lib/utils.ts` - Utility functions including `cn()` for class merging
- `@/` alias points to `src/` directory

### shadcn/ui Configuration
- Style: "new-york"
- Base color: "neutral"
- CSS variables enabled
- Components path: `@/components/ui`
- Utils path: `@/lib/utils`

### Form Patterns
The codebase uses React Hook Form with Zod for form validation. See `src/components/example-form.tsx` for the standard pattern combining:
- Zod schema validation
- `@hookform/resolvers/zod` for integration
- shadcn/ui Form components