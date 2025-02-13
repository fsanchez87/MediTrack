import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SensorData, SensorSummary} from "../types";

const URL_SENSOR: string ='https://dummyjson.com/c/2a53-476e-482b-81ec' 

export default function UserSensorSummary() {
  const { userId } = useParams<{ userId: string }>();
  const [sensorsData, setSensorsData] = useState<SensorSummary[]>([])
  const [isLoadingSensor, setIsLoadingSensor] = useState<boolean>(true);

  useEffect(() => {
    fetch(URL_SENSOR)
    .then(async res => await res.json())
    .then(data => {                      
      setSensorsData(data.sensorData.filter((sensorData : SensorData) => sensorData.userId == Number(userId)))
      setIsLoadingSensor(false)      
    })
    .catch(err => {
      console.log(err)
      setIsLoadingSensor(false) 
      }
    ) 
    }, [userId])
    
  if (isLoadingSensor) return <p>Loading ...</p>

  return (
    <section>    

      <p>Sensor</p>
      {isLoadingSensor ? (
        <p>Loading sensor data ...</p>) : (
          <p>{JSON.stringify(sensorsData)}</p>
        )}
    </section>
  )
}
