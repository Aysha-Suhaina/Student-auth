import { useEffect, useState } from "react";
import { getHabits } from "../../api/habitApi.js"; //createhabit is not used yet, so i commented it out for now
import HabitCard from "../../components/HabitCard.jsx";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const userId = "123"; // dummy value haha
    
 // const fetchHabits = async () => {
   // const res = await getHabits(userId);
    //setHabits(res.data);
 // };

  useEffect(() => {
  const fetchHabits = async () => {
    try {
      const res = await getHabits(userId);
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchHabits();
}, [userId]);
//   const handleAdd = async () => {
//     await createHabit({
//       habitName: "Read Quran",
//       type: "good",
//       userId
//     });

//     fetchHabits();
//   };   has to look up this errro later - its confusing ahhhhhhhh

  return (
    <div>
      <h2>Habit Tracker</h2>

  {habits.map(habit => (
  <HabitCard
    key={habit._id}
    habit={habit}
    //refresh={fetchHabits}

  />
      ))}
      <p>heyy</p>
    </div>
  );
}