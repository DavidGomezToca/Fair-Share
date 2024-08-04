import FriendsData from "../data/friendsData.json";
import VersionWatermark from "./VersionWatermark";

export default function App() {
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList />
        <FormAddFriend />
        <Button>Close</Button>
      </div>
      <FormSplitBill />
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
      <Button>Select</Button>
    </li>
  )
}

function Button({ children }) {
  return (
    <button className="button">{children}</button>
  )
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <InputText>👬Friend Name</InputText>
      <InputText>📷 Image URL</InputText>
      <Button>Add</Button>
    </form>
  )
}

function InputText({ children, disabled }) {
  return (
    <>
      <label>{children}</label>
      <input type="text" disabled={disabled} />
    </>
  )
}

function FormSplitBill() {
  const selectedFriend = "Clark";

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend}</h2>
      <InputText>💰 Bill value</InputText>
      <InputText>🙍‍♂️ Your expense</InputText>
      <InputText disabled="disabled">👬 {selectedFriend}'s expense</InputText>
      <InputSelect selectedFriend={selectedFriend} />
      <Button>Split bill</Button>
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