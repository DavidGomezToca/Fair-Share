import { useState } from "react";
import FriendsData from "../data/friendsData.json";

export default function App() {
  const [friends, setFriends] = useState(FriendsData.friends);
  const [showAddFriend, setShowAddFriend] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend)
    setShowAddFriend(false);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelection} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend.name} />}
    </div>
  )
}

function FriendList({ friends, selectedFriend, onSelection }) {
  return (
    <ul>{friends.map(friend => <Friend key={friend.id} friend={friend} selectedFriend={selectedFriend} onSelection={onSelection} />)}</ul >
  )
}

function Friend({ friend, selectedFriend, onSelection }) {
  const isSelected = friend.id === selectedFriend?.id;
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
      <Button onClick={() => onSelection(friend)} selected={isSelected}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  )
}

function Button({ children, onClick, selected }) {
  return (
    <button className={`button ${selected ? "button-selected" : ""}`} onClick={onClick} > {children}</button >
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

function InputText({ children, value, setValue }) {
  return (
    <>
      <label>{children}</label>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} maxLength={10} />
    </>
  )
}

function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend}</h2>
      <label>💰 Bill value</label>
      <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} maxLength={10} />
      <label>🙍‍♂️ Your expense</label>
      <input type="number" value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} maxLength={10} />
      <InputReadOnly paidByFriend={paidByFriend}>👬 {selectedFriend}'s expense</InputReadOnly>
      <InputSelect selectedFriend={selectedFriend} whoIsPaying={whoIsPaying} setWhoIsPaying={setWhoIsPaying}>🤑 Who is paying the bill</InputSelect>
      <Button>Split bill</Button>
    </form>
  )
}

function InputReadOnly({ children, paidByFriend }) {
  return (
    <>
      <label>{children}</label>
      <input type="number" value={paidByFriend} disabled />
    </>
  )
}

function InputSelect({ children, selectedFriend, whoIsPaying, setWhoIsPaying }) {
  return (
    <>
      <label>{children}</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying((e.target.value))}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend}</option>
      </select>
    </>
  )
}