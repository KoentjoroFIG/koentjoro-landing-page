import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const TensorflowIcon: React.FC<IconProps> = ({
  size = 24,
  ...props
}) => {
  return (
    <svg
      width={size * (2332 / 2500)}
      height={size}
      viewBox="0 0 2332 2500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_18_95)">
        <path
          d="M1332.3 384.6V769.2L1998.5 1153.8V769.2L1332.3 384.6ZM0 769.2V1153.8L333.1 1346.1V961.5L0 769.2ZM999.2 961.5L666.1 1153.8V2307.6L999.2 2500V1730.8L1332.3 1923.1V1538.5L999.2 1346.2V961.5Z"
          fill="#E55B2D"
        />
        <path
          d="M1332.3 384.6L333.1 961.5V1346.1L999.3 961.5V1346.1L1332.4 1153.8V384.6H1332.3ZM2331.5 576.9L1998.4 769.2V1153.8L2331.5 961.5V576.9ZM1665.4 1346.2L1332.3 1538.5V1923.1L1665.4 1730.8V1346.2ZM1332.3 1923.1L999.2 1730.8V2500L1332.3 2307.7V1923.1Z"
          fill="#ED8E24"
        />
        <path
          d="M1332.3 0L0 769.2L333.1 961.5L1332.3 384.6L1998.5 769.2L2331.6 576.9L1332.3 0ZM1332.3 1153.8L999.2 1346.1L1332.3 1538.4L1665.4 1346.1L1332.3 1153.8Z"
          fill="#F8BF3C"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_95">
          <rect width="2331.5" height="2500" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
