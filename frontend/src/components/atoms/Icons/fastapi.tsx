import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const FastapiIcon: React.FC<IconProps> = ({ size = 24, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 2500 2500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_9_16)">
        <path
          d="M1250 2500C1940.36 2500 2500 1940.36 2500 1250C2500 559.644 1940.36 0 1250 0C559.644 0 0 559.644 0 1250C0 1940.36 559.644 2500 1250 2500Z"
          fill="#05998B"
        />
        <path
          d="M1321.02 303.036L691.964 1439.4H1258.12L1195.21 2196.96L1824.27 1060.6H1258.12L1321.02 303.036Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_9_16">
          <rect width="2500" height="2500" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
