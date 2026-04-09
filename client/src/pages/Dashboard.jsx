import { useState } from "react";

const Dashboard = () => {

     const [user, setUser] = useState();

     const storedUser = JSON.parse(localStorage.getItem("user"));

     if(storedUser){
        setUser(storedUser);
     }
  return (
    <div>
      <h1>
        Welcome {user ? user.name : "User"}
      </h1>

        <p>This is your dashboard. You can access your profile, settings, and other features here.</p>
    </div>
  );
};

export default Dashboard;
