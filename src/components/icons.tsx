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

export const ChevronDownIcon: VFC<IconProps> = (props) => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const PlaylistIcon: VFC<IconProps> = (props) => (
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
    <circle cx="14" cy="17" r="3" />
    <path d="M17 17v-13h4" />
    <path d="M13 5h-10" />
    <line x1="3" y1="9" x2="13" y2="9" />
    <path d="M9 13h-6" />
  </svg>
);

export const CautionIcon: VFC<IconProps> = (props) => (
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
    <path d="M12 9v2m0 4v.01" />
    <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
  </svg>
);

export const PlusIcon: VFC<IconProps> = (props) => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const HeartIcon: VFC<IconProps> = (props) => (
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
    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
);
