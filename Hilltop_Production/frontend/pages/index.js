import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase.from('projects').select('*')
    if (error) {
      console.error('Error loading projects:', error)
    } else {
      setProjects(data)
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚜 Hilltop Production Dashboard</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Displaying active land roller builds from Supabase:
      </p>

      {projects.length === 0 ? (
        <p>No land rollers found in the database.</p>
      ) : (
        <ul>
          {projects.map((proj) => (
            <li
              key={proj.id}
              style={{
                background: '#f7f7f7',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <strong>{proj.name}</strong> — {proj.model} Roller
              <br />
              Serial: {proj.serial_number} | Size: {proj.size}
              <br />
              Required Hours: {proj.required_hours} | Sold: {proj.sold ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
