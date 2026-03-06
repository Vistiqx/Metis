-- Metis Platform - Neo4j Graph Schema
-- Execute in Neo4j Browser or via Cypher Shell

-- ============================================
-- CONSTRAINTS AND INDEXES
-- ============================================

-- Unique constraints for nodes
CREATE CONSTRAINT actor_id IF NOT EXISTS
FOR (a:Actor) REQUIRE a.id IS UNIQUE;

CREATE CONSTRAINT account_id IF NOT EXISTS
FOR (a:Account) REQUIRE a.id IS UNIQUE;

CREATE CONSTRAINT device_id IF NOT EXISTS
FOR (d:Device) REQUIRE d.id IS UNIQUE;

CREATE CONSTRAINT artifact_id IF NOT EXISTS
FOR (a:Artifact) REQUIRE a.id IS UNIQUE;

CREATE CONSTRAINT location_id IF NOT EXISTS
FOR (l:Location) REQUIRE l.id IS UNIQUE;

CREATE CONSTRAINT event_id IF NOT EXISTS
FOR (e:Event) REQUIRE e.id IS UNIQUE;

CREATE CONSTRAINT evidence_id IF NOT EXISTS
FOR (e:Evidence) REQUIRE e.id IS UNIQUE;

CREATE CONSTRAINT source_id IF NOT EXISTS
FOR (s:Source) REQUIRE s.id IS UNIQUE;

-- Indexes for performance
CREATE INDEX actor_name IF NOT EXISTS
FOR (a:Actor) ON (a.name);

CREATE INDEX account_handle IF NOT EXISTS
FOR (a:Account) ON (a.handle);

CREATE INDEX event_type IF NOT EXISTS
FOR (e:Event) ON (e.event_type);

CREATE INDEX event_occurred_at IF NOT EXISTS
FOR (e:Event) ON (e.occurred_at);

-- ============================================
-- RELATIONSHIP INDEXES
-- ============================================

CREATE INDEX rel_timestamp IF NOT EXISTS
FOR ()-[r:POSTED|SEEN_AT|SUPPORTS|LINKED_TO]-() ON (r.timestamp);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Create sample actor
MERGE (a:Actor {
    id: 'actor-001',
    name: 'Sample Actor',
    actor_type: 'individual',
    threat_level: 'medium',
    created_at: datetime()
});

-- Create sample location
MERGE (l:Location {
    id: 'loc-001',
    name: 'Sample Location',
    city: 'Washington',
    country: 'USA',
    lat: 38.9072,
    lon: -77.0369,
    created_at: datetime()
});

-- ============================================
-- GRAPH TRAVERSAL EXAMPLES
-- ============================================

-- Find all events at a location
// MATCH (e:Event)-[:OCCURRED_AT]->(l:Location {id: 'loc-001'})
// RETURN e

-- Find actors linked to events through accounts
// MATCH (a:Actor)-[:USES]->(ac:Account)-[:POSTED]->(ev:Evidence)-[:SUPPORTS]->(e:Event)
// RETURN a, ac, ev, e

-- Find related events through shared actors
// MATCH (e1:Event)<-[:INVOLVED_IN]-(a:Actor)-[:INVOLVED_IN]->(e2:Event)
// WHERE e1.id <> e2.id
// RETURN e1, a, e2

-- Campaign detection: events with shared attributes
// MATCH (e1:Event)-[:HAS_ARTIFACT]->(ar:Artifact)<-[:HAS_ARTIFACT]-(e2:Event)
// WHERE e1.id <> e2.id
// RETURN e1, ar, e2
