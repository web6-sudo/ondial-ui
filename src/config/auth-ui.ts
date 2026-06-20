/**
 * =============================================================================
 * AUTH UI - single source of truth (login + signup split layout)
 * =============================================================================
 *
 * Full code + AI instructions for porting: `src/config/auth-ui-ai-pack.md`
 *
 * Use this file to match the OnDial auth UI in another app, or to swap images
 * and copy on the right-hand collage panel without touching component code.
 *
 * -----------------------------------------------------------------------------
 * QUICK START (same repo)
 * -----------------------------------------------------------------------------
 *
 * 1. Drop your images into `public/auth/` (see IMAGE ASSETS below).
 * 2. Update the paths in `authUiImages` below.
 * 3. Optionally tweak `authUiCopy` and `authUiPanel`.
 * 4. Run `npm run dev` and open `/login` or `/signup`.
 *
 * The right panel only appears at `xl` (≥1280px). Below that, only the form
 * column is shown (mobile / tablet).
 *
 * -----------------------------------------------------------------------------
 * REPLICATE IN ANOTHER PROJECT - copy these files
 * -----------------------------------------------------------------------------
 *
 * Components (required):
 *   src/components/auth/auth-page-shell.tsx
 *   src/components/auth/auth-split-layout.tsx
 *   src/components/auth/auth-collage-panel.tsx
 *   src/components/auth/auth-collage-scene.tsx
 *
 * Pages (pick login, signup, or both):
 *   src/app/login/page.tsx
 *   src/app/login/layout.tsx
 *   src/app/signup/page.tsx
 *   src/app/signup/signup-form.tsx
 *
 * Utilities:
 *   src/lib/auth-form-validation.ts
 *
 * UI primitives (shadcn or equivalent):
 *   Button, Input, Label, Checkbox from `@/components/ui/*`
 *
 * Layout hook (so nav bleeds over the split and footer is hidden):
 *   In your root layout shell, treat `/login` and `/signup` like
 *   `isAuthSplitRoute` in `src/components/layout/app-layout-shell.tsx`:
 *   - `bleedUnderNav={true}`
 *   - hide footer on auth routes
 *   - `main` → `flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-transparent`
 *
 * Page wrapper pattern (both login and signup):
 *
 *   ```tsx
 *   <AuthPageShell fullScreen>
 *     <AuthSplitLayout fullScreen>
 *       {/* your form here *\/}
 *     </AuthSplitLayout>
 *   </AuthPageShell>
 *   ```
 *
 * Static assets:
 *   public/auth/collage-chair.png   ← main collage (required)
 *   public/auth/two.jpg             ← bottom-left kiwi card (optional)
 *   public/auth/avatars/*.jpg       ← optional local avatar stack
 *
 * Dependencies: `next/image`, `lucide-react`, `cn` utility (clsx + tailwind-merge).
 *
 * -----------------------------------------------------------------------------
 * RIGHT PANEL - where each image goes
 * -----------------------------------------------------------------------------
 *
 * Design canvas: 330 × 377 px (aspect ratio 330:377). Everything scales together.
 *
 * ```
 * ┌─────────────────────────────────────── 330px ───────────────────────────────────────┐
 * │  ┌─────────────── TOP NOTCH (avatars + social proof) ───────────────┐               │
 * │  │  ○ ○ ○ ○ ○  ← authUiImages.avatars (5 circles, overlapping)     │               │
 * │  │  "+5000 happy customers" ← authUiCopy.socialProof                │               │
 * │  └───────────────────────────────────────────────────────────────────┘               │
 * │                                                                                      │
 * │     ╭────────────────────────────────────────────────────────╮                       │
 * │     │                                                        │                       │
 * │     │   MAIN COLLAGE PHOTO                                   │                       │
 * │     │   authUiImages.mainCollage                             │                       │
 * │     │   (clipped to organic SVG shape)                       │                       │
 * │     │                                                        │                       │
 * │  ┌──┴──┐                                                                               │
 * │  │kiwi │  ← authUiImages.kiwiCard (rounded rectangle, bottom-left)                    │
 * │  │card │     Set authUiPanel.showKiwi = false to hide.                                 │
 * │  └─────┘                                                                               │
 * └──────────────────────────────────────────────────────────────────────────────────────┘
 * ```
 *
 * Left column = form (Welcome back / Sign up, inputs, Google button).
 * Right column = AuthCollagePanel (hidden below xl breakpoint).
 *
 * -----------------------------------------------------------------------------
 * IMAGE ASSETS - specs & placement
 * -----------------------------------------------------------------------------
 *
 * | Slot            | Config key              | Default path                  | Size hint                          |
 * |-----------------|-------------------------|-------------------------------|------------------------------------|
 * | Main collage    | authUiImages.mainCollage| /auth/collage-chair.png       | Portrait, min 660×800px @2x        |
 * |                 |                         |                               | Subject centered; edges crop OK    |
 * | Kiwi card       | authUiImages.kiwiCard   | /auth/two.jpg                 | ~400×560px portrait                |
 * |                 |                         |                               | Shown bottom-left, slight zoom     |
 * | Avatar stack    | authUiImages.avatars    | 5 URLs or /auth/avatars/…     | Square 120×120px each, faces       |
 * |                 |                         |                               | Use JPG/WebP; PNG if transparent   |
 *
 * Export tips:
 *   - Main collage: lifestyle / product hero, warm lighting, no critical detail at edges.
 *   - Kiwi card: secondary accent (team, product detail, mascot, etc.).
 *   - Avatars: diverse headshots; keep file size under ~30 KB each for fast load.
 *
 * To use local avatars instead of Unsplash URLs:
 *
 *   public/auth/avatars/1.jpg … 5.jpg
 *   authUiImages.avatars = [
 *     "/auth/avatars/1.jpg",
 *     "/auth/avatars/2.jpg",
 *     ...
 *   ]
 *
 * -----------------------------------------------------------------------------
 * TOGGLE PANEL ELEMENTS
 * -----------------------------------------------------------------------------
 *
 * authUiPanel.showKiwi    - bottom-left rounded image card
 * authUiPanel.showAvatars - top notch avatar stack + social proof line
 *
 * Both are consumed by `AuthCollagePanel` → `AuthCollageScene`.
 *
 * -----------------------------------------------------------------------------
 * FORM STYLING (left column)
 * -----------------------------------------------------------------------------
 *
 * Login reference:  `src/app/login/page.tsx`
 * Signup reference: `src/app/signup/signup-form.tsx`
 *
 * Shared input style: rounded-full, h-10, bg-muted/50, full-width primary button.
 * Copy strings for headings live in each page file; panel copy lives in authUiCopy.
 *
 * =============================================================================
 */

/** Images for the right-hand collage panel (paths from `/public`). */
export const authUiImages = {
  /** Large portrait clipped into the organic main frame. */
  mainCollage: "/auth/collage-chair.png",
  /** Small rounded card, bottom-left overlay. */
  kiwiCard: "/auth/two.jpg",
  /** Five overlapping circles in the top-right notch. */
  avatars: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
  ] as const,
} as const;

/** Copy shown on the collage panel (not the login/signup form). */
export const authUiCopy = {
  socialProof: "+5000 happy customers",
} as const;

/** Feature flags for the right panel collage. */
export const authUiPanel = {
  showKiwi: true,
  showAvatars: true,
} as const;
