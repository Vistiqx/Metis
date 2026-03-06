-- Metis Platform - Initial Database Schema
-- PostgreSQL with PostGIS extension

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'analyst',
    is_active BOOLEAN DEFAULT true,
    is_superuser BOOLEAN DEFAULT false,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CORE ONTOLOGY ENTITIES
-- ============================================

-- Cases: Investigation containers
CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    case_number VARCHAR(100) UNIQUE,
    status VARCHAR(50) DEFAULT 'open',
    priority VARCHAR(50) DEFAULT 'medium',
    tags TEXT[],
    owner_id UUID REFERENCES users(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    closed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events: Detected incidents or occurrences
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    event_type VARCHAR(100),
    severity VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'unconfirmed',
    confidence_score DECIMAL(3,2),
    occurred_at TIMESTAMP WITH TIME ZONE,
    location_id UUID,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations: Geospatial data
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    address TEXT,
    city VARCHAR(255),
    region VARCHAR(255),
    country VARCHAR(100),
    postal_code VARCHAR(50),
    coordinates GEOGRAPHY(POINT, 4326),
    bounding_box GEOGRAPHY(POLYGON, 4326),
    location_type VARCHAR(100),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key to events
ALTER TABLE events ADD CONSTRAINT fk_events_location 
    FOREIGN KEY (location_id) REFERENCES locations(id);

-- Actors: People or entities of interest
CREATE TABLE actors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    aliases TEXT[],
    actor_type VARCHAR(100),
    description TEXT,
    threat_level VARCHAR(50) DEFAULT 'unknown',
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts: Online identities
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES actors(id) ON DELETE CASCADE,
    platform VARCHAR(100) NOT NULL,
    handle VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    profile_url TEXT,
    bio TEXT,
    follower_count INTEGER,
    following_count INTEGER,
    post_count INTEGER,
    created_on_platform TIMESTAMP WITH TIME ZONE,
    last_seen_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    language_set TEXT[],
    geo_hints TEXT[],
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(platform, handle)
);

-- Devices: Physical or virtual devices
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_type VARCHAR(100) NOT NULL,
    identifier VARCHAR(255),
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    owner_guess VARCHAR(255),
    description TEXT,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Artifacts: Objects or markers in evidence
CREATE TABLE artifacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artifact_type VARCHAR(100) NOT NULL,
    label VARCHAR(255),
    description TEXT,
    visual_features JSONB DEFAULT '{}',
    extracted_text TEXT,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sources: Data origins
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    source_type VARCHAR(100) NOT NULL,
    url TEXT,
    api_endpoint TEXT,
    description TEXT,
    reliability_score DECIMAL(3,2),
    is_active BOOLEAN DEFAULT true,
    last_ingested_at TIMESTAMP WITH TIME ZONE,
    ingest_frequency VARCHAR(50) DEFAULT 'hourly',
    credentials JSONB DEFAULT '{}',
    configuration JSONB DEFAULT '{}',
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Evidence: Supporting documentation
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    source_id UUID REFERENCES sources(id),
    evidence_type VARCHAR(100) NOT NULL,
    title VARCHAR(500),
    description TEXT,
    content_text TEXT,
    content_url TEXT,
    storage_path TEXT,
    storage_provider VARCHAR(100) DEFAULT 's3',
    file_hash VARCHAR(255),
    file_size_bytes BIGINT,
    mime_type VARCHAR(255),
    captured_at TIMESTAMP WITH TIME ZONE,
    reliability_score DECIMAL(3,2),
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Claims: Assertions about events
CREATE TABLE claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    claim_text TEXT NOT NULL,
    claim_type VARCHAR(100),
    source_id UUID REFERENCES sources(id),
    evidence_ids UUID[],
    confidence_score DECIMAL(3,2),
    verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Narratives: Stories or explanations
CREATE TABLE narratives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    title VARCHAR(500),
    narrative_text TEXT NOT NULL,
    narrative_type VARCHAR(100),
    event_ids UUID[],
    author_id UUID REFERENCES users(id),
    version INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Watchlists: Monitored entities
CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    watchlist_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_ids UUID[],
    query_criteria JSONB DEFAULT '{}',
    alert_threshold DECIMAL(3,2) DEFAULT 0.5,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts: Notifications and warnings
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) DEFAULT 'medium',
    title VARCHAR(500),
    message TEXT,
    related_entity_type VARCHAR(100),
    related_entity_id UUID,
    watchlist_id UUID REFERENCES watchlists(id),
    acknowledged BOOLEAN DEFAULT false,
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    dismissed BOOLEAN DEFAULT false,
    dismissed_by UUID REFERENCES users(id),
    dismissed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks: Action items
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    task_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(50) DEFAULT 'medium',
    assigned_to UUID REFERENCES users(id),
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections: Grouped items
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    collection_type VARCHAR(100),
    entity_type VARCHAR(100),
    entity_ids UUID[],
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Events: Emerging possible events
CREATE TABLE candidate_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500),
    event_type_guess VARCHAR(100),
    first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_score DECIMAL(5,4),
    confidence DECIMAL(3,2),
    status VARCHAR(50) DEFAULT 'emerging',
    location_id UUID REFERENCES locations(id),
    geofence GEOGRAPHY(POLYGON, 4326),
    source_count INTEGER DEFAULT 0,
    source_ids UUID[],
    narrative_markers JSONB DEFAULT '{}',
    promoted_to_event_id UUID REFERENCES events(id),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- RELATIONSHIP TABLES
-- ============================================

-- Event-Actor relationships
CREATE TABLE event_actors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES actors(id) ON DELETE CASCADE,
    role VARCHAR(100),
    confidence DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, actor_id)
);

-- Event-Evidence relationships
CREATE TABLE event_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    evidence_id UUID REFERENCES evidence(id) ON DELETE CASCADE,
    relevance_score DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, evidence_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_owner ON cases(owner_id);
CREATE INDEX idx_events_case ON events(case_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_location ON events(location_id);
CREATE INDEX idx_events_occurred ON events(occurred_at);
CREATE INDEX idx_events_tags ON events USING GIN(tags);
CREATE INDEX idx_locations_coords ON locations USING GIST(coordinates);
CREATE INDEX idx_actors_type ON actors(actor_type);
CREATE INDEX idx_accounts_platform ON accounts(platform);
CREATE INDEX idx_accounts_actor ON accounts(actor_id);
CREATE INDEX idx_evidence_event ON evidence(event_id);
CREATE INDEX idx_evidence_source ON evidence(source_id);
CREATE INDEX idx_evidence_type ON evidence(evidence_type);
CREATE INDEX idx_sources_type ON sources(source_type);
CREATE INDEX idx_sources_active ON sources(is_active);
CREATE INDEX idx_alerts_acknowledged ON alerts(acknowledged);
CREATE INDEX idx_candidate_events_status ON candidate_events(status);
CREATE INDEX idx_candidate_events_score ON candidate_events(current_score);

-- ============================================
-- TRIGGER FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_actors_updated_at BEFORE UPDATE ON actors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artifacts_updated_at BEFORE UPDATE ON artifacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON sources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_evidence_updated_at BEFORE UPDATE ON evidence FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_narratives_updated_at BEFORE UPDATE ON narratives FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_watchlists_updated_at BEFORE UPDATE ON watchlists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_candidate_events_updated_at BEFORE UPDATE ON candidate_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
