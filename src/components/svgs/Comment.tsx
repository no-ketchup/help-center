import * as React from "react";
import type { SVGProps } from "react";
const SvgComment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      strokeLinecap="round"
      d="M11.5 2H19c2.21 0 4 1.69 4 3.774v8.491c0 2.085-1.79 3.774-4 3.774h-6.219a4.1 4.1 0 0 0-2.973 1.25l-2.436 2.554c-.307.321-.872.117-.872-.316v-2.544c0-.521-.448-.944-1-.944H5c-2.21 0-4-1.69-4-3.774V5.774C1 3.69 2.79 2 5 2h1m2 0h1.5"
    />
  </svg>
);
export default SvgComment;
