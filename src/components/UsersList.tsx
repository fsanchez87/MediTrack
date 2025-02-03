import { Link } from "react-router-dom";
import { type User } from "../types";
import { useEffect, useState } from "react";

const URL_API: string = 'https://dummyjson.com/users'; 

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(URL_API)
    .then(async res => await res.json())
    .then(res => {
      setUsers(res.users)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false) 
      }
    )
  }, [])

  if (isLoading) return <p>Loading ...</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((users) => {
            return (
              <tr key={users.id}>
                <td><img src={users.image} alt={`Profile img ${users.firstName}`} /></td>
                <td>{users.firstName}</td>
                <td>{users.lastName}</td>
                <td>{users.address.country}</td>
                <td><Link to={`/users/${users.id}`}>Details</Link></td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
