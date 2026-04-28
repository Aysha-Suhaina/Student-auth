import { useEffect, useState } from "react";
import { getHabits } from "../api/habitApi"; //createhabit is not used yet, so i commented it out for now

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
        <div key={habit._id}>
          {habit.habitName}
        </div>
      ))}
    </div>
  );
}