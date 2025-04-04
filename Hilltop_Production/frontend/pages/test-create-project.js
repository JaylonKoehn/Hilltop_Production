import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

async function createChecklistFromTemplate(model, project_id) {
  const { data: templates, error } = await supabase
    .from('checklist_templates')
    .select('*')
    .eq('model', model);

  if (error) {
    console.error('❌ Error loading checklist templates:', error);
    return;
  }

  const today = new Date();

  const checklistRows = templates.map((template) => {
    const due = new Date(today);
    due.setDate(today.getDate() + (template.default_days_due || 0));

    return {
      project_id: project_id,
      task: template.task,
      due_date: due.toISOString().split('T')[0],
      completed: false
    };
  });

  const { error: insertError } = await supabase
    .from('checklists')
    .insert(checklistRows);

  if (insertError) {
    console.error('❌ Error inserting checklist items:', insertError);
  } else {
    console.log(`✅ Checklist created for project ID ${project_id}`);
  }
}

export default function TestCreateProject() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Fixed Hitch Roller');
  const [customName, setCustomName] = useState('');

  const handleCreate = async () => {
    const projectName =
      selectedModel === 'Custom'
        ? customName || 'Unnamed Custom Project'
        : `Test ${selectedModel} Build`;

    const { data: project, error } = await supabase
      .from('projects')
      .insert([{
        name: projectName,
        model: selectedModel,
        serial: `HT-${Math.floor(Math.random() * 1000)}`,
        size: '16',
        sold: false
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Project creation error:', error);
      return;
    }

    if (selectedModel !== 'Custom') {
      await createChecklistFromTemplate(selectedModel, project.id);
    }

    alert(`✅ Project created: ${project.name}`);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>New Project</h1>

      {!showDropdown && (
        <button onClick={() => setShowDropdown(true)}>New Project</button>
      )}

      {showDropdown && (
        <div style={{ marginTop: '1rem' }}>
          <label>Select Model:</label>
          <br />
          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setCustomName(''); // reset name if changing model
            }}
          >
            <option>Swing Hitch Roller</option>
            <option>Fixed Hitch Roller</option>
            <option>Fold-up Roller</option>
            <option>ICF Bracing</option>
            <option>Custom</option>
          </select>

          {selectedModel === 'Custom' && (
            <>
              <br />
              <label>Enter Custom Project Name:</label>
              <br />
              <input
                type="text"
                placeholder="e.g. Special Bracer Build"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </>
          )}

          <br /><br />
          <button onClick={handleCreate}>Create</button>
        </div>
      )}
    </main>
  );
}
