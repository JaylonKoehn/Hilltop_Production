-- PostgreSQL schema for Hilltop Production

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT,
    model TEXT,
    serial_number TEXT,
    work_order TEXT,
    required_hours INTEGER,
    sold BOOLEAN,
    size TEXT,
    custom_note TEXT
);

CREATE TABLE checklists (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    task TEXT,
    completed BOOLEAN DEFAULT FALSE
);