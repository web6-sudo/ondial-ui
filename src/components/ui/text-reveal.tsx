"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ElementType, type Ref } from "react";

import { useLoaderComplete } from "@/components/providers/loader-context";
import { cn } from "@/lib/utils";

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

type TextRevealTag = keyof typeof MOTION_TAGS;

type TextRevealSegment = {
  text: string;
  className?: string;
};

type TextRevealTrigger = "loader" | "inView";

type TextRevealProps = {
  children?: string;
  segments?: TextRevealSegment[];
  as?: TextRevealTag;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
  trigger?: TextRevealTrigger;
  inViewAmount?: number;
};

type WordToken = {
  word: string;
  className?: string;
  key: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function getWordTokens(children?: string, segments?: TextRevealSegment[]): WordToken[] {
  if (segments?.length) {
    const tokens: WordToken[] = [];
    segments.forEach((segment, segmentIndex) => {
      segment.text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word, wordIndex) => {
          tokens.push({
            word,
            className: segment.className,
            key: `${segmentIndex}-${wordIndex}-${word}`,
          });
        });
    });
    return tokens;
  }

  if (!children) return [];

  return children.split(" ").map((word, index) => ({
    word,
    key: `${index}-${word}`,
  }));
}

function getAccessibleText(children?: string, segments?: TextRevealSegment[]) {
  if (segments?.length) {
    return segments.map((segment) => segment.text.trim()).join(" ");
  }
  return children ?? "";
}

export function TextReveal({
  children,
  segments,
  as: Tag = "h2",
  className,
  id,
  delay = 0,
  stagger = 0.08,
  trigger = "inView",
  inViewAmount = 0.45,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLoaderComplete = useLoaderComplete();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: inViewAmount });
  const [hasRevealed, setHasRevealed] = useState(false);
  const words = getWordTokens(children, segments);
  const accessibleText = getAccessibleText(children, segments);
  const MotionTag = MOTION_TAGS[Tag];

  const shouldReveal = trigger === "loader" ? isLoaderComplete : isInView;

  useEffect(() => {
    if (shouldReveal && !hasRevealed) {
      setHasRevealed(true);
    }
  }, [shouldReveal, hasRevealed]);

  if (prefersReducedMotion) {
    const StaticTag = Tag as ElementType;
    if (!shouldReveal) {
      return (
        <StaticTag id={id} className={cn(className, "invisible")}>
          {accessibleText}
        </StaticTag>
      );
    }
    return (
      <StaticTag id={id} className={className}>
        {segments?.length ? (
          segments.map((segment, index) => (
            <span key={`${segment.text}-${index}`} className={segment.className}>
              {segment.text}
              {index < segments.length - 1 ? " " : ""}
            </span>
          ))
        ) : (
          children
        )}
      </StaticTag>
    );
  }

  return (
    <MotionTag
      ref={ref as Ref<HTMLHeadingElement>}
      id={id}
      className={cn(className)}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      animate={hasRevealed ? "visible" : "hidden"}
      transition={{ delayChildren: delay }}
    >
      {words.map((token, index) => (
        <span key={token.key} className="inline-block overflow-hidden align-bottom">
          <motion.span className={cn("inline-block", token.className)} variants={wordVariants}>
            {token.word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
