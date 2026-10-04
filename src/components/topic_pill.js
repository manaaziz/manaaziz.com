import styles from "./topic_pill.module.css";

export default function TopicPill({ children, className = "", ...props }) {
  return <span {...props} className={`${styles.pill} ${className}`.trim()} data-topic-pill>{children}</span>;
}
