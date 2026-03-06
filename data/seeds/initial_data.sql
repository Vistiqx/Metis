-- Metis Platform - Initial Seed Data

-- Default admin user (password: admin123 - change immediately in production)
INSERT INTO users (id, email, username, hashed_password, full_name, role, is_superuser, is_active)
VALUES (
    uuid_generate_v4(),
    'admin@metis.local',
    'admin',
    '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', -- admin123
    'System Administrator',
    'admin',
    true,
    true
);

-- Sample source types
INSERT INTO sources (name, source_type, description, reliability_score, is_active)
VALUES 
    ('RSS News Feed', 'rss', 'Generic RSS news feed ingestion', 0.7, true),
    ('Twitter/X Stream', 'social', 'Twitter/X social media stream', 0.6, true),
    ('Reddit Monitor', 'social', 'Reddit posts and comments', 0.5, true),
    ('Manual Upload', 'manual', 'Manual evidence uploads by analysts', 0.9, true);

-- Sample case for testing
INSERT INTO cases (title, description, case_number, status, priority)
VALUES 
    ('Test Investigation', 'Initial test case for system validation', 'METIS-2024-001', 'open', 'medium');
