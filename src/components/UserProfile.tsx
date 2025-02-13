import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { type User } from "../types";

const URL_API: string = 'https://dummyjson.com/users';

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    
  if (isLoading) return <p>Loading ...</p>
  if (!user) return <p>User not found ...</p>

  return (
    <section>      
      <h1>{user?.firstName}</h1>
      <p>{JSON.stringify(user)}</p>
    </section>
  )
}
