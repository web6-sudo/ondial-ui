"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./showcase-section.module.css";

const DATA = [
  "1540968221243-29f5d70540bf",
  "1596135187959-562c650d98bc",
  "1628944682084-831f35256163",
  "1590013330451-3946e83e0392",
  "1590421959604-741d0eec0a2e",
  "1572613000712-eadc57acbecd",
  "1570097192570-4b49a6736f9f",
  "1620789550663-2b10e0080354",
  "1617775623669-20bff4ffaa5c",
  "1548600916-dc8492f8e845",
  "1573824969595-a76d4365a2e6",
  "1633936929709-59991b5fdd72",
] as const;

const CARD_COUNT = DATA.length;
const AUTO_ROTATE_DURATION_S = 32;
const AUTO_ROTATE_DURATION_REDUCED_S = 128;
const DRAG_ROTATION_FACTOR = 0.22;
const INERTIA_MULTIPLIER = 220;
const MAX_INERTIA_ROTATION = 95;
const INERTIA_DURATION_S = 0.7;

function getAutoRotateDuration() {
  if (typeof window === "undefined") return AUTO_ROTATE_DURATION_S;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? AUTO_ROTATE_DURATION_REDUCED_S
    : AUTO_ROTATE_DURATION_S;
}

export function ThreeDCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const xPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const autoRotateTweenRef = useRef<gsap.core.Tween | null>(null);
  const inertiaTweenRef = useRef<gsap.core.Tween | null>(null);
  const startAutoRotateRef = useRef<(() => void) | null>(null);
  const lastDragTsRef = useRef(0);
  const velocityRef = useRef(0);

  const stopInertia = () => {
    inertiaTweenRef.current?.kill();
    inertiaTweenRef.current = null;
  };

  const pauseAutoRotate = () => {
    autoRotateTweenRef.current?.kill();
    autoRotateTweenRef.current = null;
  };

  const resumeAutoRotate = () => {
    if (!isDraggingRef.current) {
      startAutoRotateRef.current?.();
    }
  };

  const onMouseMove = (e: globalThis.MouseEvent) => {
    drag(e.clientX);
  };

  const onTouchMove = (e: globalThis.TouchEvent) => {
    if (e.touches.length > 0) {
      drag(e.touches[0].clientX);
    }
  };

  const onDragEnd = () => {
    isDraggingRef.current = false;
    if (stageRef.current) {
      stageRef.current.style.cursor = "grab";
    }

    stopInertia();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const momentum = gsap.utils.clamp(
      -MAX_INERTIA_ROTATION,
      MAX_INERTIA_ROTATION,
      velocityRef.current * INERTIA_MULTIPLIER,
    );

    if (!reducedMotion && Math.abs(momentum) > 0.8 && ringRef.current) {
      inertiaTweenRef.current = gsap.to(ringRef.current, {
        rotationY: `-=${momentum}`,
        duration: INERTIA_DURATION_S,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          inertiaTweenRef.current = null;
          resumeAutoRotate();
        },
      });
    } else {
      resumeAutoRotate();
    }

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("touchend", onDragEnd);
  };

  const dragStart = (clientX: number) => {
    isDraggingRef.current = true;
    xPosRef.current = Math.round(clientX);
    lastDragTsRef.current = performance.now();
    velocityRef.current = 0;
    stopInertia();
    pauseAutoRotate();
    if (stageRef.current) {
      stageRef.current.style.cursor = "grabbing";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("touchend", onDragEnd);
  };

  const drag = (currentClientX: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const currentX = Math.round(currentClientX);
    const deltaX = currentX - xPosRef.current;
    const rotationDelta = (deltaX * DRAG_ROTATION_FACTOR) % 360;
    const dt = Math.max(now - lastDragTsRef.current, 1);
    const instantaneousVelocity = rotationDelta / dt;
    velocityRef.current = velocityRef.current * 0.78 + instantaneousVelocity * 0.22;

    gsap.set(ringRef.current, {
      rotationY: `-=${rotationDelta}`,
    });

    xPosRef.current = currentX;
    lastDragTsRef.current = now;
  };

  useGSAP(
    () => {
      const ring = ringRef.current;
      if (!ring) return;
      gsap.set(ring, { force3D: true });

      const startAutoRotate = () => {
        autoRotateTweenRef.current?.kill();
        autoRotateTweenRef.current = gsap.to(ring, {
          rotationY: "+=360",
          duration: getAutoRotateDuration(),
          ease: "none",
          repeat: -1,
        });
        if (isDraggingRef.current) {
          autoRotateTweenRef.current.pause();
        }
      };
      startAutoRotateRef.current = startAutoRotate;

      startAutoRotate();

      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      reducedMotionQuery.addEventListener("change", startAutoRotate);

      return () => {
        autoRotateTweenRef.current?.kill();
        autoRotateTweenRef.current = null;
        stopInertia();
        startAutoRotateRef.current = null;
        reducedMotionQuery.removeEventListener("change", startAutoRotate);
      };
    },
    { scope: stageRef },
  );

  const ringStyle = {
    "--n": CARD_COUNT,
  } as CSSProperties;

  return (
    <div
      ref={stageRef}
      className={styles.carouselStage}
      style={{ cursor: "grab" }}
      onMouseDown={(e) => dragStart(e.clientX)}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          dragStart(e.touches[0].clientX);
        }
      }}
    >
      <div ref={ringRef} className={styles.carouselRing} style={ringStyle}>
        {DATA.map((id, index) => {
          const cardStyle = {
            "--i": index,
          } as CSSProperties;

          return (
            <img
              key={id}
              className={`carousel-card ${styles.carouselCard} ${styles.carouselImage}`}
              style={cardStyle}
              src={`https://images.unsplash.com/photo-${id}?w=280&auto=format&fit=crop`}
              alt="Jellyfish"
              draggable={false}
            />
          );
        })}
      </div>
    </div>
  );
}
