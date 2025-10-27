import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PnpmIcon: React.FC<IconProps> = ({ size = 24, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 2500 2500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_23_121)">
        <path d="M0 0H2500V2500H0V0Z" fill="white" />
        <path
          d="M2361.25 833.33H1666.81V138.89H2361.25V833.33ZM1597.22 833.33H902.78V138.89H1597.22V833.33ZM833.33 833.33H138.89V138.89H833.33V833.33ZM2361.25 1597.22H1666.81V902.78H2361.25V1597.22Z"
          fill="#F9AD00"
        />
        <path
          d="M1597.22 1597.22H902.78V902.78H1597.22V1597.22ZM1597.22 2361.11H902.78V1666.67H1597.22V2361.11ZM2361.25 2361.11H1666.81V1666.67H2361.25V2361.11ZM833.33 2361.11H138.89V1666.67H833.33V2361.11Z"
          fill="#4E4E4E"
        />
      </g>
      <defs>
        <clipPath id="clip0_23_121">
          <rect width="2500" height="2500" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
