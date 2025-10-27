import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PythonIcon: React.FC<IconProps> = ({ size = 24, ...props }) => {
  const reactId = React.useId();
  const grad0 = `${reactId}-py-grad0`;
  const grad1 = `${reactId}-py-grad1`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M275.41 0C220.482 0 175.956 43.1133 175.956 96.2963V162.963H348.087V181.482H99.4535C44.5267 181.482 0 224.595 0 277.778V422.223C0 475.405 44.5267 518.518 99.4535 518.518H156.83V437.038C156.83 383.855 201.357 340.74 256.285 340.74H439.89C486.367 340.74 524.042 304.26 524.042 259.26V96.2963C524.042 43.1133 479.517 0 424.59 0H275.41ZM252.46 118.519C271.472 118.519 286.885 103.595 286.885 85.1853C286.885 66.7758 271.472 51.8518 252.46 51.8518C233.445 51.8518 218.032 66.7758 218.032 85.1853C218.032 103.595 233.445 118.519 252.46 118.519Z"
        style={{ fill: `url(#${grad0})` }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M424.585 700C479.512 700 524.04 656.887 524.04 603.705V537.037H351.907V518.52H600.542C655.47 518.52 699.995 475.405 699.995 422.222V277.777C699.995 224.595 655.47 181.482 600.542 181.482H543.165V262.962C543.165 316.147 498.637 359.26 443.712 359.26H260.105C213.627 359.26 175.952 395.74 175.952 440.74V603.705C175.952 656.887 220.48 700 275.405 700H424.585ZM447.537 581.482C428.522 581.482 413.11 596.405 413.11 614.815C413.11 633.225 428.522 648.147 447.537 648.147C466.55 648.147 481.962 633.225 481.962 614.815C481.962 596.405 466.55 581.482 447.537 581.482Z"
        style={{ fill: `url(#${grad1})` }}
      />
      <defs>
        <linearGradient
          id={grad0}
          x1="262.022"
          y1="0"
          x2="262.022"
          y2="518.518"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#327EBD" />
          <stop offset="1" stopColor="#1565A7" />
        </linearGradient>
        <linearGradient
          id={grad1}
          x1="437.975"
          y1="181.482"
          x2="437.975"
          y2="700"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDA4B" />
          <stop offset="1" stopColor="#F9C600" />
        </linearGradient>
      </defs>
    </svg>
  );
};
