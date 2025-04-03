// Trigger redeploy - Hilltop Control Test

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
      <p>Live Projects from Supabase:</p>
      
      <ul>
        {projects.length === 0 ? (
          <p>No land rollers found in database.</p>
        ) : (
          projects.map((proj) => (
            <li key={proj.id} style={{ marginBottom: '1rem' }}>
              <strong>{proj.name}</strong> — {proj.model} Roller
              <br />
              Serial: {proj.serial_number} | Size: {proj.size}
              <br />
              Required Hours: {proj.required_hours} | Sold: {proj.sold ? 'Yes' : 'No'}
            </li>
          ))
        )}
      </ul>
    </main>
  )
}
