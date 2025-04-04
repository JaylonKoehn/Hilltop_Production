import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import NewProjectPanel from '../components/NewProjectPanel';


export default function Home() {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChecklists();
  }, []);

  async function fetchChecklists() {
    const { data, error } = await supabase
      .from('checklists')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error fetching checklists:', error);
    } else {
      setChecklists(data);
    }

    setLoading(false);
  }

  async function toggleComplete(item) {
    // Only ask for confirmation if marking as complete
    if (!item.completed) {
      const confirmed = window.confirm(`Confirm completion of task: "${item.task}"?`);
      if (!confirmed) return; // Cancel if user says no
    }
  
    const { error } = await supabase
      .from('checklists')
      .update({ completed: !item.completed })
      .eq('id', item.id);
  
    if (error) {
      console.error('Error updating checklist:', error);
    } else {
      fetchChecklists();
    }
  }
  
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hilltop Production</h1>
      <NewProjectPanel />
      <p>Displaying active land roller checklists:</p>

      {loading ? (
        <p>Loading checklists...</p>
      ) : checklists.length === 0 ? (
        <p>No checklists found in the database.</p>
      ) : (
        <ul>
          {checklists.map((item) => (
            <li key={item.id} style={{ marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(item)}
                style={{ marginRight: '0.5rem' }}
              />
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                <strong>{item.task}</strong> (Project ID: {item.project_id}) – Due:{' '}
                {item.due_date ? item.due_date : 'N/A'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
