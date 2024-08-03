import FriendsData from "../data/friendsData.json";
import VersionWatermark from "./VersionWatermark";

export default function App() {
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList />
      </div>
      <VersionWatermark />
    </div>
  )
}

function FriendList() {
  const friends = FriendsData.friends;

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
      <button className="button">Select</button>
    </li>
  )
}