import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
//Button
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
 




export default function App() {
  const [showAf, setshowAf] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [split, setSplit] = useState(null);

  function handleAddFriend() {
    setshowAf((showAf) => !showAf);
  }


  function handleFriendAdded(friend) {
    setFriends((addfrind) => [...addfrind, friend]);
    setshowAf(false);
  }


  function handleSplit(friend) {
    //setSplit(friend);
    setSplit(cur => cur && cur.id=== friend.id ? null : friend)
    setshowAf(false);

  }

 function handleSplitBill(value)
 {
setFriends((friends)=> 
friends.map((friend) =>
 friend.id === split.id  ?
  {...friend , balance:friend.balance + value } : friend ))

  setSplit(null)
 }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
         friends={friends}
         onSelect={handleSplit}
        selectFriend={split}
         />

        {showAf && <FormAddFriend onAddFriend={handleFriendAdded} />}

        <Button onClick={handleAddFriend}>
          {showAf ? "close" : "Add friend"}
        </Button>
      </div>
      {split && <Spiltabill selectFriend={split} onsplit={handleSplitBill} />}
    </div>
  );
}




function Friends({ friends, onSelect , selectFriend }) {
  return (
    <ul>
      {friends.map((information) => (
        <InfoList
          friend={information}
          key={information.id}
          selectFriend={selectFriend}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}


function InfoList({ friend, onSelect , selectFriend }) {
  const isSelected = selectFriend && selectFriend.id === friend.id;

  return (
    <li  className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt="pepep" />
      <h3> name is {friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes You {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelect(friend)}>{isSelected ? "Close" : "select"}</Button>
    </li>
  );
}






function FormAddFriend({ onAddFriend }) {
  const [name, setname] = useState("");
  const [image, setimage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    if (!name || !image) return;
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    console.log(newFriend);
    onAddFriend(newFriend);

    setname("");
    setimage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> 👩🏼‍🤝‍🧑🏿FriendName</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <label> Image url 📸 </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setimage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}




function Spiltabill({selectFriend,onsplit}) {
  const[bill, setBill] = useState("");
  const[paid ,setPaid] =useState("");
  const [whoIsPaing , setWhoIsPing] =useState("user")
  const paidbyFriend =bill ? bill - paid : ""

  function handleSubmit(e)
  {
     e.preventDefault();
     if(!bill || !paid) return ;

     onsplit(whoIsPaing === 'user' ?  paidbyFriend : -paid)

  }
  
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a billl with {selectFriend.name}</h2>
      <label>💰Bill value</label>
      <input type="text" value={bill} onChange={e=>setBill(Number(e.target.value))} />

      <label> 🧍‍♂️Your expense</label>
      <input type="text"  value={paid} onChange={e=>setPaid
        (Number(e.target.value) > bill ? paid : Number(e.target.value))}/>

      <label> 👩🏾‍🤝‍🧑🏻{selectFriend.name}'s expense: </label>
      <input type="text" disabled  value={paidbyFriend} />

      <label>🤑 Who is paying the bill ?</label>
      <select value={whoIsPaing} onChange={e=>setWhoIsPing(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
