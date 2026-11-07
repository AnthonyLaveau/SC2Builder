type StatIconProps = {
  type: "life" | "shield" | "armor" | "dps";
};

export function StatIcon({ type }: StatIconProps) {
  return (
    <svg
      className={`stat-icon stat-icon--${type}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "life" && (
        <path
          d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z"
          fill="currentColor"
          stroke="none"
        />
      )}

      {type === "shield" && <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z" />}

      {type === "armor" && <path d="m8 3-5 4 3 5v9h12v-9l3-5-5-4-4 3Z" />}

      {type === "dps" && (
        <>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
        </>
      )}
    </svg>
  );
}
