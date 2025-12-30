(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/components/feed/reaction-pills.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REACTION_EMOJIS",
    ()=>REACTION_EMOJIS,
    "ReactionPills",
    ()=>ReactionPills
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
// ============================================================================
// Constants
// ============================================================================
const REACTION_EMOJIS = [
    '👍',
    '👏',
    '❤️',
    '😍',
    '🙏'
];
// Long press duration in ms
const LONG_PRESS_DURATION = 500;
// ============================================================================
// Animation Styles
// ============================================================================
const ANIMATION_STYLES = `
  @keyframes fly-to-pill {
    0% {
      opacity: 1;
      transform: translate(var(--start-x), var(--start-y)) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5 - 20px)) scale(1.3);
    }
    100% {
      opacity: 1;
      transform: translate(var(--end-x), var(--end-y)) scale(1);
    }
  }

  @keyframes emoji-highlight-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(190, 124, 0, 0.6);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(190, 124, 0, 0.3);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(190, 124, 0, 0);
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  @keyframes scale-in {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes emoji-bounce {
    0% {
      transform: scale(0) translateY(10px);
      opacity: 0;
    }
    60% {
      transform: scale(1.1) translateY(-2px);
      opacity: 1;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;
function EmojiButton({ emoji, index, onSelect }) {
    _s();
    const buttonRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "EmojiButton.useCallback[handleClick]": ()=>{
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                onSelect(emoji, rect);
            }
        }
    }["EmojiButton.useCallback[handleClick]"], [
        emoji,
        onSelect
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ref: buttonRef,
        onClick: handleClick,
        className: "flex items-center justify-center size-[46px] rounded-full bg-[#f2eff3] hover:bg-[#e8e4eb] transition-all duration-200 hover:scale-125 active:scale-110",
        style: {
            animationDelay: `${index * 50}ms`
        },
        "aria-label": `React with ${emoji}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-2xl leading-none select-none",
            children: emoji
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s(EmojiButton, "SE4JNSFk/qixLNX352hT8gCzYjE=");
_c = EmojiButton;
function ReactionPicker({ isOpen, onSelect, onClose }) {
    _s1();
    const pickerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ReactionPicker.useEffect": ()=>{
            if (!isOpen) return;
            function handleClickOutside(event) {
                if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                    onClose();
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
            return ({
                "ReactionPicker.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                    document.removeEventListener('touchstart', handleClickOutside);
                }
            })["ReactionPicker.useEffect"];
        }
    }["ReactionPicker.useEffect"], [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: pickerRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute bottom-full left-0 mb-2 z-50', 'flex items-center gap-2 p-2', 'bg-white border border-neutral-200 rounded-full', 'shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08),0px_12px_32px_-16px_rgba(48,0,64,0.06)]', 'animate-[scale-in_200ms_ease-out_forwards]', 'origin-bottom-left'),
        role: "menu",
        "aria-label": "Reaction picker",
        children: REACTION_EMOJIS.map((emoji, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-[emoji-bounce_300ms_ease-out_forwards]",
                style: {
                    animationDelay: `${index * 50}ms`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmojiButton, {
                    emoji: emoji,
                    index: index,
                    onSelect: onSelect
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this)
            }, emoji, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s1(ReactionPicker, "+I5YM/oL1q1Aw5nMgHDC5McdsH0=");
_c1 = ReactionPicker;
function HeartReactButton({ onClick, isFadingOut }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center size-8 rounded-full', 'bg-[#fff0d1] border border-[rgba(190,124,0,0.67)]', 'hover:bg-[#ffe8b8] transition-colors', isFadingOut && 'animate-[fade-out_300ms_ease-out_forwards]'),
        "aria-label": "Add reaction",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-base leading-none",
            children: "❤️"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
            lineNumber: 218,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
}
_c2 = HeartReactButton;
function ReactionsCountPill({ reactions, userReaction, totalCount, isAnimatingEmoji, onClick, onLongPress }) {
    _s2();
    const longPressTimeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const isLongPressRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    // Sort reactions to put user's reaction first
    const sortedReactions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ReactionsCountPill.useMemo[sortedReactions]": ()=>{
            if (!userReaction) return reactions;
            const sorted = [
                ...reactions
            ];
            sorted.sort({
                "ReactionsCountPill.useMemo[sortedReactions]": (a, b)=>{
                    if (a.emoji === userReaction) return -1;
                    if (b.emoji === userReaction) return 1;
                    return 0;
                }
            }["ReactionsCountPill.useMemo[sortedReactions]"]);
            return sorted;
        }
    }["ReactionsCountPill.useMemo[sortedReactions]"], [
        reactions,
        userReaction
    ]);
    // Get unique emojis to display (max 5)
    const displayEmojis = sortedReactions.slice(0, 5).map((r)=>r.emoji);
    const handleTouchStart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionsCountPill.useCallback[handleTouchStart]": ()=>{
            isLongPressRef.current = false;
            longPressTimeoutRef.current = setTimeout({
                "ReactionsCountPill.useCallback[handleTouchStart]": ()=>{
                    isLongPressRef.current = true;
                    onLongPress();
                }
            }["ReactionsCountPill.useCallback[handleTouchStart]"], LONG_PRESS_DURATION);
        }
    }["ReactionsCountPill.useCallback[handleTouchStart]"], [
        onLongPress
    ]);
    const handleTouchEnd = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionsCountPill.useCallback[handleTouchEnd]": ()=>{
            if (longPressTimeoutRef.current) {
                clearTimeout(longPressTimeoutRef.current);
                longPressTimeoutRef.current = null;
            }
            // Only trigger onClick if it wasn't a long press
            if (!isLongPressRef.current) {
                onClick();
            }
        }
    }["ReactionsCountPill.useCallback[handleTouchEnd]"], [
        onClick
    ]);
    const handleMouseDown = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionsCountPill.useCallback[handleMouseDown]": ()=>{
            isLongPressRef.current = false;
            longPressTimeoutRef.current = setTimeout({
                "ReactionsCountPill.useCallback[handleMouseDown]": ()=>{
                    isLongPressRef.current = true;
                    onLongPress();
                }
            }["ReactionsCountPill.useCallback[handleMouseDown]"], LONG_PRESS_DURATION);
        }
    }["ReactionsCountPill.useCallback[handleMouseDown]"], [
        onLongPress
    ]);
    const handleMouseUp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionsCountPill.useCallback[handleMouseUp]": ()=>{
            if (longPressTimeoutRef.current) {
                clearTimeout(longPressTimeoutRef.current);
                longPressTimeoutRef.current = null;
            }
        }
    }["ReactionsCountPill.useCallback[handleMouseUp]"], []);
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionsCountPill.useCallback[handleClick]": ()=>{
            // Only trigger if it wasn't a long press
            if (!isLongPressRef.current) {
                onClick();
            }
        }
    }["ReactionsCountPill.useCallback[handleClick]"], [
        onClick
    ]);
    // Cleanup on unmount
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ReactionsCountPill.useEffect": ()=>{
            return ({
                "ReactionsCountPill.useEffect": ()=>{
                    if (longPressTimeoutRef.current) {
                        clearTimeout(longPressTimeoutRef.current);
                    }
                }
            })["ReactionsCountPill.useEffect"];
        }
    }["ReactionsCountPill.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: handleClick,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        className: "flex items-center gap-0.5 h-8 px-2 rounded-full bg-[rgba(48,0,64,0.06)] hover:bg-[rgba(48,0,64,0.1)] transition-colors",
        "aria-label": userReaction ? 'Remove your reaction' : 'View all reactions',
        children: [
            displayEmojis.map((emoji, i)=>{
                const isUserEmoji = emoji === userReaction;
                const isFirstUserEmoji = isUserEmoji && i === 0;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-base leading-6 flex items-center justify-center', isFirstUserEmoji && 'size-6 rounded-full bg-[#fff0d1]', isFirstUserEmoji && isAnimatingEmoji && 'animate-[emoji-highlight-pulse_500ms_ease-out]'),
                    children: emoji
                }, `${emoji}-${i}`, false, {
                    fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                    lineNumber: 325,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-medium text-foreground ml-0.5",
                children: totalCount
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
        lineNumber: 310,
        columnNumber: 5
    }, this);
}
_s2(ReactionsCountPill, "5MdnHBI4RAXjYyyK2lhGDB1Gmyo=");
_c3 = ReactionsCountPill;
function FlyingEmoji({ emoji, startX, startY, endX, endY, onComplete }) {
    _s3();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "FlyingEmoji.useEffect": ()=>{
            const timer = setTimeout(onComplete, 400);
            return ({
                "FlyingEmoji.useEffect": ()=>clearTimeout(timer)
            })["FlyingEmoji.useEffect"];
        }
    }["FlyingEmoji.useEffect"], [
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed z-[100] text-2xl leading-none pointer-events-none",
        style: {
            left: startX,
            top: startY,
            '--start-x': '0px',
            '--start-y': '0px',
            '--end-x': `${endX - startX}px`,
            '--end-y': `${endY - startY}px`,
            animation: 'fly-to-pill 400ms ease-out forwards'
        },
        children: emoji
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
        lineNumber: 369,
        columnNumber: 5
    }, this);
}
_s3(FlyingEmoji, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c4 = FlyingEmoji;
// ============================================================================
// Main Component
// ============================================================================
function ReactionPills({ reactions, userReaction, totalCount, onReact, onUnreact, onOpenReactionList, className }) {
    _s4();
    const [isPickerOpen, setIsPickerOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [flyingEmoji, setFlyingEmoji] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [isHeartFadingOut, setIsHeartFadingOut] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [isAnimatingEmoji, setIsAnimatingEmoji] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const countPillRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const openPicker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionPills.useCallback[openPicker]": ()=>{
            setIsPickerOpen(true);
        }
    }["ReactionPills.useCallback[openPicker]"], []);
    const closePicker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionPills.useCallback[closePicker]": ()=>{
            setIsPickerOpen(false);
        }
    }["ReactionPills.useCallback[closePicker]"], []);
    const handleHeartClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionPills.useCallback[handleHeartClick]": ()=>{
            openPicker();
        }
    }["ReactionPills.useCallback[handleHeartClick]"], [
        openPicker
    ]);
    const handleSelectEmoji = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionPills.useCallback[handleSelectEmoji]": (emoji, pickerEmojiRect)=>{
            closePicker();
            // Start heart pill fade out
            setIsHeartFadingOut(true);
            // Calculate animation positions
            const startX = pickerEmojiRect.left + pickerEmojiRect.width / 2 - 12;
            const startY = pickerEmojiRect.top + pickerEmojiRect.height / 2 - 12;
            // Target is the count pill position
            let endX = startX;
            let endY = startY + 50;
            if (countPillRef.current) {
                const pillRect = countPillRef.current.getBoundingClientRect();
                endX = pillRect.left + 12;
                endY = pillRect.top + pillRect.height / 2 - 12;
            } else if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                endX = containerRect.left + 40; // After where heart button was
                endY = containerRect.top + 16 - 12;
            }
            // Start flying animation
            setFlyingEmoji({
                emoji,
                startX,
                startY,
                endX,
                endY
            });
            // Trigger the reaction callback with position
            onReact?.(emoji, {
                x: startX,
                y: startY
            });
        }
    }["ReactionPills.useCallback[handleSelectEmoji]"], [
        closePicker,
        onReact
    ]);
    const handleFlyingComplete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionPills.useCallback[handleFlyingComplete]": ()=>{
            setFlyingEmoji(null);
            setIsHeartFadingOut(false);
            setIsAnimatingEmoji(true);
            // Reset animation state after it completes
            setTimeout({
                "ReactionPills.useCallback[handleFlyingComplete]": ()=>{
                    setIsAnimatingEmoji(false);
                }
            }["ReactionPills.useCallback[handleFlyingComplete]"], 500);
        }
    }["ReactionPills.useCallback[handleFlyingComplete]"], []);
    const handleCountPillClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionPills.useCallback[handleCountPillClick]": ()=>{
            if (userReaction) {
                // User has reacted - unreact
                onUnreact?.();
            } else {
                // User has not reacted - open reaction list
                onOpenReactionList?.();
            }
        }
    }["ReactionPills.useCallback[handleCountPillClick]"], [
        userReaction,
        onUnreact,
        onOpenReactionList
    ]);
    const handleCountPillLongPress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ReactionPills.useCallback[handleCountPillLongPress]": ()=>{
            // Always open reaction list on long press
            onOpenReactionList?.();
        }
    }["ReactionPills.useCallback[handleCountPillLongPress]"], [
        onOpenReactionList
    ]);
    const hasReactions = totalCount > 0;
    const showHeartButton = !userReaction && !isHeartFadingOut;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ReactionPills.useEffect": ()=>{
            console.log('showHeartButton: ', showHeartButton);
            console.log('isHeartFadingOut: ', isHeartFadingOut);
        }
    }["ReactionPills.useEffect"], [
        showHeartButton,
        isHeartFadingOut
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: ANIMATION_STYLES
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                lineNumber: 497,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex items-center gap-1', className),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReactionPicker, {
                        isOpen: isPickerOpen,
                        onSelect: handleSelectEmoji,
                        onClose: closePicker
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                        lineNumber: 504,
                        columnNumber: 9
                    }, this),
                    (showHeartButton || isHeartFadingOut) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeartReactButton, {
                        onClick: handleHeartClick,
                        isFadingOut: isHeartFadingOut
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                        lineNumber: 512,
                        columnNumber: 11
                    }, this),
                    hasReactions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: countPillRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReactionsCountPill, {
                            reactions: reactions,
                            userReaction: userReaction,
                            totalCount: totalCount,
                            isAnimatingEmoji: isAnimatingEmoji,
                            onClick: handleCountPillClick,
                            onLongPress: handleCountPillLongPress
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                            lineNumber: 521,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                        lineNumber: 520,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                lineNumber: 499,
                columnNumber: 7
            }, this),
            flyingEmoji && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlyingEmoji, {
                emoji: flyingEmoji.emoji,
                startX: flyingEmoji.startX,
                startY: flyingEmoji.startY,
                endX: flyingEmoji.endX,
                endY: flyingEmoji.endY,
                onComplete: handleFlyingComplete
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-pills.tsx",
                lineNumber: 535,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s4(ReactionPills, "u/SV0NHYp/bWxafnkpDoh2lur7A=");
_c5 = ReactionPills;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "EmojiButton");
__turbopack_context__.k.register(_c1, "ReactionPicker");
__turbopack_context__.k.register(_c2, "HeartReactButton");
__turbopack_context__.k.register(_c3, "ReactionsCountPill");
__turbopack_context__.k.register(_c4, "FlyingEmoji");
__turbopack_context__.k.register(_c5, "ReactionPills");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/use-reactions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterReactionsByEmoji",
    ()=>filterReactionsByEmoji,
    "useAddReaction",
    ()=>useAddReaction,
    "useReactionList",
    ()=>useReactionList,
    "useRemoveReaction",
    ()=>useRemoveReaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/query-keys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
