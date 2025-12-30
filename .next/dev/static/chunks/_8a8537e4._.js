(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkeletonProvider",
    ()=>SkeletonProvider,
    "useSkeletonLoading",
    ()=>useSkeletonLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const SkeletonContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(false);
function SkeletonProvider({ loading, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonContext.Provider, {
        value: loading,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/lib/skeleton-context.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = SkeletonProvider;
function useSkeletonLoading(localLoading) {
    _s();
    const contextLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SkeletonContext);
    return localLoading ?? contextLoading;
}
_s(useSkeletonLoading, "OiXO8eDg7r6nQFUlGxPjkag772E=");
var _c;
__turbopack_context__.k.register(_c, "SkeletonProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton,
    "skeletonVariants",
    ()=>skeletonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const skeletonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('animate-pulse rounded-md bg-muted', {
    variants: {
        variant: {
            default: '',
            text: `h-4 w-full`,
            heading: 'h-6 w-3/4',
            button: 'h-9 w-24',
            'button-sm': 'h-8 w-20',
            'button-lg': 'h-10 w-28',
            'button-icon': 'size-9',
            input: 'h-9 w-full',
            badge: 'h-5 w-16',
            avatar: 'size-8 rounded-full',
            'avatar-sm': 'size-6 rounded-full',
            'avatar-lg': 'size-12 rounded-full',
            label: 'h-4 w-20',
            image: 'h-48 w-full',
            'image-sm': 'h-24 w-24',
            'image-lg': 'h-64 w-full',
            circular: 'rounded-full'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Skeleton({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(skeletonVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/skeleton.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "AvatarFallback",
    ()=>AvatarFallback,
    "AvatarImage",
    ()=>AvatarImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Avatar({ className, loading, ...props }) {
    _s();
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"])(loading);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            variant: "avatar",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('size-8', className)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ui/avatar.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "avatar",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex size-8 shrink-0 overflow-hidden rounded-full', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/avatar.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(Avatar, "Hs0pI91j6t5W0c25yImt9AB0p0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"]
    ];
});
_c = Avatar;
function AvatarImage({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
        "data-slot": "avatar-image",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('aspect-square size-full', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/avatar.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c1 = AvatarImage;
function AvatarFallback({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"], {
        "data-slot": "avatar-fallback",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted flex size-full items-center justify-center rounded-full', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/avatar.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c2 = AvatarFallback;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Avatar");
__turbopack_context__.k.register(_c1, "AvatarImage");
__turbopack_context__.k.register(_c2, "AvatarFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
const sizeToSkeletonVariant = {
    default: 'button',
    sm: 'button-sm',
    lg: 'button-lg',
    icon: 'button-icon'
};
function Button({ className, variant, size, asChild = false, loading, ...props }) {
    _s();
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"])(loading);
    if (isLoading) {
        const skeletonVariant = sizeToSkeletonVariant[size || 'default'];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            variant: skeletonVariant,
            className: className
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ui/button.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, this);
    }
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/button.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(Button, "Hs0pI91j6t5W0c25yImt9AB0p0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"]
    ];
});
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ui/text.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Text",
    ()=>Text,
    "textVariants",
    ()=>textVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const textVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('', {
    variants: {
        variant: {
            body: 'text-base',
            heading: 'text-xl font-semibold',
            muted: 'text-sm text-muted-foreground'
        }
    },
    defaultVariants: {
        variant: 'body'
    }
});
// Map text sizes to skeleton heights (roughly matching line-height)
const textSizeToSkeletonHeight = {
    'text-xs': 'h-3',
    'text-sm': 'h-3.5',
    'text-base': 'h-4',
    'text-lg': 'h-5',
    'text-xl': 'h-5',
    'text-2xl': 'h-6',
    'text-3xl': 'h-7',
    'text-4xl': 'h-9',
    'text-5xl': 'h-12'
};
// Map variant to its base text size
const variantToTextSize = {
    body: 'text-base',
    heading: 'text-xl',
    muted: 'text-sm'
};
function getSkeletonHeight(variant, className) {
    // First, check if className contains a text size override
    if (className) {
        for (const [textClass, heightClass] of Object.entries(textSizeToSkeletonHeight)){
            if (className.includes(textClass)) {
                return heightClass;
            }
        }
    }
    // Fall back to variant's default text size
    const variantTextSize = variantToTextSize[variant || 'body'];
    return textSizeToSkeletonHeight[variantTextSize] || 'h-4';
}
function Text({ className, variant, as: Component = 'span', loading, children, ...props }) {
    _s();
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"])(loading);
    if (isLoading) {
        const skeletonHeight = getSkeletonHeight(variant, className);
        // const skeletonVariant = variantToSkeletonVariant[variant || 'body'];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(skeletonHeight, className)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ui/text.tsx",
            lineNumber: 86,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        "data-slot": "text",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(textVariants({
            variant
        }), className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/text.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(Text, "Hs0pI91j6t5W0c25yImt9AB0p0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"]
    ];
});
_c = Text;
;
var _c;
__turbopack_context__.k.register(_c, "Text");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/auth-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authClient",
    ()=>authClient,
    "emailOtp",
    ()=>emailOtp,
    "getSession",
    ()=>getSession,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp,
    "useSession",
    ()=>useSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/client/react/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$plugins$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/client/plugins/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$plugins$2f$email$2d$otp$2f$client$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/plugins/email-otp/client.mjs [app-client] (ecmascript)");
;
;
const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAuthClient"])({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_API_URL'] || 'http://localhost:4444',
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$plugins$2f$email$2d$otp$2f$client$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emailOTPClient"])()
    ]
});
const { signIn, signOut, signUp, useSession, getSession, emailOtp } = authClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/libs/api/generated/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable */ /* tslint:disable */ // @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */ __turbopack_context__.s([
    "Api",
    ()=>Api,
    "ContentType",
    ()=>ContentType,
    "HttpClient",
    ()=>HttpClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var ContentType = /*#__PURE__*/ function(ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["JsonApi"] = "application/vnd.api+json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
    return ContentType;
}({});
class HttpClient {
    instance;
    securityData = null;
    securityWorker;
    secure;
    format;
    constructor({ securityWorker, secure, format, ...axiosConfig } = {}){
        this.instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
            ...axiosConfig,
            baseURL: axiosConfig.baseURL || ""
        });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    setSecurityData = (data)=>{
        this.securityData = data;
    };
    mergeRequestParams(params1, params2) {
        const method = params1.method || params2 && params2.method;
        return {
            ...this.instance.defaults,
            ...params1,
            ...params2 || {},
            headers: {
                ...method && this.instance.defaults.headers[method.toLowerCase()] || {},
                ...params1.headers || {},
                ...params2 && params2.headers || {}
            }
        };
    }
    stringifyFormItem(formItem) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }
    createFormData(input) {
        if (input instanceof FormData) {
            return input;
        }
        return Object.keys(input || {}).reduce((formData, key)=>{
            const property = input[key];
            const propertyContent = property instanceof Array ? property : [
                property
            ];
            for (const formItem of propertyContent){
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }
            return formData;
        }, new FormData());
    }
    request = async ({ secure, path, type, query, format, body, ...params })=>{
        const secureParams = (typeof secure === "boolean" ? secure : this.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;
        if (type === "multipart/form-data" && body && body !== null && typeof body === "object") {
            body = this.createFormData(body);
        }
        if (type === "text/plain" && body && body !== null && typeof body !== "string") {
            body = JSON.stringify(body);
        }
        return this.instance.request({
            ...requestParams,
            headers: {
                ...requestParams.headers || {},
                ...type ? {
                    "Content-Type": type
                } : {}
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path
        });
    };
}
class Api {
    http;
    constructor(http){
        this.http = http;
    }
    ping = {
        /**
     * @description Check if the API is running
     *
     * @tags health
     * @name AppControllerPing
     * @summary Health check
     * @request GET:/ping
     * @response `200` `AppControllerPingData` API is healthy
     */ appControllerPing: (params = {})=>this.http.request({
                path: `/ping`,
                method: "GET",
                format: "json",
                ...params
            })
    };
    api = {
        /**
     * @description Retrieve a stage and its owner information by URL slug
     *
     * @tags stages
     * @name StagesControllerFindBySlugV1
     * @summary Get stage by slug
     * @request GET:/api/v1/stages/{slug}
     * @response `200` `StagesControllerFindBySlugV1Data` Stage found
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ stagesControllerFindBySlugV1: ({ slug, ...query }, params = {})=>this.http.request({
                path: `/api/v1/stages/${slug}`,
                method: "GET",
                format: "json",
                ...params
            }),
        /**
     * @description Retrieve details of a specific pass. Hidden passes are only accessible to stage owners.
     *
     * @tags stages
     * @name StagesControllerGetPassV1
     * @summary Get a pass by ID
     * @request GET:/api/v1/stages/{stageId}/passes/{passId}
     * @response `200` `StagesControllerGetPassV1Data` Pass found
     * @response `404` `ApiErrorResponseDto` Pass or stage not found
     */ stagesControllerGetPassV1: ({ stageId, passId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/passes/${passId}`,
                method: "GET",
                format: "json",
                ...params
            }),
        /**
     * @description Update an existing pass. Only stage owners can update passes.
     *
     * @tags stages
     * @name StagesControllerUpdatePassV1
     * @summary Update a pass
     * @request PATCH:/api/v1/stages/{stageId}/passes/{passId}
     * @secure
     * @response `200` `StagesControllerUpdatePassV1Data` Pass updated
     * @response `400` `ApiErrorResponseDto` Invalid request or ground pass already exists
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Pass not found
     */ stagesControllerUpdatePassV1: ({ passId, stageId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/passes/${passId}`,
                method: "PATCH",
                body: data,
                secure: true,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Delete a pass from the stage. Only stage owners can delete passes.
     *
     * @tags stages
     * @name StagesControllerDeletePassV1
     * @summary Delete a pass
     * @request DELETE:/api/v1/stages/{stageId}/passes/{passId}
     * @secure
     * @response `204` `StagesControllerDeletePassV1Data` Pass deleted
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Pass not found
     */ stagesControllerDeletePassV1: ({ passId, stageId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/passes/${passId}`,
                method: "DELETE",
                secure: true,
                ...params
            }),
        /**
     * @description Get passes available for a specific stage. Stage owners automatically see all passes (including hidden). Owners can use visibility filter to narrow results.
     *
     * @tags stages
     * @name StagesControllerListPassesV1
     * @summary List passes for a stage
     * @request GET:/api/v1/stages/{stageId}/passes
     * @response `200` `StagesControllerListPassesV1Data` List of passes
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ stagesControllerListPassesV1: ({ stageId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/passes`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }),
        /**
     * @description Create a new free pass for the stage. Only stage owners can create passes.
     *
     * @tags stages
     * @name StagesControllerCreatePassV1
     * @summary Create a pass
     * @request POST:/api/v1/stages/{stageId}/passes
     * @secure
     * @response `201` `StagesControllerCreatePassV1Data` Pass created
     * @response `400` `ApiErrorResponseDto` Invalid request or ground pass already exists
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ stagesControllerCreatePassV1: ({ stageId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/passes`,
                method: "POST",
                body: data,
                secure: true,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Creates a new post on a stage. **Authorization:** User must be a stage member with role: owner, admin, or moderator. **Pass Assignment:** - If `passIds` is not provided or empty, the post is assigned to the stage's ground pass (free pass). - If `passIds` is provided, all passes must belong to the specified stage. **Assets:** - Maximum 20 assets per post. - Assets must be owned by the authenticated user. - Supported asset types: image, video, audio. **Scheduling:** - If `scheduledFor` is provided, it must be a future date. - Scheduled posts will be published automatically at the specified time. - Immediate posts are published right away. **Text Limits:** - Maximum 3000 characters (similar to LinkedIn).
     *
     * @tags Posts
     * @name PostsControllerCreatePostV1
     * @summary Create a new post
     * @request POST:/api/v1/posts
     * @secure
     * @response `201` `PostsControllerCreatePostV1Data` Post created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes, assets, or scheduledFor)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not a stage member or insufficient permissions
     */ postsControllerCreatePostV1: (data, params = {})=>this.http.request({
                path: `/api/v1/posts`,
                method: "POST",
                body: data,
                secure: true,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Returns a paginated list of posts for a stage. **Public Access:** Non-authenticated users can view posts from free passes only. Authenticated users see posts from their subscribed passes. **Pagination:** Uses cursor-based pagination for infinite scrolling. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Sorting:** Pinned posts always appear first (sorted by pin date), followed by regular posts sorted by publish date (newest first). **Filtering:** - `passIds`: Filter by specific passes (must be passes the user has access to) - `postedBy`: Filter by author - 'everyone', 'owner', or 'me' (requires auth) **Access Control:** Returns posts based on user's subscribed passes, or free passes for anonymous users.
     *
     * @tags Posts
     * @name PostsControllerListPostsV1
     * @summary List posts for a stage
     * @request GET:/api/v1/posts/stage/{stageId}
     * @response `200` `PostsControllerListPostsV1Data` Posts retrieved successfully
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ postsControllerListPostsV1: ({ stageId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/stage/${stageId}`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }),
        /**
     * @description Returns a post. **Public Access:** Non-authenticated users can view post from free passes only. Authenticated users see post from their subscribed passes.
     *
     * @tags Posts
     * @name PostsControllerGetPostV1
     * @summary Get details of a post
     * @request GET:/api/v1/posts/{postId}
     * @response `200` `PostsControllerGetPostV1Data` Post retrieved successfully
     * @response `404` `ApiErrorResponseDto` Post not found
     */ postsControllerGetPostV1: ({ postId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}`,
                method: "GET",
                format: "json",
                ...params
            }),
        /**
     * @description Creates a new comment on a post. **Authorization:** - Post must have `commentsEnabled = true` - User must be either: - Stage owner/admin/moderator of the post's stage, OR - Subscriber to at least one pass linked to the post **Replies:** - If `parentId` is provided, this is a reply to another comment. - Only one level of replies is allowed (no reply to reply). **Text Limits:** - Maximum 1000 characters.
     *
     * @tags Comments
     * @name CommentsControllerCreateCommentV1
     * @summary Create a comment on a post
     * @request POST:/api/v1/posts/{postId}/comments
     * @secure
     * @response `201` `CommentsControllerCreateCommentV1Data` Comment created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (reply to reply, parent not found)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - comments disabled or no access to post
     * @response `404` `ApiErrorResponseDto` Post not found
     */ commentsControllerCreateCommentV1: ({ postId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/comments`,
                method: "POST",
                body: data,
                secure: true,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Returns a paginated list of top-level comments on a post. Replies are not included; use the replies endpoint to fetch them. **Access Control:** - Anonymous users: Can view comments on posts with free passes - Authenticated users: Can view comments on posts they have access to **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Ordering:** Comments are sorted by creation date (newest first).
     *
     * @tags Comments
     * @name CommentsControllerListCommentsV1
     * @summary List comments on a post
     * @request GET:/api/v1/posts/{postId}/comments
     * @response `200` `CommentsControllerListCommentsV1Data` Comments retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Post not found
     */ commentsControllerListCommentsV1: ({ postId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/comments`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }),
        /**
     * @description Deletes a comment (soft delete). **Authorization:** - Users can delete their own comments - Stage owner/admin/moderator can delete any comment on their stage **Note:** Replies to a deleted comment will still be visible but show "[deleted]" as the parent.
     *
     * @tags Comments
     * @name CommentsControllerDeleteCommentV1
     * @summary Delete a comment
     * @request DELETE:/api/v1/posts/{postId}/comments/{commentId}
     * @secure
     * @response `204` `CommentsControllerDeleteCommentV1Data` Comment deleted successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not authorized to delete this comment
     * @response `404` `ApiErrorResponseDto` Comment not found
     */ commentsControllerDeleteCommentV1: ({ postId, commentId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/comments/${commentId}`,
                method: "DELETE",
                secure: true,
                ...params
            }),
        /**
     * @description Toggles the like status on a comment. - If not liked, adds a like. - If already liked, removes the like. **Authorization:** User must have access to the post to like comments.
     *
     * @tags Comments
     * @name CommentsControllerToggleLikeV1
     * @summary Toggle like on a comment
     * @request POST:/api/v1/posts/{postId}/comments/{commentId}/like
     * @secure
     * @response `200` `CommentsControllerToggleLikeV1Data` Like toggled successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Comment not found
     */ commentsControllerToggleLikeV1: ({ postId, commentId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/comments/${commentId}/like`,
                method: "POST",
                secure: true,
                format: "json",
                ...params
            }),
        /**
     * @description Returns a paginated list of users who liked a comment. **Access Control:** Same as viewing the post. **Pagination:** Uses cursor-based pagination.
     *
     * @tags Comments
     * @name CommentsControllerListLikesV1
     * @summary List users who liked a comment
     * @request GET:/api/v1/posts/{postId}/comments/{commentId}/likes
     * @response `200` `CommentsControllerListLikesV1Data` Likes retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Comment not found
     */ commentsControllerListLikesV1: ({ postId, commentId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/comments/${commentId}/likes`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }),
        /**
     * @description Returns a paginated list of replies to a specific comment. **Access Control:** Same as viewing the post. **Pagination:** Uses cursor-based pagination.
     *
     * @tags Comments
     * @name CommentsControllerListRepliesV1
     * @summary List replies to a comment
     * @request GET:/api/v1/posts/{postId}/comments/{commentId}/replies
     * @response `200` `CommentsControllerListRepliesV1Data` Replies retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Comment not found
     */ commentsControllerListRepliesV1: ({ postId, commentId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/comments/${commentId}/replies`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }),
        /**
     * @description Creates or updates a reaction on a post. **Authorization:** - User must be either: - Stage owner/admin/moderator of the post's stage, OR - Subscriber to at least one pass linked to the post **Reaction Types:** - like, love, laugh, wow, sad, angry **Behavior:** - If user has no existing reaction, creates a new one. - If user already reacted, updates to the new reaction type. - Only one reaction per user per post is allowed.
     *
     * @tags Reactions
     * @name ReactionsControllerCreateReactionV1
     * @summary React to a post
     * @request POST:/api/v1/posts/{postId}/reactions
     * @secure
     * @response `201` `ReactionsControllerCreateReactionV1Data` Reaction created/updated successfully
     * @response `400` `ApiErrorResponseDto` Invalid reaction type
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to react to this post
     * @response `404` `ApiErrorResponseDto` Post not found
     */ reactionsControllerCreateReactionV1: ({ postId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/reactions`,
                method: "POST",
                body: data,
                secure: true,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Removes the user's reaction from a post. **Authorization:** User must own the reaction.
     *
     * @tags Reactions
     * @name ReactionsControllerDeleteReactionV1
     * @summary Remove reaction from a post
     * @request DELETE:/api/v1/posts/{postId}/reactions
     * @secure
     * @response `200` `ReactionsControllerDeleteReactionV1Data` Reaction removed successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `404` `ApiErrorResponseDto` Reaction not found or post not found
     */ reactionsControllerDeleteReactionV1: ({ postId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/reactions`,
                method: "DELETE",
                secure: true,
                format: "json",
                ...params
            }),
        /**
     * @description Returns a paginated list of reactions on a post. **Access:** Public - anyone can view reactions. **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Filtering:** Optionally filter by reaction type. **Ordering:** Reactions are sorted by creation date (newest first).
     *
     * @tags Reactions
     * @name ReactionsControllerListReactionsV1
     * @summary List reactions on a post
     * @request GET:/api/v1/posts/{postId}/reactions
     * @response `200` `ReactionsControllerListReactionsV1Data` Reactions retrieved successfully
     * @response `404` `ApiErrorResponseDto` Post not found
     */ reactionsControllerListReactionsV1: ({ postId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/posts/${postId}/reactions`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }),
        /**
     * @description Subscribe to a pass. Free passes create subscription immediately. Paid passes redirect to Stripe payment link.
     *
     * @tags subscriptions
     * @name SubscriptionsControllerJoinPassV1
     * @summary Join a pass
     * @request POST:/api/v1/passes/{passId}/join
     * @secure
     * @response `201` `SubscriptionsControllerJoinPassV1Data` Subscription created (free pass)
     * @response `303` `ApiErrorResponseDto` Redirect to Stripe payment link (paid pass)
     * @response `400` `ApiErrorResponseDto` Paid pass without payment link configured
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `404` `ApiErrorResponseDto` Pass not found
     * @response `409` `ApiErrorResponseDto` Already subscribed to this pass
     */ subscriptionsControllerJoinPassV1: ({ passId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/passes/${passId}/join`,
                method: "POST",
                secure: true,
                format: "json",
                ...params
            }),
        /**
     * @description Send verification OTP to email for signing up to a stage ground pass.
     *
     * @tags subscriptions
     * @name SubscriptionsControllerSendSignUpOtpV1
     * @summary Send OTP for stage sign-up
     * @request POST:/api/v1/stages/{stageId}/sign-up/send-otp
     * @response `200` `SubscriptionsControllerSendSignUpOtpV1Data` OTP sent successfully
     * @response `400` `ApiErrorResponseDto` Invalid request or stage has no ground pass
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ subscriptionsControllerSendSignUpOtpV1: ({ stageId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/sign-up/send-otp`,
                method: "POST",
                body: data,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Verify OTP, create user (if new), create session, and subscribe to ground pass.
     *
     * @tags subscriptions
     * @name SubscriptionsControllerVerifySignUpOtpV1
     * @summary Verify OTP and complete sign-up
     * @request POST:/api/v1/stages/{stageId}/sign-up/verify
     * @response `200` `SubscriptionsControllerVerifySignUpOtpV1Data` Sign-up successful
     * @response `400` `ApiErrorResponseDto` Invalid or expired OTP
     * @response `404` `ApiErrorResponseDto` Stage not found
     * @response `409` `ApiErrorResponseDto` Already subscribed to ground pass
     */ subscriptionsControllerVerifySignUpOtpV1: ({ stageId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/sign-up/verify`,
                method: "POST",
                body: data,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerUploadZipV1
     * @summary Upload OTA update bundle
     * @request POST:/api/v1/ota/upload
     * @response `201` `OtaControllerUploadZipV1Data`
     */ otaControllerUploadZipV1: (query, params = {})=>this.http.request({
                path: `/api/v1/ota/upload`,
                method: "POST",
                query: query,
                ...params
            }),
        /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerGetManifestV1
     * @summary Get OTA manifest for Expo client
     * @request GET:/api/v1/ota/manifest
     * @response `200` `OtaControllerGetManifestV1Data`
     */ otaControllerGetManifestV1: (query, params = {})=>this.http.request({
                path: `/api/v1/ota/manifest`,
                method: "GET",
                query: query,
                ...params
            }),
        /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerGetAssetV1
     * @summary Get OTA asset file
     * @request GET:/api/v1/ota/assets
     * @response `200` `OtaControllerGetAssetV1Data`
     */ otaControllerGetAssetV1: (query, params = {})=>this.http.request({
                path: `/api/v1/ota/assets`,
                method: "GET",
                query: query,
                ...params
            }),
        /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerListUpdatesV1
     * @summary List all OTA updates
     * @request GET:/api/v1/ota
     * @response `200` `OtaControllerListUpdatesV1Data`
     */ otaControllerListUpdatesV1: (params = {})=>this.http.request({
                path: `/api/v1/ota`,
                method: "GET",
                ...params
            }),
        /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerUpdateTypeV1
     * @summary Get update type by updateId
     * @request GET:/api/v1/ota/update-type
     * @response `200` `OtaControllerUpdateTypeV1Data`
     */ otaControllerUpdateTypeV1: (query, params = {})=>this.http.request({
                path: `/api/v1/ota/update-type`,
                method: "GET",
                query: query,
                ...params
            }),
        /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerGetUpdateV1
     * @summary Get specific OTA update
     * @request GET:/api/v1/ota/{id}
     * @response `200` `OtaControllerGetUpdateV1Data`
     */ otaControllerGetUpdateV1: ({ id, ...query }, params = {})=>this.http.request({
                path: `/api/v1/ota/${id}`,
                method: "GET",
                ...params
            }),
        /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerDeleteUpdateV1
     * @summary Delete OTA update
     * @request DELETE:/api/v1/ota/{id}
     * @response `200` `OtaControllerDeleteUpdateV1Data`
     */ otaControllerDeleteUpdateV1: ({ id, ...query }, params = {})=>this.http.request({
                path: `/api/v1/ota/${id}`,
                method: "DELETE",
                ...params
            }),
        /**
     * @description Creates a new scheduled video call for a stage. **Authorization:** User must be the stage owner. **Pass Assignment:** - If `passIds` is not provided or empty, the call is assigned to the stage's ground pass (free pass). - If `passIds` is provided, all passes must belong to the specified stage. **Scheduling:** - `scheduledStartAt` must be in the future. - `scheduledEndAt` must be after `scheduledStartAt`. - A Zoom meeting will be created 15 minutes before the scheduled start time. **Zoom Integration:** - License is allocated 15 minutes before start. - License is released 15 minutes after end. - Join URL becomes available when call is live or 5 minutes before start.
     *
     * @tags Video Calls
     * @name VideoCallsControllerCreateVideoCallV1
     * @summary Create a new video call
     * @request POST:/api/v1/stages/{stageId}/video-calls
     * @secure
     * @response `201` `VideoCallsControllerCreateVideoCallV1Data` Video call created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes or schedule times)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ videoCallsControllerCreateVideoCallV1: ({ stageId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/video-calls`,
                method: "POST",
                body: data,
                secure: true,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Returns a paginated list of video calls for a stage. **Public Access:** Non-authenticated users can view calls from free passes only. Authenticated users see calls from their subscribed passes. Stage members (owner/admin/moderator) see all calls. **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Sorting:** Calls are sorted by scheduled start time (newest first). **Filtering:** - `status`: Filter by call status (scheduled, live, ended, cancelled) - `filter`: Filter by time - 'upcoming' (scheduled + live) or 'past' (ended + cancelled) - `passIds`: Filter by specific passes
     *
     * @tags Video Calls
     * @name VideoCallsControllerListVideoCallsV1
     * @summary List video calls for a stage
     * @request GET:/api/v1/stages/{stageId}/video-calls
     * @response `200` `VideoCallsControllerListVideoCallsV1Data` Video calls retrieved successfully
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ videoCallsControllerListVideoCallsV1: ({ stageId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/video-calls`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }),
        /**
     * @description Returns details of a specific video call. **Public Access:** Non-authenticated users can view calls from free passes only. Authenticated users can view calls from their subscribed passes. Stage members (owner/admin/moderator) can view all calls. **Join URL:** The Zoom join URL is only included when: - The call status is 'live', OR - The call is 'scheduled' and within 5 minutes of the start time
     *
     * @tags Video Calls
     * @name VideoCallsControllerGetVideoCallV1
     * @summary Get details of a video call
     * @request GET:/api/v1/stages/{stageId}/video-calls/{callId}
     * @response `200` `VideoCallsControllerGetVideoCallV1Data` Video call retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to this call
     * @response `404` `ApiErrorResponseDto` Video call not found
     */ videoCallsControllerGetVideoCallV1: ({ stageId, callId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/video-calls/${callId}`,
                method: "GET",
                format: "json",
                ...params
            }),
        /**
     * @description Updates an existing video call. **Authorization:** User must be the stage owner. **Restrictions:** - Cannot update calls that have ended or been cancelled. - If schedule times are changed, jobs are rescheduled accordingly. - If `passIds` is provided, it replaces the existing passes. **Note:** Updating schedule times will reschedule the Zoom license allocation.
     *
     * @tags Video Calls
     * @name VideoCallsControllerUpdateVideoCallV1
     * @summary Update a video call
     * @request PATCH:/api/v1/stages/{stageId}/video-calls/{callId}
     * @secure
     * @response `200` `VideoCallsControllerUpdateVideoCallV1Data` Video call updated successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes, schedule times, or call already ended)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Video call not found
     */ videoCallsControllerUpdateVideoCallV1: ({ stageId, callId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/video-calls/${callId}`,
                method: "PATCH",
                body: data,
                secure: true,
                type: "application/json",
                format: "json",
                ...params
            }),
        /**
     * @description Cancels (soft deletes) a video call. **Authorization:** User must be the stage owner. **Side Effects:** - Call status is set to 'cancelled'. - All scheduled jobs are removed. - If a Zoom license was allocated, it is released. - The Zoom meeting is ended/deleted if it was created.
     *
     * @tags Video Calls
     * @name VideoCallsControllerDeleteVideoCallV1
     * @summary Cancel a video call
     * @request DELETE:/api/v1/stages/{stageId}/video-calls/{callId}
     * @secure
     * @response `204` `VideoCallsControllerDeleteVideoCallV1Data` Video call cancelled successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Video call not found
     */ videoCallsControllerDeleteVideoCallV1: ({ stageId, callId, ...query }, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/video-calls/${callId}`,
                method: "DELETE",
                secure: true,
                ...params
            }),
        /**
     * @description Uploads a file for a stage (posts, stage content). Requires stage membership (owner, admin, or moderator). **Path:** stages/{stageId}/{userId}/{assetType}/{timestamp}_{filename} **Image Compression:** - Images are automatically compressed to WebP format - Default quality for posts: 85 (lower = more compression) - GIF and SVG are not compressed - Both original and compressed versions are stored **Supported MIME Types:** - Image: JPEG, PNG, WebP (compressed), GIF (not compressed) - Video: MP4, QuickTime, WebM - Audio: MP3, WAV, OGG, AAC
     *
     * @tags Assets
     * @name AssetsControllerUploadStageAssetV1
     * @summary Upload stage asset
     * @request POST:/api/v1/stages/{stageId}/assets/upload
     * @secure
     * @response `201` `AssetsControllerUploadStageAssetV1Data` Asset uploaded successfully
     * @response `400` `ApiErrorResponseDto` Invalid file type or size
     * @response `401` `ApiErrorResponseDto` Unauthorized
     * @response `403` `ApiErrorResponseDto` Not a stage member
     * @response `404` `ApiErrorResponseDto` Stage not found
     */ assetsControllerUploadStageAssetV1: ({ stageId, ...query }, data, params = {})=>this.http.request({
                path: `/api/v1/stages/${stageId}/assets/upload`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: "multipart/form-data",
                format: "json",
                ...params
            }),
        /**
     * @description Uploads a file for user profile (dp, cover). **Path:** users/{userId}/{purpose}/{assetType}/{timestamp}_{filename} **Purpose:** - dp: Profile picture (default quality: 60 - high compression) - cover: Cover/banner image (default quality: 70) **Image Compression:** - Images are automatically compressed to WebP format - Profile pics are more compressed than covers - GIF and SVG are not compressed **Supported MIME Types:** - Image: JPEG, PNG, WebP (compressed), GIF (not compressed) - Video: MP4, QuickTime, WebM - Audio: MP3, WAV, OGG, AAC
     *
     * @tags Assets
     * @name AssetsControllerUploadUserAssetV1
     * @summary Upload user asset
     * @request POST:/api/v1/users/assets/upload
     * @secure
     * @response `201` `AssetsControllerUploadUserAssetV1Data` Asset uploaded successfully
     * @response `400` `ApiErrorResponseDto` Invalid file type, size, or purpose
     * @response `401` `ApiErrorResponseDto` Unauthorized
     */ assetsControllerUploadUserAssetV1: (query, data, params = {})=>this.http.request({
                path: `/api/v1/users/assets/upload`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: "multipart/form-data",
                format: "json",
                ...params
            }),
        /**
     * @description Uploads a general-purpose public file. **Path:** public/{assetType}/{timestamp}_{filename} **Image Compression:** - Images are automatically compressed to WebP format - Default quality: 80 - GIF and SVG are not compressed **Supported MIME Types:** - Image: JPEG, PNG, WebP (compressed), GIF (not compressed) - Video: MP4, QuickTime, WebM - Audio: MP3, WAV, OGG, AAC
     *
     * @tags Assets
     * @name AssetsControllerUploadPublicAssetV1
     * @summary Upload public asset
     * @request POST:/api/v1/assets/upload
     * @secure
     * @response `201` `AssetsControllerUploadPublicAssetV1Data` Asset uploaded successfully
     * @response `400` `ApiErrorResponseDto` Invalid file type or size
     * @response `401` `ApiErrorResponseDto` Unauthorized
     */ assetsControllerUploadPublicAssetV1: (query, data, params = {})=>this.http.request({
                path: `/api/v1/assets/upload`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: "multipart/form-data",
                format: "json",
                ...params
            }),
        /**
     * @description Unified endpoint for uploading assets. Context is inferred from the `purpose` parameter. **Purpose:** - `dp`: User profile picture - `cover`: User cover/banner image - `post`: Stage post asset (requires `stageId` and stage membership) - *(omitted)*: Public/general-purpose upload **Storage Paths:** - dp/cover: users/{userId}/{purpose}/{assetType}/{timestamp}_{filename} - post: stages/{stageId}/{userId}/{assetType}/{timestamp}_{filename} - public: public/{assetType}/{timestamp}_{filename} **Image Compression:** - Images are automatically compressed to WebP format - Default quality: dp=60, cover=70, post=85, public=80 - GIF and SVG are not compressed **Supported MIME Types:** - Image: JPEG, PNG, WebP (compressed), GIF (not compressed) - Video: MP4, QuickTime, WebM - Audio: MP3, WAV, OGG, AAC
     *
     * @tags Assets
     * @name AssetsControllerUploadV1
     * @summary Upload asset (consolidated)
     * @request POST:/api/v1/upload
     * @secure
     * @response `201` `AssetsControllerUploadV1Data` Asset uploaded successfully
     * @response `400` `ApiErrorResponseDto` Invalid file type, size, purpose, or missing stageId for post
     * @response `401` `ApiErrorResponseDto` Unauthorized
     * @response `403` `ApiErrorResponseDto` Forbidden - insufficient permissions for stage upload
     * @response `404` `ApiErrorResponseDto` Stage not found (for post purpose)
     */ assetsControllerUploadV1: (query, data, params = {})=>this.http.request({
                path: `/api/v1/upload`,
                method: "POST",
                query: query,
                body: data,
                secure: true,
                type: "multipart/form-data",
                format: "json",
                ...params
            })
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiClientError",
    ()=>ApiClientError,
    "api",
    ()=>api,
    "ping",
    ()=>ping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$api$2f$generated$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/libs/api/generated/index.ts [app-client] (ecmascript)");
;
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:4444';
const httpClient = new __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$api$2f$generated$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpClient"]({
    baseURL: API_URL,
    withCredentials: true
});
const apiClient = new __TURBOPACK__imported__module__$5b$project$5d2f$libs$2f$api$2f$generated$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Api"](httpClient);
const api = apiClient.api;
const ping = apiClient.ping;
class ApiClientError extends Error {
    statusCode;
    error;
    constructor(message, statusCode, error){
        super(message), this.statusCode = statusCode, this.error = error;
        this.name = 'ApiClientError';
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/query-keys.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Type-safe query key factory
 * Usage: queryKeys.stages.all, queryKeys.stages.detail('slug')
 */ __turbopack_context__.s([
    "queryKeys",
    ()=>queryKeys
]);
const queryKeys = {
    stages: {
        all: [
            'stages'
        ],
        lists: ()=>[
                ...queryKeys.stages.all,
                'list'
            ],
        list: (filters)=>[
                ...queryKeys.stages.lists(),
                filters
            ],
        details: ()=>[
                ...queryKeys.stages.all,
                'detail'
            ],
        detail: (slug)=>[
                ...queryKeys.stages.details(),
                slug
            ],
        passes: (stageId)=>[
                ...queryKeys.stages.detail(stageId),
                'passes'
            ],
        members: (stageId)=>[
                ...queryKeys.stages.detail(stageId),
                'members'
            ]
    },
    posts: {
        all: [
            'posts'
        ],
        lists: ()=>[
                ...queryKeys.posts.all,
                'list'
            ],
        list: (stageId, filters)=>[
                ...queryKeys.posts.lists(),
                stageId,
                filters
            ],
        infinite: (stageId)=>[
                ...queryKeys.posts.all,
                'infinite',
                stageId
            ],
        details: ()=>[
                ...queryKeys.posts.all,
                'detail'
            ],
        detail: (postId)=>[
                ...queryKeys.posts.details(),
                postId
            ]
    },
    users: {
        all: [
            'users'
        ],
        current: ()=>[
                ...queryKeys.users.all,
                'current'
            ],
        details: ()=>[
                ...queryKeys.users.all,
                'detail'
            ],
        detail: (userId)=>[
                ...queryKeys.users.details(),
                userId
            ],
        subscriptions: (userId)=>[
                ...queryKeys.users.detail(userId),
                'subscriptions'
            ]
    },
    subscriptions: {
        all: [
            'subscriptions'
        ],
        lists: ()=>[
                ...queryKeys.subscriptions.all,
                'list'
            ],
        list: (filters)=>[
                ...queryKeys.subscriptions.lists(),
                filters
            ],
        details: ()=>[
                ...queryKeys.subscriptions.all,
                'detail'
            ],
        detail: (subscriptionId)=>[
                ...queryKeys.subscriptions.details(),
                subscriptionId
            ]
    },
    comments: {
        all: [
            'comments'
        ],
        lists: ()=>[
                ...queryKeys.comments.all,
                'list'
            ],
        list: (postId)=>[
                ...queryKeys.comments.lists(),
                postId
            ]
    },
    reactions: {
        all: [
            'reactions'
        ],
        lists: ()=>[
                ...queryKeys.reactions.all,
                'list'
            ],
        list: (postId)=>[
                ...queryKeys.reactions.lists(),
                postId
            ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/use-stages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStage",
    ()=>useStage,
    "useStagePasses",
    ()=>useStagePasses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/query-keys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
function useStage(slug, options) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].stages.detail(slug),
        queryFn: {
            "useStage.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].api.stagesControllerFindBySlugV1({
                    slug
                });
                return data.result;
            }
        }["useStage.useQuery"],
        enabled: !!slug,
        ...options
    });
}
_s(useStage, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useStagePasses(stageId, options) {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].stages.passes(stageId),
        queryFn: {
            "useStagePasses.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].api.stagesControllerListPassesV1({
                    stageId
                });
                return data.result;
            }
        }["useStagePasses.useQuery"],
        enabled: !!stageId,
        ...options
    });
}
_s1(useStagePasses, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/use-posts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfinitePosts",
    ()=>useInfinitePosts,
    "usePost",
    ()=>usePost,
    "useStagePosts",
    ()=>useStagePosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/query-keys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
function usePost(postId, options) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].posts.detail(postId),
        queryFn: {
            "usePost.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].posts.postsControllerGetPost({
                    postId
                });
                return data.result;
            }
        }["usePost.useQuery"],
        enabled: !!postId,
        ...options
    });
}
_s(usePost, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useStagePosts(stageId, options) {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].posts.list(stageId),
        queryFn: {
            "useStagePosts.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].posts.postsControllerListPosts({
                    stageId
                });
                return data.result.posts;
            }
        }["useStagePosts.useQuery"],
        enabled: !!stageId,
        ...options
    });
}
_s1(useStagePosts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useInfinitePosts(stageId) {
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].posts.infinite(stageId),
        queryFn: {
            "useInfinitePosts.useInfiniteQuery": async ({ pageParam })=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].posts.postsControllerListPosts({
                    stageId,
                    cursor: pageParam ?? undefined
                });
                return data.result;
            }
        }["useInfinitePosts.useInfiniteQuery"],
        initialPageParam: null,
        getNextPageParam: {
            "useInfinitePosts.useInfiniteQuery": (lastPage)=>lastPage.nextCursor
        }["useInfinitePosts.useInfiniteQuery"],
        select: {
            "useInfinitePosts.useInfiniteQuery": (data)=>data.pages.flatMap({
                    "useInfinitePosts.useInfiniteQuery": (page)=>page.posts
                }["useInfinitePosts.useInfiniteQuery"])
        }["useInfinitePosts.useInfiniteQuery"],
        enabled: !!stageId
    });
}
_s2(useInfinitePosts, "xMCOiuh9cV5e8gBi6hogZoGnISk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/use-modal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useModal",
    ()=>useModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$modal$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/modal-context.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useModal() {
    _s();
    const { modals, openModal: contextOpenModal, closeModal: contextCloseModal, closeAllModals } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$modal$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModalContext"])();
    const openModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useModal.useCallback[openModal]": (config)=>{
            return contextOpenModal(config);
        }
    }["useModal.useCallback[openModal]"], [
        contextOpenModal
    ]);
    const closeModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useModal.useCallback[closeModal]": (id, result)=>{
            if (id) {
                contextCloseModal(id, result);
            } else if (modals.length > 0) {
                // Close the topmost modal
                const topModal = modals[modals.length - 1];
                contextCloseModal(topModal.id, result);
            }
        }
    }["useModal.useCallback[closeModal]"], [
        contextCloseModal,
        modals
    ]);
    return {
        openModal,
        closeModal,
        closeAllModals,
        isAnyModalOpen: modals.length > 0,
        modalCount: modals.length
    };
}
_s(useModal, "3j7WAUlTTGDL8lWqGgttMrKykHA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$modal$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModalContext"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/use-header-scroll-progress.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHeaderScrollProgress",
    ()=>useHeaderScrollProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useHeaderScrollProgress(options = {}) {
    _s();
    const { threshold = 150 } = options;
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        scrollY: 0,
        isCollapsed: false,
        progress: 0,
        direction: null
    });
    const virtualScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isVirtualMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    const touchStartY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastDirection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const updateState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHeaderScrollProgress.useCallback[updateState]": (delta)=>{
            const direction = delta > 0 ? 'down' : delta < 0 ? 'up' : null;
            if (direction) {
                lastDirection.current = direction;
            }
            // Update virtual scroll (clamped between 0 and threshold)
            virtualScroll.current = Math.max(0, Math.min(threshold, virtualScroll.current + delta));
            const progress = virtualScroll.current / threshold;
            const isCollapsed = virtualScroll.current >= threshold;
            // Switch to real scroll mode when fully collapsed
            if (isCollapsed && delta > 0) {
                isVirtualMode.current = false;
            }
            setState({
                "useHeaderScrollProgress.useCallback[updateState]": (prev)=>{
                    if (prev.progress === progress && prev.isCollapsed === isCollapsed && prev.direction === lastDirection.current) {
                        return prev;
                    }
                    return {
                        scrollY: virtualScroll.current,
                        isCollapsed,
                        progress,
                        direction: lastDirection.current
                    };
                }
            }["useHeaderScrollProgress.useCallback[updateState]"]);
        }
    }["useHeaderScrollProgress.useCallback[updateState]"], [
        threshold
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHeaderScrollProgress.useEffect": ()=>{
            const handleWheel = {
                "useHeaderScrollProgress.useEffect.handleWheel": (e)=>{
                    // Re-enter virtual mode when at top of page and scrolling up
                    if (!isVirtualMode.current && window.scrollY <= 0 && e.deltaY < 0) {
                        isVirtualMode.current = true;
                        virtualScroll.current = threshold;
                    }
                    if (isVirtualMode.current) {
                        e.preventDefault();
                        updateState(e.deltaY);
                    }
                }
            }["useHeaderScrollProgress.useEffect.handleWheel"];
            const handleTouchStart = {
                "useHeaderScrollProgress.useEffect.handleTouchStart": (e)=>{
                    touchStartY.current = e.touches[0].clientY;
                }
            }["useHeaderScrollProgress.useEffect.handleTouchStart"];
            const handleTouchMove = {
                "useHeaderScrollProgress.useEffect.handleTouchMove": (e)=>{
                    const touchY = e.touches[0].clientY;
                    const deltaY = touchStartY.current - touchY; // Inverted: swipe up = positive delta
                    touchStartY.current = touchY;
                    // Re-enter virtual mode when at top of page and scrolling up
                    if (!isVirtualMode.current && window.scrollY <= 0 && deltaY < 0) {
                        isVirtualMode.current = true;
                        virtualScroll.current = threshold;
                    }
                    if (isVirtualMode.current) {
                        e.preventDefault();
                        updateState(deltaY);
                    }
                }
            }["useHeaderScrollProgress.useEffect.handleTouchMove"];
            const handleScroll = {
                "useHeaderScrollProgress.useEffect.handleScroll": ()=>{
                    if (!isVirtualMode.current) {
                        const scrollY = window.scrollY;
                        // When scrolled back to top, re-enter virtual mode
                        if (scrollY <= 0) {
                            isVirtualMode.current = true;
                            virtualScroll.current = threshold; // Start from collapsed state
                        }
                        // Keep header collapsed during real scrolling
                        setState({
                            "useHeaderScrollProgress.useEffect.handleScroll": (prev)=>{
                                if (prev.progress === 1 && prev.isCollapsed) {
                                    return prev;
                                }
                                return {
                                    scrollY: threshold + scrollY,
                                    isCollapsed: true,
                                    progress: 1,
                                    direction: lastDirection.current
                                };
                            }
                        }["useHeaderScrollProgress.useEffect.handleScroll"]);
                    }
                }
            }["useHeaderScrollProgress.useEffect.handleScroll"];
            // wheel and touchmove need { passive: false } to allow preventDefault
            window.addEventListener('wheel', handleWheel, {
                passive: false
            });
            window.addEventListener('touchstart', handleTouchStart, {
                passive: true
            });
            window.addEventListener('touchmove', handleTouchMove, {
                passive: false
            });
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "useHeaderScrollProgress.useEffect": ()=>{
                    window.removeEventListener('wheel', handleWheel);
                    window.removeEventListener('touchstart', handleTouchStart);
                    window.removeEventListener('touchmove', handleTouchMove);
                    window.removeEventListener('scroll', handleScroll);
                }
            })["useHeaderScrollProgress.useEffect"];
        }
    }["useHeaderScrollProgress.useEffect"], [
        threshold,
        updateState
    ]);
    return state;
}
_s(useHeaderScrollProgress, "HLGe+0XsFZViKwN379KHaJzTqrE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/use-intersection-observer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIntersectionObserver",
    ()=>useIntersectionObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useIntersectionObserver(options = {}) {
    _s();
    const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options;
    const [entry, setEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [node, setNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const frozen = entry?.isIntersecting && freezeOnceVisible;
    // Callback ref pattern for flexibility with conditional rendering
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIntersectionObserver.useCallback[ref]": (node)=>{
            setNode(node);
        }
    }["useIntersectionObserver.useCallback[ref]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIntersectionObserver.useEffect": ()=>{
            // Skip if no node to observe or already frozen
            if (!node || frozen) return;
            // Check for browser support
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !('IntersectionObserver' in window)) {
                return;
            }
            const observer = new IntersectionObserver({
                "useIntersectionObserver.useEffect": ([observerEntry])=>{
                    setEntry(observerEntry);
                }
            }["useIntersectionObserver.useEffect"], {
                threshold,
                root,
                rootMargin
            });
            observer.observe(node);
            return ({
                "useIntersectionObserver.useEffect": ()=>{
                    observer.disconnect();
                }
            })["useIntersectionObserver.useEffect"];
        }
    }["useIntersectionObserver.useEffect"], [
        node,
        threshold,
        root,
        rootMargin,
        frozen
    ]);
    return {
        ref,
        entry,
        isIntersecting: !!entry?.isIntersecting
    };
}
_s(useIntersectionObserver, "foepFSaTmpWcNp4K/bEe9juR9Ps=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Stage hooks
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-stages.ts [app-client] (ecmascript)");
// Post hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-posts.ts [app-client] (ecmascript)");
// Modal hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$modal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-modal.ts [app-client] (ecmascript)");
// Scroll hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$header$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-header-scroll-progress.ts [app-client] (ecmascript)");
// Intersection hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$intersection$2d$observer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-intersection-observer.ts [app-client] (ecmascript)");
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Input({ className, type, loading, ...props }) {
    _s();
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"])(loading);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            variant: "input",
            className: className
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ui/input.tsx",
            lineNumber: 18,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/input.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Input, "Hs0pI91j6t5W0c25yImt9AB0p0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"]
    ];
});
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/login-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginModal",
    ()=>LoginModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function LoginModal(props) {
    _s();
    // Support both new and legacy prop patterns
    const isOpen = 'isOpen' in props ? props.isOpen : props.open;
    const handleClose = 'onClose' in props ? props.onClose : ()=>props.onOpenChange(false);
    const { community, onSuccess } = props;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        '',
        '',
        '',
        '',
        '',
        ''
    ]);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('initial');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const otpRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Reset state when modal closes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginModal.useEffect": ()=>{
            if (!isOpen) {
                setStep('initial');
                setEmail('');
                setOtp([
                    '',
                    '',
                    '',
                    '',
                    '',
                    ''
                ]);
                setError(null);
            }
        }
    }["LoginModal.useEffect"], [
        isOpen
    ]);
    const handleGoogleSignIn = async ()=>{
        setError(null);
        setIsLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"].social({
                provider: 'google',
                callbackURL: window.location.pathname
            });
        } catch  {
            setError('Failed to sign in with Google');
            setIsLoading(false);
        }
    };
    const handleSendOtp = async (e)=>{
        e.preventDefault();
        if (!email) return;
        setError(null);
        setIsLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emailOtp"].sendVerificationOtp({
                email,
                type: 'sign-in',
                // Pass stageId as custom field - will be captured by backend hooks
                stageId: community.id
            });
            if (result.error) {
                setError(result.error.message || 'Failed to send OTP');
            } else {
                setStep('otp');
            }
        } catch  {
            setError('Failed to send OTP. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    const handleOtpChange = (index, value)=>{
        if (value.length > 1) {
            // Handle paste
            const pastedValue = value.slice(0, 6).split('');
            const newOtp = [
                ...otp
            ];
            pastedValue.forEach((char, i)=>{
                if (index + i < 6) {
                    newOtp[index + i] = char;
                }
            });
            setOtp(newOtp);
            const nextIndex = Math.min(index + pastedValue.length, 5);
            otpRefs.current[nextIndex]?.focus();
        } else {
            const newOtp = [
                ...otp
            ];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };
    const handleOtpKeyDown = (index, e)=>{
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };
    const handleVerifyOtp = async (e)=>{
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) return;
        setError(null);
        setIsLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"].emailOtp({
                email,
                otp: otpValue
            });
            if (result.error) {
                setError(result.error.message || 'Invalid OTP');
            } else {
                handleClose('success');
                onSuccess?.();
                router.refresh();
            }
        } catch  {
            setError('Failed to verify OTP. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    const handleResendCode = async ()=>{
        setError(null);
        setIsLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emailOtp"].sendVerificationOtp({
                email,
                type: 'sign-in',
                // Pass stageId as custom field - will be captured by backend hooks
                stageId: community.id
            });
            if (result.error) {
                setError(result.error.message || 'Failed to resend OTP');
            }
        } catch  {
            setError('Failed to resend OTP. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    const handleBack = ()=>{
        setStep('initial');
        setOtp([
            '',
            '',
            '',
            '',
            '',
            ''
        ]);
        setError(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#1a191b] border border-zinc-800 p-0 w-full max-w-[480px] rounded-t-2xl md:rounded-lg overflow-hidden",
        children: step === 'initial' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-8 px-6 py-12 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>handleClose(),
                    className: "absolute top-6 right-6 text-zinc-400 hover:text-zinc-200 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-6"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/80 text-sm text-center max-w-sm",
                    children: "You are viewing free content. Signup to continue & engage"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            onClick: handleGoogleSignIn,
                            disabled: isLoading,
                            className: "w-full h-12 bg-white/8 hover:bg-white/12 text-white border-0 rounded-full text-lg font-medium gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    className: "size-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                                            fill: "#4285F4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                            lineNumber: 245,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                                            fill: "#34A853"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                                            fill: "#FBBC05"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                            lineNumber: 253,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                                            fill: "#EA4335"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                            lineNumber: 257,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, this),
                                "Continue with Google"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 238,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            disabled: isLoading,
                            className: "w-full h-12 bg-white/8 hover:bg-white/12 text-white border-0 rounded-full text-lg font-medium gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    className: "size-5 fill-current",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                        lineNumber: 272,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this),
                                "Continue with Apple"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white text-center text-lg",
                            children: "or"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSendOtp,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "email",
                                    placeholder: "Email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    disabled: isLoading,
                                    className: "w-full h-12 bg-black/25 border-white/15 text-white placeholder:text-zinc-500 rounded-full px-4 text-base"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-400 text-sm text-center",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 292,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: isLoading || !email,
                                    className: "w-full h-12 bg-zinc-100 hover:bg-white text-zinc-900 rounded-full text-lg font-medium",
                                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "size-5 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                        lineNumber: 301,
                                        columnNumber: 19
                                    }, this) : 'Continue'
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                    lineNumber: 236,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/60 text-xs text-center",
                    children: [
                        "By continuing, you agree to Backstage Pass's",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#",
                            className: "text-white underline",
                            children: "Terms & Privacy"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                    lineNumber: 310,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/login-modal.tsx",
            lineNumber: 196,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-6 px-6 py-12 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleBack,
                    className: "absolute top-6 left-6 text-zinc-400 hover:text-zinc-200 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "size-6"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: "Back"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 325,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                    lineNumber: 320,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-2 pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-[28px] font-semibold text-white tracking-tight",
                            children: "Enter verification code"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-zinc-400 text-base max-w-sm",
                            children: [
                                "We've sent a 6-digit code to ",
                                email,
                                ". Enter it below to verify your account."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                    lineNumber: 329,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleVerifyOtp,
                    className: "w-full space-y-4 mt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/60 text-sm text-center",
                            children: "Enter code below"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-4",
                            children: otp.map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    ref: (el)=>{
                                        otpRefs.current[index] = el;
                                    },
                                    type: "text",
                                    inputMode: "numeric",
                                    maxLength: 6,
                                    value: digit,
                                    onChange: (e)=>handleOtpChange(index, e.target.value.replace(/\D/g, '')),
                                    onKeyDown: (e)=>handleOtpKeyDown(index, e),
                                    disabled: isLoading,
                                    className: "w-12 h-12 bg-black/25 border-white/15 text-white text-center text-xl font-mono rounded-lg px-0"
                                }, index, false, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 347,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 345,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-400 text-sm text-center",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 363,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            disabled: isLoading || otp.join('').length !== 6,
                            className: "w-full h-12 bg-zinc-100 hover:bg-white text-zinc-900 rounded-full text-lg font-medium",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "size-5 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                lineNumber: 372,
                                columnNumber: 17
                            }, this) : 'Verify'
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "ghost",
                                    onClick: handleResendCode,
                                    disabled: isLoading,
                                    className: "text-zinc-400 hover:text-white hover:bg-white/10 rounded-full",
                                    children: "Resend Code"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 380,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "ghost",
                                    onClick: handleBack,
                                    disabled: isLoading,
                                    className: "text-zinc-400 hover:text-white hover:bg-white/10 rounded-full",
                                    children: "Change Email"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                                    lineNumber: 389,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/login-modal.tsx",
                            lineNumber: 379,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/login-modal.tsx",
                    lineNumber: 339,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/login-modal.tsx",
            lineNumber: 318,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/login-modal.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s(LoginModal, "doAZmQe/B0koTD7DhEz34EbBU2w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LoginModal;
var _c;
__turbopack_context__.k.register(_c, "LoginModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/profile/profile-stats.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileStats",
    ()=>ProfileStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/text.tsx [app-client] (ecmascript)");
'use client';
;
;
function formatCount(count) {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
}
function ProfileStats({ subscribersCount, postsCount }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3 text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        className: "font-semibold text-foreground w-8",
                        children: formatCount(subscribersCount)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        children: "Subscribers"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted-foreground",
                children: "|"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        className: "font-semibold text-foreground w-6",
                        children: formatCount(postsCount)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        children: "Posts"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/profile/profile-stats.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = ProfileStats;
var _c;
__turbopack_context__.k.register(_c, "ProfileStats");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ui/image.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Image",
    ()=>Image
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Image({ className, skeleton, ...props }) {
    _s();
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"])(skeleton);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            variant: "image",
            className: className
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/ui/image.tsx",
            lineNumber: 18,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        "data-slot": "image",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/image.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Image, "Hs0pI91j6t5W0c25yImt9AB0p0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSkeletonLoading"]
    ];
});
_c = Image;
;
var _c;
__turbopack_context__.k.register(_c, "Image");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/public/main_logo.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/main_logo.cabc8675.svg");}),
"[project]/apps/web/public/main_logo.svg.mjs { IMAGE => \"[project]/apps/web/public/main_logo.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$public$2f$main_logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/apps/web/public/main_logo.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$public$2f$main_logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 202,
    height: 27,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/profile/profile-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileHeader",
    ()=>ProfileHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$modal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-modal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-stages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$login$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/login-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$profile$2f$profile$2d$stats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/profile/profile-stats.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$public$2f$main_logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$public$2f$main_logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/apps/web/public/main_logo.svg.mjs { IMAGE => "[project]/apps/web/public/main_logo.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Tab icons from Figma
const CompassIcon = ({ className, active })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: "20",
        height: "20",
        viewBox: "0 0 16.25 16.25",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M8.125 0C6.51803 0 4.94714 0.476523 3.611 1.36931C2.27485 2.2621 1.23344 3.53105 0.618482 5.0157C0.00352043 6.50035 -0.157382 8.13401 0.156123 9.71011C0.469628 11.2862 1.24346 12.7339 2.37976 13.8702C3.51606 15.0065 4.9638 15.7804 6.53989 16.0939C8.11599 16.4074 9.74966 16.2465 11.2343 15.6315C12.719 15.0166 13.9879 13.9752 14.8807 12.639C15.7735 11.3029 16.25 9.73197 16.25 8.125C16.2477 5.97081 15.391 3.90551 13.8677 2.38227C12.3445 0.85903 10.2792 0.00227486 8.125 0ZM12.1547 4.51484L9.65469 9.51484C9.62408 9.57511 9.57511 9.62408 9.51485 9.65469L4.51485 12.1547C4.45615 12.1842 4.38965 12.1944 4.3248 12.184C4.25994 12.1735 4.20003 12.1429 4.15358 12.0964C4.10713 12.05 4.0765 11.9901 4.06604 11.9252C4.05558 11.8604 4.06582 11.7939 4.09532 11.7352L6.59532 6.73516C6.62592 6.67489 6.6749 6.62592 6.73516 6.59531L11.7352 4.09531C11.7939 4.06582 11.8604 4.05558 11.9252 4.06604C11.9901 4.0765 12.05 4.10713 12.0964 4.15358C12.1429 4.20003 12.1735 4.25994 12.184 4.32479C12.1944 4.38964 12.1842 4.45614 12.1547 4.51484Z",
            fill: active ? '#B8860B' : 'currentColor'
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
            lineNumber: 28,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
        lineNumber: 20,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = CompassIcon;
const TicketIcon = ({ className, active })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: "20",
        height: "20",
        viewBox: "0 0 17.5 12.5",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M16.4992 4.4125C16.7816 4.35505 17.0354 4.20182 17.2178 3.97874C17.4001 3.75566 17.4998 3.47642 17.5 3.18828V1.25C17.5 0.918479 17.3683 0.600537 17.1339 0.366116C16.8995 0.131696 16.5815 0 16.25 0H1.25C0.918482 0 0.600539 0.131696 0.366119 0.366116C0.131698 0.600537 2.38183e-06 0.918479 2.38183e-06 1.25V3.18828C0.000160368 3.47642 0.0998582 3.75566 0.282225 3.97874C0.464593 4.20182 0.71843 4.35505 1.00078 4.4125C1.42298 4.50005 1.80209 4.73044 2.07427 5.06485C2.34644 5.39926 2.49505 5.81726 2.49505 6.24844C2.49505 6.67961 2.34644 7.09761 2.07427 7.43202C1.80209 7.76643 1.42298 7.99682 1.00078 8.08437C0.717904 8.14193 0.463664 8.29562 0.281236 8.51935C0.0988082 8.74307 -0.000560924 9.02304 2.38183e-06 9.31172V11.25C2.38183e-06 11.5815 0.131698 11.8995 0.366119 12.1339C0.600539 12.3683 0.918482 12.5 1.25 12.5H16.25C16.5815 12.5 16.8995 12.3683 17.1339 12.1339C17.3683 11.8995 17.5 11.5815 17.5 11.25V9.31172C17.4998 9.02358 17.4001 8.74434 17.2178 8.52126C17.0354 8.29818 16.7816 8.14495 16.4992 8.0875C16.077 7.99995 15.6979 7.76956 15.4257 7.43515C15.1536 7.10074 15.005 6.68274 15.005 6.25156C15.005 5.82039 15.1536 5.40239 15.4257 5.06798C15.6979 4.73357 16.077 4.50318 16.4992 4.41562V4.4125ZM1.25 9.3125C1.95601 9.16868 2.59064 8.78531 3.04644 8.22729C3.50224 7.66928 3.75122 6.9709 3.75122 6.25039C3.75122 5.52988 3.50224 4.8315 3.04644 4.27349C2.59064 3.71547 1.95601 3.3321 1.25 3.18828V1.25H5.625V11.25H1.25V9.3125ZM16.25 9.3125V11.25H6.875V1.25H16.25V3.1875C15.544 3.33132 14.9094 3.71469 14.4536 4.27271C13.9978 4.83072 13.7488 5.5291 13.7488 6.24961C13.7488 6.97012 13.9978 7.6685 14.4536 8.22651C14.9094 8.78453 15.544 9.1679 16.25 9.31172V9.3125Z",
            fill: active ? '#B8860B' : 'currentColor',
            fillOpacity: active ? 1 : 0.61
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
            lineNumber: 44,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = TicketIcon;
/**
 * Linear interpolation helper for smooth morphing animations
 */ function lerp(start, end, progress) {
    return start + (end - start) * progress;
}
// Animation constants
const INITIAL = {
    avatarSize: 142,
    nameSize: 42,
    headerHeight: 280
};
const FINAL = {
    avatar: {
        size: 32
    },
    name: {
        size: 16
    },
    headerHeight: 60
};
function ProfileHeader({ slug, progress }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { openModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$modal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    const { data: session, isPending: isSessionPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { data: stage, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStage"])(slug);
    // Refs for animated elements
    const headerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const avatarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tabsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // State for captured initial positions
    const [initialPositions, setInitialPositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const user = session?.user;
    const isLoggedIn = !!user;
    // Tab state
    const isPasses = pathname === `/${slug}/passes`;
    const currentTab = isPasses ? 'passes' : 'backstage';
    // Capture initial positions on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ProfileHeader.useLayoutEffect": ()=>{
            if (!avatarRef.current || !nameRef.current || !tabsRef.current || !headerRef.current) return;
            if (isLoading) return; // Wait for data to load
            const headerRect = headerRef.current.getBoundingClientRect();
            const avatarRect = avatarRef.current.getBoundingClientRect();
            const nameRect = nameRef.current.getBoundingClientRect();
            const tabsRect = tabsRef.current.getBoundingClientRect();
            setInitialPositions({
                avatar: {
                    x: avatarRect.left,
                    y: avatarRect.top
                },
                name: {
                    x: nameRect.left,
                    y: nameRect.top
                },
                tabs: {
                    x: tabsRect.left,
                    y: tabsRect.top,
                    width: tabsRect.width,
                    height: tabsRect.height
                },
                header: {
                    height: headerRect.height,
                    top: headerRect.top,
                    width: headerRect.width
                }
            });
        }
    }["ProfileHeader.useLayoutEffect"], [
        isLoading
    ]);
    const handleTabChange = (value)=>{
        if (value === 'backstage') {
            router.push(`/${slug}/backstage`);
        } else if (value === 'passes') {
            router.push(`/${slug}/passes`);
        }
    };
    const handleOpenLoginModal = ()=>{
        if (!stage) return;
        openModal({
            component: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$login$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoginModal"],
            props: {
                community: {
                    id: stage.id,
                    name: stage.name,
                    image: stage.image,
                    subscribersCount: stage.subscribersCount,
                    owner: {
                        name: stage.owner.name,
                        image: stage.owner.image
                    }
                }
            },
            callbacks: {
                onClose: (result)=>{
                    if (result === 'success') {
                        router.refresh();
                    }
                }
            },
            settings: {
                closeOnOverlayClick: false
            }
        });
    };
    // Calculate animated values
    const headerHeight = initialPositions ? lerp(initialPositions.header.height, FINAL.headerHeight, progress) : INITIAL.headerHeight;
    // Avatar animation: scale from 142px to 32px, translate to top-left
    const avatarScale = lerp(1, FINAL.avatar.size / INITIAL.avatarSize, progress);
    const avatarTranslateX = initialPositions ? lerp(0, 24 - initialPositions.avatar.x, progress) : 0;
    const avatarTranslateY = initialPositions ? lerp(0, 14 - initialPositions.avatar.y + (initialPositions.header.top || 0), progress) : 0;
    // Name animation: scale from 42px to 16px, translate next to collapsed avatar
    const nameScale = lerp(1, FINAL.name.size / INITIAL.nameSize, progress);
    // Final X position: avatar left (24) + avatar size (32) + gap (12) = 68
    const nameTranslateX = initialPositions ? lerp(0, 68 - initialPositions.name.x, progress) : 0;
    const nameTranslateY = initialPositions ? lerp(0, 20 - initialPositions.name.y + (initialPositions.header.top || 0), progress) : 0;
    // Tabs animation: use absolute positioning to animate from bottom to center
    // Initial position: relative to header top (tabs.y - header.top)
    // Final position: centered vertically in 60px header, centered horizontally
    const tabsInitialTop = initialPositions ? initialPositions.tabs.y - initialPositions.header.top : 232; // approximate: top nav (~52px) + profile section (~180px)
    const tabsInitialLeft = initialPositions ? initialPositions.tabs.x : 208; // matches md:px-[208px] on desktop
    // Final position: vertically centered in 60px header, horizontally centered
    const tabsFinalTop = (FINAL.headerHeight - (initialPositions?.tabs.height || 44)) / 2;
    const tabsFinalLeft = initialPositions ? (initialPositions.header.width - initialPositions.tabs.width) / 2 : 0;
    // Interpolate positions
    const tabsTop = lerp(tabsInitialTop, tabsFinalTop, progress);
    const tabsLeft = lerp(tabsInitialLeft, tabsFinalLeft, progress);
    // Fade out elements (faster fade)
    const fadeOpacity = Math.max(0, 1 - progress * 1.5);
    const faceDescriptionOpacity = Math.max(0, 1 - progress * 5);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonProvider"], {
        loading: isLoading,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            ref: headerRef,
            className: "sticky top-0 z-50 overflow-hidden relative",
            style: {
                height: headerHeight,
                willChange: 'height',
                backgroundColor: progress < 1 ? 'transparent' : '#F7F6FC'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-3.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            style: {
                                opacity: fadeOpacity,
                                willChange: 'opacity',
                                pointerEvents: fadeOpacity < 0.3 ? 'none' : 'auto'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$public$2f$main_logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$public$2f$main_logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                alt: "backpass-logo",
                                className: "h-6 w-auto"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: isSessionPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-muted animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this) : isLoggedIn && user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg",
                                                children: "🔥"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 247,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-foreground font-medium text-sm",
                                                children: "30"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                        lineNumber: 246,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "rounded-full text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                            lineNumber: 257,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                        className: "w-8 h-8 border-2 border-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                src: user.image || undefined,
                                                alt: user.name || 'User'
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 262,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                className: "bg-gradient-to-br from-amber-500 to-orange-600 text-white font-medium text-sm",
                                                children: user.name?.charAt(0) || 'U'
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                className: "rounded-full px-3 h-8 text-sm border-foreground/60 text-[#413725] hover:bg-muted",
                                onClick: handleOpenLoginModal,
                                children: "Log In"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                lineNumber: 269,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 md:px-[208px] py-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: avatarRef,
                                        style: {
                                            transform: `translate(${avatarTranslateX}px, ${avatarTranslateY}px) scale(${avatarScale})`,
                                            transformOrigin: 'top left',
                                            willChange: 'transform'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                            className: "w-[142px] h-[142px] shadow-xl",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                    src: stage?.image || stage?.owner.image || undefined,
                                                    alt: stage?.name || 'Stage'
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                    className: "text-5xl bg-gradient-to-br from-purple-500 to-purple-700 text-white",
                                                    children: stage?.name?.charAt(0) || 'S'
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: nameRef,
                                                style: {
                                                    transform: `translate(${nameTranslateX}px, ${nameTranslateY}px) scale(${nameScale})`,
                                                    transformOrigin: 'top left',
                                                    willChange: 'transform'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    as: "h1",
                                                    className: "text-[42px] font-semibold leading-[48px] tracking-[-0.07px] text-foreground whitespace-nowrap",
                                                    children: stage?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: faceDescriptionOpacity,
                                                    willChange: 'opacity',
                                                    pointerEvents: faceDescriptionOpacity < 0.3 ? 'none' : 'auto'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                        className: "text-sm font-medium text-muted-foreground",
                                                        children: stage?.owner.name || 'Creator'
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mt-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                            className: "text-base font-medium text-foreground",
                                                            children: stage?.description || 'Creator stage'
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-end gap-4 pt-3",
                                style: {
                                    opacity: fadeOpacity,
                                    willChange: 'opacity',
                                    pointerEvents: fadeOpacity < 0.3 ? 'none' : 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "rounded-full px-4 h-10 gap-3 border-foreground/60",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 367,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-medium",
                                                children: "Share Profile"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$profile$2f$profile$2d$stats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileStats"], {
                                        subscribersCount: stage?.subscribersCount || 0,
                                        postsCount: stage?.postsCount || 0
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                        lineNumber: 372,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: tabsRef,
                    className: "absolute flex items-center gap-3 h-11 z-10",
                    style: {
                        top: tabsTop,
                        left: tabsLeft,
                        willChange: 'top, left'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleTabChange('backstage'),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors', currentTab === 'backstage' ? 'text-foreground border-b-2 border-[#b8860b]' : 'text-muted-foreground hover:text-foreground'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CompassIcon, {
                                    active: currentTab === 'backstage'
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Backstage"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                    lineNumber: 404,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleTabChange('passes'),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors', currentTab === 'passes' ? 'text-foreground border-b-2 border-[#b8860b]' : 'text-muted-foreground hover:text-foreground'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketIcon, {
                                    active: currentTab === 'passes'
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                    lineNumber: 417,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Passes"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
                    lineNumber: 384,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
            lineNumber: 213,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/profile/profile-header.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_s(ProfileHeader, "bdqfr9QEr6BPNuIRFidVne4y9n0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$modal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStage"]
    ];
});
_c2 = ProfileHeader;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "CompassIcon");
__turbopack_context__.k.register(_c1, "TicketIcon");
__turbopack_context__.k.register(_c2, "ProfileHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/profile/profile-sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileSidebar",
    ()=>ProfileSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-stages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$modal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-modal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$login$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/login-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ProfileSidebar({ slug }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { openModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$modal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    const { data: stage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStage"])(slug);
    const handleJoinToUnlock = ()=>{
        if (!stage) return;
        openModal({
            component: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$login$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoginModal"],
            props: {
                community: {
                    id: stage.id,
                    name: stage.name,
                    image: stage.image,
                    subscribersCount: stage.subscribersCount,
                    owner: {
                        name: stage.owner.name,
                        image: stage.owner.image
                    }
                }
            },
            callbacks: {
                onClose: (result)=>{
                    if (result === 'success') {
                        router.refresh();
                    }
                }
            },
            settings: {
                closeOnOverlayClick: false
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-foreground mb-4",
                            children: "Upcoming Workshop"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LockedContent, {
                            onUnlock: handleJoinToUnlock,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 bg-purple-200 rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-sm",
                                                children: "Workshop Title"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: "Coming soon"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-foreground mb-4",
                            children: "Ongoing Challenges"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                1,
                                2
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LockedContent, {
                                    onUnlock: handleJoinToUnlock,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex -space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 bg-purple-300 rounded-full border-2 border-background"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 bg-amber-300 rounded-full border-2 border-background"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 bg-pink-300 rounded-full border-2 border-background"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                lineNumber: 78,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-sm",
                                                        children: "Challenge Title"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "X participants"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(ProfileSidebar, "5/oEAIErsFyZIiskgr/UaL4OFyk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$modal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStage"]
    ];
});
_c = ProfileSidebar;
function LockedContent({ children, onUnlock }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-muted/50 rounded-lg p-4 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "blur-sm",
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-background/60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    className: "rounded-full gap-2 bg-background",
                    onClick: onUnlock,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "🔒"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        " Join to Unlock"
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/profile/profile-sidebar.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c1 = LockedContent;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProfileSidebar");
__turbopack_context__.k.register(_c1, "LockedContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/profile/profile-layout-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileLayoutClient",
    ()=>ProfileLayoutClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$profile$2f$profile$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/profile/profile-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$profile$2f$profile$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/profile/profile-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$header$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-header-scroll-progress.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ProfileLayoutClient({ slug, children }) {
    _s();
    // Scroll progress (0-1) for header collapse and background animation
    const { progress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$header$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeaderScrollProgress"])({
        threshold: 150
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        style: {
            backgroundImage: `url(/main_background_light.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            backgroundPosition: `center ${-progress * 16}%`,
            transition: 'background-position 0.1s ease-out'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$profile$2f$profile$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileHeader"], {
                slug: slug,
                progress: progress
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-6xl mx-auto pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col lg:flex-row gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "hidden lg:block w-80 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sticky top-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$profile$2f$profile$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileSidebar"], {
                                    slug: slug
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/profile/profile-layout-client.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(ProfileLayoutClient, "wXyQEUD6L/3D2gQlIAPdn/lim1A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$header$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeaderScrollProgress"]
    ];
});
_c = ProfileLayoutClient;
var _c;
__turbopack_context__.k.register(_c, "ProfileLayoutClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8a8537e4._.js.map