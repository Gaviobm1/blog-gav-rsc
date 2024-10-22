import { range } from "@/helpers/helpers";
import { ChevronLeft, ChevronRight } from "react-feather";
import styles from "./PageButtons.module.css";
import Link from "next/link";

export default function PageButtons({ pages, max = 10, current }) {
  function forward() {
    const nextCurrent = current + 1;
    if (nextCurrent > pages) {
      return;
    }
    return `?page=${nextCurrent}`;
  }

  function back() {
    const nextCurrent = current - 1;
    if (nextCurrent < 1) {
      return;
    }
    return `?page=${nextCurrent}`;
  }
  const forwardLink = forward();
  const backLink = back();
  const down = 5;
  const up = 4;
  let start = 1;
  let end = max;
  if (max > pages) {
    end = pages;
  } else {
    if (current > down && current + up <= pages) {
      start = current - down;
      end = current + up;
    }
    if (current + up > pages) {
      start = pages - (max - 1);
      end = pages;
    }
  }

  return (
    <div className={styles.wrapper}>
      <Link href={back() || "#"}>
        <button className={styles.pagebutton}>
          <ChevronLeft />
        </button>
      </Link>
      {range(start, end).map((num) => (
        <Link key={num} href={`?page=${num}`}>
          <button
            className={num === current ? styles.current : styles.pagebutton}
          >
            {num}
          </button>
        </Link>
      ))}
      <Link href={forward() || "#"}>
        <button
          className={current === pages ? styles.deactivated : styles.pagebutton}
        >
          <ChevronRight />
        </button>
      </Link>
    </div>
  );
}
