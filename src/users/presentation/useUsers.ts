import { useEffect, useState } from "react";
import type { GetUserList } from "../domain/useCases/getUserList";
import type { AddNewUser } from "../domain/useCases/addNewUser";
import type { User, UserProps } from "../domain/entities/User.entity";

export const useUsers = (
  getUsersUseCase: GetUserList,
  addNewUserUseCase: AddNewUser
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<UserProps>({} as UserProps);
  const [error, setError] = useState<string | null>(null);

  const handleChangeNewUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = getUsersUseCase.execute();
        setUsers(usersList);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    fetchUsers();
  }, [getUsersUseCase]);

  const addUser = async (user: UserProps) => {
    try {
      const newUser = await addNewUserUseCase.execute(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser({} as UserProps);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return { users, error, newUser, handleChangeNewUser, addUser };
};
