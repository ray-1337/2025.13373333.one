/**
 * completely adapted from:
 * https://github.com/malted/nurture
 */

import { useRef, useEffect, useState, useContext } from "react";
import { Scene, PerspectiveCamera, WebGLRenderer, Clock, Vector3, BufferGeometry, LineBasicMaterial, Line as ThreeLine } from "three";
import { createNoise2D } from "simplex-noise";

import MenuContext from "@/contexts/Menu";

import style from "@/styles/components/Porter.module.css";

// constant
const startY: number = -20;
const endY: number = 20;
const lineRes: number = 0.01;
const cameraZoom: number = 25;
const speedAltitude: number = 0.0375;
const messDirectionInteger: number = 19.9;

export default function Porter() {
  const [menuState] = useContext(MenuContext);
  const [activeState, setActiveState] = useState<boolean>(false);

  // ref
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const clock = new Clock();
  const material = new LineBasicMaterial({ color: 0xffffff });
  const scene = new Scene();

  const noise = createNoise2D();

  const offsetRef = useRef<Record<"x" | "y" | "z", number>>({x: 0, y: 0, z: 0});
  const elapsedRef = useRef<number>(0);
  const lineRef = useRef<ThreeLine | null>(null);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window == "undefined" || canvasRef.current === null || containerRef.current === null) {
      return;
    };

    // no mobile
    if (window.innerWidth < 768) {
      return console.log("skipped render porter robinson nurture line");
    };

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = cameraZoom;

    const ratio = window.devicePixelRatio || 1;

    const canvas = canvasRef.current;
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });

    const desiredWidth = (canvas.clientWidth * ratio) | 0;
    const desiredHeight = (canvas.clientHeight * ratio) | 0;

    renderer.setSize(desiredWidth, desiredHeight, false);

    renderer.domElement.dataset.engine = "1337";
    containerRef.current.appendChild(renderer.domElement);

    const initiateSquiggly = () => {
      elapsedRef.current = clock.getElapsedTime() * speedAltitude;

      const points: Vector3[] = [];

      for (let baseY = startY; baseY < endY; baseY += lineRes) {
        const currentScale = ((messDirectionInteger - Math.abs(baseY)) / 10) ** 3;

        offsetRef.current.x = noise(baseY, elapsedRef.current) * currentScale;
        offsetRef.current.y = noise(baseY, elapsedRef.current + 2) * currentScale;
        offsetRef.current.z = noise(baseY, elapsedRef.current + 1) * currentScale;

        points.push(new Vector3(offsetRef.current.x, baseY + offsetRef.current.y, offsetRef.current.z));
      };

      const geometry: BufferGeometry = new BufferGeometry().setFromPoints(points);

      if (lineRef.current !== null) {
        scene.remove(lineRef.current);

        // without this, the memory usage goes brr
        lineRef.current.geometry.dispose();
      };

      const newLine = new ThreeLine(geometry, material);

      lineRef.current = newLine;

      scene.add(newLine);
    };

    const animate = () => {
      if (typeof animationId?.current === "number") {
        cancelAnimationFrame(animationId.current);
      };

      const rawAnimationId = requestAnimationFrame(animate);

      initiateSquiggly();

      renderer.render(scene, camera);

      animationId.current = rawAnimationId;
    };

    animate();

    setActiveState(true);

    const disablePorterLine = () => setActiveState(false);
    window.addEventListener("beforeunload", disablePorterLine);

    console.log("successfully rendered porter robinson nurture line");

    return () => {
      if (animationId.current !== null) {
        cancelAnimationFrame(animationId.current);

        animationId.current = null;
      };

      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", disablePorterLine);
      };

      renderer.dispose();
    };
  }, []);

  return (
    <section className={style["porter"]} ref={containerRef} data-active={menuState !== null ? false : activeState}>
      <canvas ref={canvasRef} />
    </section>
  )
};