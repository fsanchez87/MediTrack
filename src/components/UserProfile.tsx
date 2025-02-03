import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SensorData, SensorSummary, type User } from "../types";
import SensorSummaryList from "./SensorSummaryList";

const URL_API: string = 'https://dummyjson.com/users';
const URL_SENSOR: string ='https://dummyjson.com/c/2a53-476e-482b-81ec' 

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>()
  const [sensorsData, setSensorsData] = useState<SensorSummary[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSensor, setIsLoadingSensor] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${URL_API}/${userId}`)
    .then(async res => await res.json())
    .then(res => {
      setUser(res)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false) 
      }
    ) 
    }, [userId])

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

    
  if (isLoading) return <p>Loading ...</p>
  if (!user) return <p>User not found ...</p>

  return (
    <section>      
      <h1>{user?.firstName}</h1>
      <p>{JSON.stringify(user)}</p>

      <p>Sensor</p>
      {isLoadingSensor ? (
        <p>Loading sensor data ...</p>) : (
          <SensorSummaryList sensorsData={sensorsData}></SensorSummaryList>
        )}
    </section>
  )
}
