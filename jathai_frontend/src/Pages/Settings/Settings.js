import useUsers from "../Dashboards/Boards/hooks/useUsers"; // Use default import for useUsers
import Profile from "./Profile";
import LineNotify from "./LineNotify";

const Settings = () => {
  const { user} = useUsers();

  return (
    <div>
      <Profile />
      {user && user.line_user_id ? <LineNotify /> : null}
    </div>
  );
};

export default Settings;
