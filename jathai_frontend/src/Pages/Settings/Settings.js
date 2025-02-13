import useUsers from "../Dashboards/Boards/hooks/useUsers"; // Use default import for useUsers
import Profile from "./Profile";
import LineNotify from "./LineNotify";
import EmailNotify from "./EmailNotify";

const Settings = () => {
  const { user} = useUsers();

  return (
    <div>
      <Profile />
      <EmailNotify />
      {user && user.line_user_id ? <LineNotify /> : null}
    </div>
  );
};

export default Settings;
