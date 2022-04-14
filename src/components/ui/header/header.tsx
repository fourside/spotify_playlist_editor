import { useCallback, VFC } from "react";
import { signOut } from "next-auth/react";
import { SignOutIcon, UserIcon } from "../icons";
import { container, menuItem, menuItemAnchor, title } from "./header.css";

type Props = {
  userName: string;
};

export const HeaderComponent: VFC<Props> = (props) => {
  const handleSignOutClick = useCallback(async () => {
    await signOut();
    window.location.replace("/");
  }, []);

  return (
    <div className={container}>
      <div className={title}>Spotify Playlist Editor</div>
      <div>
        <div className={menuItem}>
          <UserIcon />
          {props.userName}
        </div>
        <a className={menuItemAnchor} onClick={handleSignOutClick}>
          <SignOutIcon />
          sign out
        </a>
      </div>
    </div>
  );
};
