import React from "react";
import {
  provideAddNewUserUseCase,
  provideGetUserListUseCase,
} from "../../ServiceLocator";
import { useUsers } from "./useUsers";

const ReactView = () => {
  const getUsersUseCase = provideGetUserListUseCase();
  const addNewUserUseCase = provideAddNewUserUseCase();

  const { users, error, newUser, handleChangeNewUser, addUser } = useUsers(
    getUsersUseCase,
    addNewUserUseCase
  );

  return (
    <div>
      <form>
        <h1>Agregar usuario</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChangeNewUser}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChangeNewUser}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChangeNewUser}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChangeNewUser}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            onChange={handleChangeNewUser}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChangeNewUser}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            addUser(newUser);
          }}
        >
          Add User
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <h1>Lista de usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.getId()}>
            {user.username} ({user.email.value}) - {user.address},{" "}
            {user.zip.value}, {user.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactView;
