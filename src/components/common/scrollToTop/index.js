"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "./scrollToTop.module.scss";

const ClickScrollToTop = () => {
  const [offset, setOffset] = useState(0);
  const isBrowser = () => typeof window !== "undefined";

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {offset >= 600 && (
        <div className={styles.container}>
          <button onClick={() => scrollToTop()}>
            <FaArrowUp className={styles.icon} />
          </button>
        </div>
      )}
    </>
  );
};

export default ClickScrollToTop;
