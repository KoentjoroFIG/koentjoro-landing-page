import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const NpmIcon: React.FC<IconProps> = ({ size = 24, ...props }) => {
  return (
    <svg
      width={size * (2500 / 977)}
      height={size}
      viewBox="0 0 2500 977"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 0V834.941H694.98V974.902H1250V834.941H2500V0H0Z"
        fill="#CB3837"
      />
      <path
        d="M415.059 139.961H139.961V694.98H415.059V279.922H555.02V694.98H694.98V139.961H415.059ZM834.941 139.961V834.941H1114.86V694.98H1389.96V139.961H834.941ZM1250 555.02H1114.86V279.922H1250V555.02ZM1805.02 139.961H1529.92V694.98H1805.02V279.922H1944.98V694.98H2084.94V279.922H2224.9V694.98H2364.86V139.961H1805.02Z"
        fill="white"
      />
    </svg>
  );
};
