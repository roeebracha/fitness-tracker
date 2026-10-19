import { Button } from "@base-ui/react";
import {useAuth} from "../auth/AuthContext"
import { Plus } from "lucide-react";
import{Link} from "react-router-dom"


export default function Dashboard() {
  const{user} = useAuth();
  const firstname = (user?.name || user?.username || "").split(" ")[0];

  const today = new Date().toLocaleDateString("he-IL", {
  weekday: "long",
  day:"numeric",
  month: "long",
  });

  return  (
  <div>
    <div>
      <div>
          <p>{today}</p>
          <h2>{firstname} ,Hey</h2>
      </div>
      <Button nativeButton={false} render={<Link to="/workouts"/>}>
        <Plus/>
        New Workout
      </Button>
    </div>
  </div>
  );
  
}


