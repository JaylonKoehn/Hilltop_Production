import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChecklists = async () => {
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
    };

    fetchChecklists();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hilltop Production Dashboard</h1>
      <p>Displaying active checklist items from Supabase:</p>

      {loading ? (
        <p>Loading...</p>
      ) : checklists.length === 0 ? (
        <p>No checklist items found in the database.</p>
      ) : (
        <ul>
          {checklists.map((item) => (
            <li key={item.id}>
              <strong>{item.item}</strong> –{' '}
              {item.completed ? '✅ Complete' : '🔧 In Progress'}{' '}
              {item.due_date && (
                <em style={{ marginLeft: '1rem' }}>
                  (Due: {new Date(item.due_date).toLocaleDateString()})
                </em>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
