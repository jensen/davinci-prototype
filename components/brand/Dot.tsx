interface DotProps {
  type: "email" | "website";
  size: number;
}

export default function Dot(props: DotProps) {
  const color = props.type === "email" ? "#7C3AEd" : "#34D399";

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2">
        <rect width="35" height="35" rx="17.5" fill="url(#dotGradient)" />
      </g>
      <defs>
        <radialGradient
          id="dotGradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(17.5 17.5) rotate(90) scale(17.5)"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
