import { VFC } from "react";

type IconProps = {
  className?: string;
};

export const InfoIcon: VFC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#00abfb"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
    <polyline points="11 12 12 12 12 16 13 16" />
  </svg>
);

export const CloseIcon: VFC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#9e9e9e"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const SignOutIcon: VFC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#9e9e9e"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
    <path d="M7 12h14l-3 -3m0 6l3 -3" />
  </svg>
);

export const UserIcon: VFC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#9e9e9e"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
  </svg>
);
