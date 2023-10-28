import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handelItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handelDelete(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handelToggeldItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelItems} />
      <PakingList
        onPacked={handelToggeldItem}
        onDelete={handelDelete}
        items={items}
      />
      <Stats item={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴Far Away💼 </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function HandelSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    console.log(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={HandelSubmit}>
      <h3> What do you need for your trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PakingList({ items, onDelete, onPacked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onPacked={onPacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete, onPacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onPacked(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numOfItems = items.length;
  const numOfSelected = items.filter((items) => items.packed).length;
  const precentage = Math.round(numOfSelected / numOfItems) * 100;
  return (
    <footer className="stats">
      <em>
        💼 You have {numOfItems} items on your list, and you already packed
        {numOfSelected}({precentage}%)
      </em>
    </footer>
  );
}