// ============================================================================
// Mock Data
// ============================================================================
const MOCK_REACTIONS = [
    {
        userId: 'user-1',
        userName: 'Mohammad Hasan',
        userAvatar: 'https://i.pravatar.cc/150?u=mohammad',
        emoji: '🙏'
    },
    {
        userId: 'user-2',
        userName: 'Pappu Shah',
        userAvatar: 'https://i.pravatar.cc/150?u=pappu',
        emoji: '🙏'
    },
    {
        userId: 'user-3',
        userName: 'Belal Ahmed',
        userAvatar: 'https://i.pravatar.cc/150?u=belal',
        emoji: '🙏'
    },
    {
        userId: 'user-4',
        userName: 'Sayantan Chadra',
        userAvatar: 'https://i.pravatar.cc/150?u=sayantan',
        emoji: '🙏'
    },
    {
        userId: 'user-5',
        userName: 'Shreya Ugavekar',
        userAvatar: 'https://i.pravatar.cc/150?u=shreya',
        emoji: '😍'
    },
    {
        userId: 'user-6',
        userName: 'Krishna Bose',
        userAvatar: 'https://i.pravatar.cc/150?u=krishna',
        emoji: '😍'
    }
];
// Simulate API delay
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
// Mock API functions
async function fetchReactionList(postId) {
    await delay(500);
    // Group reactions by emoji for summary
    const emojiCounts = MOCK_REACTIONS.reduce((acc, reaction)=>{
        acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
        return acc;
    }, {});
    const summary = Object.entries(emojiCounts).map(([emoji, count])=>({
            emoji,
            count
        }));
    return {
        reactions: MOCK_REACTIONS,
        summary,
        totalCount: MOCK_REACTIONS.length
    };
}
async function addReactionApi(postId, emoji) {
    await delay(200);
    return {
        success: true,
        userReaction: emoji
    };
}
async function removeReactionApi(postId) {
    await delay(200);
    return {
        success: true
    };
}
function useReactionList(postId, options = {}) {
    _s();
    const { enabled = true } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].reactions.list(postId),
        queryFn: {
            "useReactionList.useQuery": ()=>fetchReactionList(postId)
        }["useReactionList.useQuery"],
        enabled: enabled && !!postId,
        staleTime: 60 * 1000
    });
}
_s(useReactionList, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useAddReaction() {
    _s1();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const [animatingEmoji, setAnimatingEmoji] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [animationStartPosition, setAnimationStartPosition] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const mutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useAddReaction.useMutation[mutation]": ({ postId, emoji })=>addReactionApi(postId, emoji)
        }["useAddReaction.useMutation[mutation]"],
        onMutate: {
            "useAddReaction.useMutation[mutation]": async ({ postId, emoji })=>{
                // Start animation
                setAnimatingEmoji(emoji);
                // Cancel outgoing refetches
                await queryClient.cancelQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].reactions.list(postId)
                });
                return {
                    emoji
                };
            }
        }["useAddReaction.useMutation[mutation]"],
        onSuccess: {
            "useAddReaction.useMutation[mutation]": ()=>{
                // Animation completes via setTimeout
                setTimeout({
                    "useAddReaction.useMutation[mutation]": ()=>{
                        setAnimatingEmoji(null);
                        setAnimationStartPosition(null);
                    }
                }["useAddReaction.useMutation[mutation]"], 400);
            }
        }["useAddReaction.useMutation[mutation]"],
        onError: {
            "useAddReaction.useMutation[mutation]": ()=>{
                setAnimatingEmoji(null);
                setAnimationStartPosition(null);
            }
        }["useAddReaction.useMutation[mutation]"]
    });
    const react = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useAddReaction.useCallback[react]": (postId, emoji, startPosition)=>{
            if (startPosition) {
                setAnimationStartPosition(startPosition);
            }
            mutation.mutate({
                postId,
                emoji
            });
        }
    }["useAddReaction.useCallback[react]"], [
        mutation
    ]);
    return {
        react,
        isPending: mutation.isPending,
        animatingEmoji,
        animationStartPosition
    };
}
_s1(useAddReaction, "R9N5neSyiRpic/cYChmRiNzeKIY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useRemoveReaction() {
    _s2();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useRemoveReaction.useMutation": ({ postId })=>removeReactionApi(postId)
        }["useRemoveReaction.useMutation"],
        onMutate: {
            "useRemoveReaction.useMutation": async ({ postId })=>{
                await queryClient.cancelQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].reactions.list(postId)
                });
            }
        }["useRemoveReaction.useMutation"]
    });
}
_s2(useRemoveReaction, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function filterReactionsByEmoji(reactions, emoji) {
    if (!emoji) return reactions;
    return reactions.filter((r)=>r.emoji === emoji);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/feed/reaction-list.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReactionList",
    ()=>ReactionList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-reactions.ts [app-client] (ecmascript)");
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
function TabButton({ label, emoji, count, isActive, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1 h-9 px-3 rounded-full transition-colors whitespace-nowrap', isActive ? 'bg-foreground text-white' : 'bg-transparent text-foreground hover:bg-foreground/5'),
        "aria-pressed": isActive,
        children: [
            emoji && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-2xl leading-none",
                children: emoji
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                lineNumber: 50,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-base font-medium', isActive && 'text-white'),
                children: emoji ? count : label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = TabButton;
function ReactionUserRow({ user }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                className: "size-10 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                        src: user.userAvatar,
                        alt: user.userName
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                        children: user.userName.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                className: "flex-1 text-sm font-medium text-foreground truncate",
                children: user.userName
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                className: "text-[28px] leading-9",
                children: user.emoji
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_c1 = ReactionUserRow;
function ReactionListSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            1,
            2,
            3,
            4
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        variant: "avatar",
                        className: "size-10"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        variant: "text",
                        className: "flex-1 h-5"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        variant: "text",
                        className: "w-8 h-8"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_c2 = ReactionListSkeleton;
// ============================================================================
// Main Component
// ============================================================================
function ReactionList({ postId, isOpen, onClose }) {
    _s();
    const [selectedEmoji, setSelectedEmoji] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const modalRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReactionList"])(postId, {
        enabled: isOpen
    });
    // Handle click outside
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ReactionList.useEffect": ()=>{
            if (!isOpen) return;
            function handleClickOutside(event) {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    onClose();
                }
            }
            function handleEscape(event) {
                if (event.key === 'Escape') {
                    onClose();
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            return ({
                "ReactionList.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                    document.removeEventListener('keydown', handleEscape);
                }
            })["ReactionList.useEffect"];
        }
    }["ReactionList.useEffect"], [
        isOpen,
        onClose
    ]);
    // Prevent body scroll when modal is open
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ReactionList.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "ReactionList.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["ReactionList.useEffect"];
        }
    }["ReactionList.useEffect"], [
        isOpen
    ]);
    // Reset filter when modal closes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ReactionList.useEffect": ()=>{
            if (!isOpen) {
                setSelectedEmoji(null);
            }
        }
    }["ReactionList.useEffect"], [
        isOpen
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ReactionList.useEffect": ()=>{
            console.log('reactions: ', data);
        }
    }["ReactionList.useEffect"], [
        data
    ]);
    if (!isOpen) return null;
    const reactions = data?.reactions || [];
    const summary = data?.summary || [];
    const totalCount = data?.totalCount || 0;
    const filteredReactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterReactionsByEmoji"])(reactions, selectedEmoji);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: modalRef,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col w-full max-w-md max-h-[80vh] bg-white rounded-3xl overflow-hidden', 'border border-foreground/5', 'animate-in fade-in zoom-in-95 duration-200'),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "reaction-list-title",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 pt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    id: "reaction-list-title",
                                    className: "text-xl font-semibold text-foreground",
                                    children: "Reactions"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "flex items-center justify-center size-8 rounded hover:bg-foreground/5 transition-colors",
                                    "aria-label": "Close",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "size-6 text-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 px-3 pb-2 overflow-x-auto scrollbar-hide",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                    label: `All ${totalCount}`,
                                    count: totalCount,
                                    isActive: selectedEmoji === null,
                                    onClick: ()=>setSelectedEmoji(null)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this),
                                summary.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                        emoji: s.emoji,
                                        label: "",
                                        count: s.count,
                                        isActive: selectedEmoji === s.emoji,
                                        onClick: ()=>setSelectedEmoji(s.emoji)
                                    }, s.emoji, false, {
                                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto bg-neutral-50 border-t border-neutral-200 px-4 pt-3 pb-4",
                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReactionListSkeleton, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 222,
                        columnNumber: 13
                    }, this) : filteredReactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        className: "text-sm text-foreground/60",
                        children: "No reactions yet"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 224,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: filteredReactions.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReactionUserRow, {
                                user: user
                            }, user.userId, false, {
                                fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                                lineNumber: 228,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                        lineNumber: 226,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/reaction-list.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_s(ReactionList, "TEWogJmYIkCKUKB2xLUf2HrTpBY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$reactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReactionList"]
    ];
});
_c3 = ReactionList;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TabButton");
__turbopack_context__.k.register(_c1, "ReactionUserRow");
__turbopack_context__.k.register(_c2, "ReactionListSkeleton");
__turbopack_context__.k.register(_c3, "ReactionList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/feed/comment-item.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentItem",
    ()=>CommentItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/text.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function LikeButton({ isLiked, count, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "flex flex-col items-center gap-1.5 w-10",
        "aria-label": isLiked ? 'Unlike comment' : 'Like comment',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('size-5 transition-colors', isLiked ? 'fill-[#dc3e42] stroke-[#dc3e42]' : 'fill-none stroke-[#211f26]')
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                className: "text-sm font-medium text-foreground/60",
                children: count
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c = LikeButton;
function RepliesToggle({ repliesCount, isExpanded, onToggle }) {
    if (repliesCount === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onToggle,
        className: "flex items-center gap-1 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-px bg-foreground/15"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: isExpanded ? 'Hide replies' : `View ${repliesCount} more ${repliesCount === 1 ? 'reply' : 'replies'}`
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_c1 = RepliesToggle;
// ============================================================================
// Main Component
// ============================================================================
function CommentItem({ comment, onReply, onLike, level = 0, className }) {
    _s();
    const [isExpanded, setIsExpanded] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](level === 0);
    const handleLike = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentItem.useCallback[handleLike]": ()=>{
            onLike?.(comment.id, !comment.isLiked);
        }
    }["CommentItem.useCallback[handleLike]"], [
        comment.id,
        comment.isLiked,
        onLike
    ]);
    const handleReply = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentItem.useCallback[handleReply]": ()=>{
            onReply?.(comment.id);
        }
    }["CommentItem.useCallback[handleReply]"], [
        comment.id,
        onReply
    ]);
    const toggleReplies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentItem.useCallback[toggleReplies]": ()=>{
            setIsExpanded({
                "CommentItem.useCallback[toggleReplies]": (prev)=>!prev
            }["CommentItem.useCallback[toggleReplies]"]);
        }
    }["CommentItem.useCallback[toggleReplies]"], []);
    const hasReplies = comment.replies && comment.replies.length > 0;
    const showNestedReplies = isExpanded && hasReplies;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex gap-2 w-full', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                className: "size-8 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                        src: comment.author.avatarUrl,
                        alt: comment.author.name
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                        children: comment.author.name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    className: "text-sm font-semibold text-foreground",
                                    children: comment.author.name
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    className: "text-xs text-foreground/60",
                                    children: comment.timestamp
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            className: "text-sm text-foreground leading-5 whitespace-pre-wrap break-words",
                                            children: comment.content
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleReply,
                                            className: "text-sm font-medium text-foreground/60 hover:text-foreground transition-colors w-fit",
                                            children: "Reply"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        (comment.repliesCount > 0 || hasReplies) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RepliesToggle, {
                                            repliesCount: hasReplies ? comment.replies.length : comment.repliesCount,
                                            isExpanded: isExpanded,
                                            onToggle: toggleReplies
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LikeButton, {
                                    isLiked: comment.isLiked,
                                    count: comment.likesCount,
                                    onClick: handleLike
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        showNestedReplies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-5 pt-5",
                            children: comment.replies.map((reply)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentItem, {
                                    comment: reply,
                                    onReply: onReply,
                                    onLike: onLike,
                                    level: level + 1
                                }, reply.id, false, {
                                    fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                                    lineNumber: 171,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/comment-item.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_s(CommentItem, "rtgWpAwkpespNptHOqbR2K6tJ/0=");
_c2 = CommentItem;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LikeButton");
__turbopack_context__.k.register(_c1, "RepliesToggle");
__turbopack_context__.k.register(_c2, "CommentItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/hooks/use-comments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAddComment",
    ()=>useAddComment,
    "useComments",
    ()=>useComments,
    "useLikeComment",
    ()=>useLikeComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/query-keys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
// ============================================================================
// Mock Data
// ============================================================================
const MOCK_COMMENTS = [
    {
        id: 'comment-1',
        author: {
            id: 'user-1',
            name: 'Mohammad Hasan',
            avatarUrl: 'https://i.pravatar.cc/150?u=mohammad'
        },
        content: 'Wishing you a great experience ahead. Cheers!',
        timestamp: '9:56 AM',
        likesCount: 158,
        isLiked: true,
        repliesCount: 2,
        replies: [
            {
                id: 'reply-1-1',
                author: {
                    id: 'user-2',
                    name: 'Krishna Bose',
                    avatarUrl: 'https://i.pravatar.cc/150?u=krishna'
                },
                content: 'Cheers!🍻',
                timestamp: '9:56 AM',
                likesCount: 1,
                isLiked: false,
                repliesCount: 0
            },
            {
                id: 'reply-1-2',
                author: {
                    id: 'user-3',
                    name: 'Mayank',
                    avatarUrl: 'https://i.pravatar.cc/150?u=mayank'
                },
                content: 'Enjoy! 🍺',
                timestamp: '9:56 AM',
                likesCount: 0,
                isLiked: false,
                repliesCount: 0
            }
        ]
    },
    {
        id: 'comment-2',
        author: {
            id: 'user-4',
            name: 'Pappu Shah',
            avatarUrl: 'https://i.pravatar.cc/150?u=pappu'
        },
        content: 'Wishing you a great experience ahead. Cheers!',
        timestamp: '9:56 AM',
        likesCount: 53,
        isLiked: false,
        repliesCount: 2
    }
];
// Simulate API delay
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
// Mock API functions
async function fetchComments(postId, cursor) {
    await delay(500);
    return {
        comments: MOCK_COMMENTS,
        nextCursor: undefined,
        hasMore: false,
        totalCount: MOCK_COMMENTS.length
    };
}
async function addCommentApi(postId, content, parentId) {
    await delay(300);
    return {
        id: `comment-${Date.now()}`,
        author: {
            id: 'current-user',
            name: 'You',
            avatarUrl: 'https://i.pravatar.cc/150?u=current'
        },
        content,
        timestamp: 'Just now',
        likesCount: 0,
        isLiked: false,
        repliesCount: 0
    };
}
async function likeCommentApi(commentId, isLiked) {
    await delay(200);
    return {
        success: true
    };
}
function useComments(postId, options = {}) {
    _s();
    const { enabled = true } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId),
        queryFn: {
            "useComments.useQuery": ()=>fetchComments(postId)
        }["useComments.useQuery"],
        enabled: enabled && !!postId,
        staleTime: 30 * 1000
    });
}
_s(useComments, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useAddComment() {
    _s1();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useAddComment.useMutation": ({ postId, content, parentId })=>addCommentApi(postId, content, parentId)
        }["useAddComment.useMutation"],
        onMutate: {
            "useAddComment.useMutation": async ({ postId, content, parentId })=>{
                // Cancel outgoing refetches
                await queryClient.cancelQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId)
                });
                // Snapshot previous value
                const previousData = queryClient.getQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId));
                // Optimistically add the comment
                const optimisticComment = {
                    id: `temp-${Date.now()}`,
                    author: {
                        id: 'current-user',
                        name: 'You',
                        avatarUrl: 'https://i.pravatar.cc/150?u=current'
                    },
                    content,
                    timestamp: 'Just now',
                    likesCount: 0,
                    isLiked: false,
                    repliesCount: 0
                };
                queryClient.setQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId), {
                    "useAddComment.useMutation": (old)=>{
                        if (!old) return old;
                        if (parentId) {
                            // Add as reply
                            const updatedComments = old.comments.map({
                                "useAddComment.useMutation.updatedComments": (comment)=>{
                                    if (comment.id === parentId) {
                                        return {
                                            ...comment,
                                            repliesCount: comment.repliesCount + 1,
                                            replies: [
                                                ...comment.replies || [],
                                                optimisticComment
                                            ]
                                        };
                                    }
                                    return comment;
                                }
                            }["useAddComment.useMutation.updatedComments"]);
                            return {
                                ...old,
                                comments: updatedComments
                            };
                        }
                        // Add as top-level comment
                        return {
                            ...old,
                            comments: [
                                ...old.comments,
                                optimisticComment
                            ],
                            totalCount: old.totalCount + 1
                        };
                    }
                }["useAddComment.useMutation"]);
                return {
                    previousData
                };
            }
        }["useAddComment.useMutation"],
        onError: {
            "useAddComment.useMutation": (_err, { postId }, context)=>{
                // Rollback on error
                if (context?.previousData) {
                    queryClient.setQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId), context.previousData);
                }
            }
        }["useAddComment.useMutation"],
        onSettled: {
            "useAddComment.useMutation": (_data, _error, { postId })=>{
                // Refetch after mutation
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId)
                });
            }
        }["useAddComment.useMutation"]
    });
}
_s1(useAddComment, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLikeComment() {
    _s2();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLikeComment.useMutation": ({ commentId, isLiked })=>likeCommentApi(commentId, isLiked)
        }["useLikeComment.useMutation"],
        onMutate: {
            "useLikeComment.useMutation": async ({ postId, commentId, isLiked })=>{
                await queryClient.cancelQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId)
                });
                const previousData = queryClient.getQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId));
                // Helper to update comment likes recursively
                const updateCommentLikes = {
                    "useLikeComment.useMutation.updateCommentLikes": (comments)=>{
                        return comments.map({
                            "useLikeComment.useMutation.updateCommentLikes": (comment)=>{
                                if (comment.id === commentId) {
                                    return {
                                        ...comment,
                                        isLiked,
                                        likesCount: isLiked ? comment.likesCount + 1 : Math.max(0, comment.likesCount - 1)
                                    };
                                }
                                if (comment.replies) {
                                    return {
                                        ...comment,
                                        replies: updateCommentLikes(comment.replies)
                                    };
                                }
                                return comment;
                            }
                        }["useLikeComment.useMutation.updateCommentLikes"]);
                    }
                }["useLikeComment.useMutation.updateCommentLikes"];
                queryClient.setQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId), {
                    "useLikeComment.useMutation": (old)=>{
                        if (!old) return old;
                        return {
                            ...old,
                            comments: updateCommentLikes(old.comments)
                        };
                    }
                }["useLikeComment.useMutation"]);
                return {
                    previousData
                };
            }
        }["useLikeComment.useMutation"],
        onError: {
            "useLikeComment.useMutation": (_err, { postId }, context)=>{
                if (context?.previousData) {
                    queryClient.setQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$query$2d$keys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].comments.list(postId), context.previousData);
                }
            }
        }["useLikeComment.useMutation"]
    });
}
_s2(useLikeComment, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/feed/comments-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentsSection",
    ()=>CommentsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$comment$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/feed/comment-item.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-comments.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function CommentInput({ avatarUrl, avatarFallback = 'U', onSubmit, isSubmitting = false, placeholder = 'Join the conversation...', autoFocus = false }) {
    _s();
    const [value, setValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const handleSubmit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentInput.useCallback[handleSubmit]": ()=>{
            const trimmed = value.trim();
            if (!trimmed || isSubmitting) return;
            onSubmit(trimmed);
            setValue('');
        }
    }["CommentInput.useCallback[handleSubmit]"], [
        value,
        isSubmitting,
        onSubmit
    ]);
    const handleKeyDown = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentInput.useCallback[handleKeyDown]": (e)=>{
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        }
    }["CommentInput.useCallback[handleKeyDown]"], [
        handleSubmit
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "CommentInput.useEffect": ()=>{
            if (autoFocus && inputRef.current) {
                inputRef.current.focus();
            }
        }
    }["CommentInput.useEffect"], [
        autoFocus
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                className: "size-8 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                        src: avatarUrl,
                        alt: "Your avatar"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                        children: avatarFallback
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center h-12 bg-white/90 border border-foreground/15 rounded-full px-1 py-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "text",
                        value: value,
                        onChange: (e)=>setValue(e.target.value),
                        onKeyDown: handleKeyDown,
                        placeholder: placeholder,
                        disabled: isSubmitting,
                        className: "flex-1 h-full px-3 bg-transparent text-base text-foreground placeholder:text-foreground/40 outline-none"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: !value.trim() || isSubmitting,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center size-10 rounded-full transition-colors', 'bg-foreground/5 hover:bg-foreground/10', 'disabled:opacity-50 disabled:cursor-not-allowed'),
                        "aria-label": "Send comment",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                            className: "size-6 text-foreground"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(CommentInput, "47ny0xYl8JFutpwP8Sg/hnJwPuQ=");
_c = CommentInput;
function LoadMoreButton({ onClick, isLoading }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: isLoading,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center h-10 px-4', 'border border-foreground/20 rounded-full', 'text-base font-medium text-foreground', 'hover:bg-foreground/5 transition-colors', 'disabled:opacity-50 disabled:cursor-not-allowed'),
        children: isLoading ? 'Loading...' : 'Load more comments'
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_c1 = LoadMoreButton;
function CommentsSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            1,
            2
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        variant: "avatar",
                        className: "size-8"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                variant: "text",
                                className: "w-32"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                variant: "text",
                                className: "w-full"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                variant: "text",
                                className: "w-16"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c2 = CommentsSkeleton;
// ============================================================================
// Main Component
// ============================================================================
function CommentsSection({ postId, currentUserAvatar, currentUserName, className }) {
    _s1();
    const [replyingTo, setReplyingTo] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const { data, isLoading, isError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComments"])(postId);
    const addComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAddComment"])();
    const likeComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLikeComment"])();
    const handleAddComment = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentsSection.useCallback[handleAddComment]": (content)=>{
            addComment.mutate({
                postId,
                content,
                parentId: replyingTo || undefined
            });
            setReplyingTo(null);
        }
    }["CommentsSection.useCallback[handleAddComment]"], [
        postId,
        replyingTo,
        addComment
    ]);
    const handleReply = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentsSection.useCallback[handleReply]": (commentId)=>{
            setReplyingTo(commentId);
        }
    }["CommentsSection.useCallback[handleReply]"], []);
    const handleLike = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentsSection.useCallback[handleLike]": (commentId, isLiked)=>{
            likeComment.mutate({
                postId,
                commentId,
                isLiked
            });
        }
    }["CommentsSection.useCallback[handleLike]"], [
        postId,
        likeComment
    ]);
    const handleLoadMore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CommentsSection.useCallback[handleLoadMore]": ()=>{
        // TODO: Implement pagination when API supports it
        }
    }["CommentsSection.useCallback[handleLoadMore]"], []);
    const comments = data?.comments || [];
    const hasMore = data?.hasMore || false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col w-full', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentInput, {
                        avatarUrl: currentUserAvatar,
                        avatarFallback: currentUserName?.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2) || 'U',
                        onSubmit: handleAddComment,
                        isSubmitting: addComment.isPending,
                        placeholder: replyingTo ? 'Write a reply...' : 'Join the conversation...'
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    replyingTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setReplyingTo(null),
                        className: "mt-2 text-sm text-foreground/60 hover:text-foreground",
                        children: "Cancel reply"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 px-4 pb-4",
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentsSkeleton, {}, void 0, false, {
                    fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, this) : isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    className: "text-sm text-red-500",
                    children: "Failed to load comments"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                    lineNumber: 228,
                    columnNumber: 11
                }, this) : comments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    className: "text-sm text-foreground/60",
                    children: "No comments yet. Be the first to comment!"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                    lineNumber: 230,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        comments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$comment$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentItem"], {
                                comment: comment,
                                onReply: handleReply,
                                onLike: handleLike
                            }, comment.id, false, {
                                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                                lineNumber: 236,
                                columnNumber: 15
                            }, this)),
                        hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadMoreButton, {
                                onClick: handleLoadMore
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                                lineNumber: 247,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                            lineNumber: 246,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/comments-section.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s1(CommentsSection, "tAf/crhbBrxOx1hkvu624msXskw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComments"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAddComment"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLikeComment"]
    ];
});
_c3 = CommentsSection;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CommentInput");
__turbopack_context__.k.register(_c1, "LoadMoreButton");
__turbopack_context__.k.register(_c2, "CommentsSkeleton");
__turbopack_context__.k.register(_c3, "CommentsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/feed/post-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostCard",
    ()=>PostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$reaction$2d$pills$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/feed/reaction-pills.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$reaction$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/feed/reaction-list.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$comments$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/feed/comments-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/card.tsx [app-client] (ecmascript)");
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
function IconButton({ onClick, 'aria-label': ariaLabel, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        "aria-label": ariaLabel,
        className: "flex items-center justify-center size-8 rounded-full bg-black/5 border border-black/10 hover:bg-black/10 transition-colors",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
        lineNumber: 81,
        columnNumber: 9
    }, this);
}
_c = IconButton;
function MediaSection({ media }) {
    if (!media || media.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('mt-4 grid gap-2', media.length === 1 && 'grid-cols-1', media.length === 2 && 'grid-cols-2', media.length >= 3 && 'grid-cols-2 md:grid-cols-3'),
        children: media.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-lg",
                children: item.type === 'image' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                    src: item.url,
                    alt: item.alt || `Media ${index + 1}`,
                    width: item.width || 600,
                    height: item.height || 400,
                    className: "w-full h-auto object-cover"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                    lineNumber: 112,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    src: item.url,
                    controls: true,
                    className: "w-full h-auto",
                    "aria-label": item.alt || `Video ${index + 1}`,
                    children: "Your browser does not support the video tag."
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                    lineNumber: 120,
                    columnNumber: 25
                }, this)
            }, index, false, {
                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                lineNumber: 110,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
        lineNumber: 101,
        columnNumber: 9
    }, this);
}
_c1 = MediaSection;
function CommentsCount({ count }) {
    if (count === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
        className: "text-sm text-foreground",
        children: [
            count,
            " ",
            count === 1 ? 'Comment' : 'Comments'
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
        lineNumber: 145,
        columnNumber: 9
    }, this);
}
_c2 = CommentsCount;
// ============================================================================
// Main Component
// ============================================================================
function PostCard({ postId, author, timestamp, content, media, reactions, commentsCount, userReaction, actions, skeletonLoading = false, showComments = false, currentUserAvatar, currentUserName, className }) {
    _s();
    const [isCommentsOpen, setIsCommentsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](showComments);
    const [isReactionListOpen, setIsReactionListOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const handleCommentClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PostCard.useCallback[handleCommentClick]": ()=>{
            setIsCommentsOpen({
                "PostCard.useCallback[handleCommentClick]": (prev)=>!prev
            }["PostCard.useCallback[handleCommentClick]"]);
            actions?.onCommentClick?.();
        }
    }["PostCard.useCallback[handleCommentClick]"], [
        actions
    ]);
    const handleReact = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PostCard.useCallback[handleReact]": (emoji)=>{
            actions?.onReact?.(emoji);
        }
    }["PostCard.useCallback[handleReact]"], [
        actions
    ]);
    const handleUnreact = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PostCard.useCallback[handleUnreact]": ()=>{
            actions?.onUnreact?.();
        }
    }["PostCard.useCallback[handleUnreact]"], [
        actions
    ]);
    const handleOpenReactionList = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PostCard.useCallback[handleOpenReactionList]": ()=>{
            setIsReactionListOpen(true);
        }
    }["PostCard.useCallback[handleOpenReactionList]"], []);
    const handleCloseReactionList = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PostCard.useCallback[handleCloseReactionList]": ()=>{
            setIsReactionListOpen(false);
        }
    }["PostCard.useCallback[handleCloseReactionList]"], []);
    const totalReactionCount = reactions.reduce((sum, r)=>sum + r.count, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonProvider"], {
        loading: skeletonLoading,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full bg-white border border-[#eae7ec] rounded-3xl overflow-hidden', className),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "flex items-start gap-2 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                className: "size-12 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                        src: author.avatarUrl,
                                        alt: author.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 211,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                        children: author.avatarFallback || author.name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 212,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                lineNumber: 210,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-center gap-1 min-h-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        as: "span",
                                        className: "text-base font-semibold text-foreground leading-6",
                                        children: author.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 223,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        as: "span",
                                        className: "text-xs text-foreground/60 leading-4",
                                        children: timestamp
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 229,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                lineNumber: 222,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                        lineNumber: 209,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "px-4 pb-4",
                        children: [
                            skeletonLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        variant: "text",
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 239,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        variant: "text",
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 240,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        variant: "text",
                                        className: "w-3/4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 241,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                lineNumber: 238,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                as: "p",
                                className: "text-sm leading-5 text-foreground whitespace-pre-wrap break-words",
                                children: content
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                lineNumber: 244,
                                columnNumber: 25
                            }, this),
                            media && media.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MediaSection, {
                                media: media
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                lineNumber: 251,
                                columnNumber: 51
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                        lineNumber: 236,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                        className: "flex items-center justify-between px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$reaction$2d$pills$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactionPills"], {
                                        reactions: reactions,
                                        userReaction: userReaction,
                                        totalCount: totalReactionCount,
                                        onReact: handleReact,
                                        onUnreact: handleUnreact,
                                        onOpenReactionList: handleOpenReactionList
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 257,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconButton, {
                                        onClick: handleCommentClick,
                                        "aria-label": "View comments",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                            className: "size-5 text-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                            lineNumber: 266,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                        lineNumber: 265,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                lineNumber: 256,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentsCount, {
                                count: commentsCount
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                                lineNumber: 269,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                        lineNumber: 255,
                        columnNumber: 17
                    }, this),
                    isCommentsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-[#eae7ec]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$comments$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentsSection"], {
                            postId: postId,
                            currentUserAvatar: currentUserAvatar,
                            currentUserName: currentUserName
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                            lineNumber: 275,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                        lineNumber: 274,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                lineNumber: 202,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$reaction$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactionList"], {
                postId: postId,
                isOpen: isReactionListOpen,
                onClose: handleCloseReactionList
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
                lineNumber: 285,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/feed/post-card.tsx",
        lineNumber: 201,
        columnNumber: 9
    }, this);
}
_s(PostCard, "Q7fsEaw+tEa8XjFQjK4Yu/ha1pM=");
_c3 = PostCard;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "IconButton");
__turbopack_context__.k.register(_c1, "MediaSection");
__turbopack_context__.k.register(_c2, "CommentsCount");
__turbopack_context__.k.register(_c3, "PostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/[slug]/backstage/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackstagePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$post$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/feed/post-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-stages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$intersection$2d$observer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-intersection-observer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-posts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/skeleton-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const MOCK_POST = {
    id: 'mock_post_1',
    stageId: 'mock_stage_1',
    text: "Just wrapped up an incredible live session with all of you! The energy was unreal. Can't wait to share the recording with premium members tomorrow.",
    isPinned: false,
    pinnedAt: null,
    publishedAt: new Date().toISOString(),
    totalViews: 1250,
    totalReactions: 87,
    totalComments: 23,
    totalShares: 12,
    createdAt: new Date().toISOString(),
    author: {
        id: 'user_1',
        name: 'Sarah Chen',
        image: 'https://i.pravatar.cc/150?img=1'
    },
    passes: [
        {
            id: 'pass_ground',
            name: 'Free Pass'
        }
    ],
    media: []
};
function BackstagePage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { data: stage, isLoading: stageLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStage"])(params.slug);
    const { data: postsData, isLoading: postsLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfinitePosts"])(stage?.id || '');
    const isLoading = stageLoading || postsLoading;
    // Use real posts data when available, otherwise use mock posts
    const posts = postsData && postsData.length > 0 ? postsData : Array.from({
        length: 10
    }, (_, i)=>({
            ...MOCK_POST,
            id: `mock_post_${i}`
        }));
    const { ref: loadMoreRef, isIntersecting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$intersection$2d$observer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIntersectionObserver"])({
        threshold: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackstagePage.useEffect": ()=>{
            if (isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    }["BackstagePage.useEffect"], [
        isIntersecting,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$skeleton$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonProvider"], {
        loading: isLoading,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4 mt-6",
            children: [
                posts.map((post, index)=>{
                    // Place sentinel at 70% mark (triggers when 30% of list remains)
                    const sentinelIndex = Math.floor(posts.length * 0.7);
                    const showSentinel = index === sentinelIndex && hasNextPage;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            showSentinel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: loadMoreRef
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/[slug]/backstage/page.tsx",
                                lineNumber: 67,
                                columnNumber: 32
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$feed$2f$post$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostCard"], {
                                postId: post.id,
                                author: {
                                    name: post.author.name,
                                    avatarUrl: post.author.image || undefined
                                },
                                timestamp: post.publishedAt,
                                content: post.text || '',
                                reactions: post.totalReactions > 0 ? [
                                    {
                                        emoji: '🙏',
                                        count: post.totalReactions
                                    }
                                ] : [],
                                commentsCount: post.totalComments,
                                skeletonLoading: isLoading
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/[slug]/backstage/page.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        ]
                    }, post.id, true, {
                        fileName: "[project]/apps/web/src/app/[slug]/backstage/page.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, this);
                }),
                isFetchingNextPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-4 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-muted-foreground",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/[slug]/backstage/page.tsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/[slug]/backstage/page.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/[slug]/backstage/page.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/app/[slug]/backstage/page.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(BackstagePage, "eD8VI1ooG/Yt1zpZXvmfaD93dNU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfinitePosts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$intersection$2d$observer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIntersectionObserver"]
    ];
});
_c = BackstagePage;
var _c;
__turbopack_context__.k.register(_c, "BackstagePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_b812d1a3._.js.map