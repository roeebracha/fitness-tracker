import {useState} from "react"
import { toast } from "react-toastify"
import { api } from "@/api/client"
import {Button} from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

export default function SyncGarminButton() {
    const [syncing, setSyncing] = useState(false);

    async function sync(){
        setSyncing(true);
    try {
        const {data} = await api.post("/workouts/sync/garmin");
        console.log(data.fetched, data.created, data.updated)
        toast.success(`Synced ${data.fetched} workouts ${data.created} new}`)
    } catch (error){
        toast.error(error.response?.data?.message);
} finally {
    setSyncing(false);
}
}
  return <Button variant="outline" onClick={sync} disabled={syncing}>
  <RefreshCcw className={syncing ? "animate-spin" : ""} />
  {syncing ? "syncing..." : "Sync Garmin"}
  </Button>

}
