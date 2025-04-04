import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

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

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hilltop Production</h1>
      <p>Displaying active land roller checklists:</p>

      {loading ? (
        <p>Loading checklists...</p>
      ) : checklists.length === 0 ? (
        <p>No checklists found in the database.</p>
      ) : (
        <ul>
          {checklists.map((item) => (
            <li key={item.id}>
              <strong>{item.task}</strong> (Project ID: {item.project_id}) - Due: {item.due_date}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
