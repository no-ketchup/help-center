import * as React from "react";
import type { SVGProps } from "react";
const SvgQuestion = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.012 7.718c-.163-1.151 1.312-4.376 5.525-3.598 3.737.69 4.55 4.318 1.95 6.478-1.463 1.349-3.445 3.627-2.925 6.046m-.876 4.938c.444.427 1.174.55 1.775.26.59-.284.87-.876.726-1.429m-2.5 1.169a1.3 1.3 0 0 1-.21-.259c-.385-.628-.123-1.415.586-1.757.71-.342 1.598-.11 1.984.519q.097.16.14.328m-2.5 1.169c.645.206 2.05.261 2.5-1.169"
    />
  </svg>
);
export default SvgQuestion;
