import { useState } from "react";
import FriendsData from "../data/friendsData.json";
import VersionWatermark from "./VersionWatermark";

export default function App() {
  const [friends, setFriends] = useState(FriendsData.friends);
  const [showAddFriend, setShowAddFriend] = useState(true);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
      </div>
      <FormSplitBill />
      <VersionWatermark />
    </div>
  )
}

function FriendList({ friends }) {
  return (
    <ul>{friends.map(friend => <Friend key={friend.id} friend={friend} />)}</ul >
  )
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          You and {friend.name} are even
        </p>
      )}
      <Button disabled={true}>Select</Button>
    </li>
  )
}

function Button({ children, onClick, disabled }) {
  return (
    <button className={`button ${disabled ? "buttonDisabled" : ""}`} onClick={onClick} > {children}</button >
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const id = crypto.randomUUID();
    const newFriendName = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    const newFriend = {
      id,
      name: newFriendName,
      image: `https://i.pravatar.cc/48?${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <InputText value={name} setValue={setName}>👬Friend Name</InputText>
      <Button>Add</Button>
    </form >
  )
}

function InputText({ children, value, setValue, disabled }) {
  return (
    <>
      <label>{children}</label>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled} />
    </>
  )
}

function FormSplitBill() {
  const selectedFriend = "Clark";

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend}</h2>
      <InputText disabled="disabled">💰 Bill value</InputText>
      <InputText disabled="disabled">🙍‍♂️ Your expense</InputText>
      <InputText disabled="disabled">👬 {selectedFriend}'s expense</InputText>
      <InputSelect selectedFriend={selectedFriend} />
      <Button disabled={true}>Split bill</Button>
    </form>
  )
}

function InputSelect({ selectedFriend }) {
  return (
    <>
      <label>🤑 Who is paying the bill</label>
      <select defaultValue="friend">
        <option value="user">You</option>
        <option value="friend">{selectedFriend}</option>
      </select>
    </>
  )
}