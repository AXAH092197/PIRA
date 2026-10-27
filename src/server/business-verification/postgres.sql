-- PostgreSQL schema and atomic transitions. All timestamps UTC (timestamptz).
-- Restrict direct table writes to the trusted verification service.
CREATE TABLE IF NOT EXISTS business_verification_requests (
 id uuid PRIMARY KEY,
 account_id uuid NOT NULL,
 business_id uuid NOT NULL,
 requested_role text NOT NULL,
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','expired','denied')),
 issued_at timestamptz NOT NULL DEFAULT now(),
 expires_at timestamptz NOT NULL,
 approved_at timestamptz,
 approved_by uuid,
 denied_at timestamptz,
 denial_reason text,
 CHECK(expires_at=issued_at+interval '72 hours')
);
CREATE INDEX IF NOT EXISTS business_verification_pending_expiry ON business_verification_requests(expires_at) WHERE status='pending';
-- Start request: INSERT with issued_at=now(), expires_at=now()+interval '72 hours' in one trusted DB transaction.
-- Approval is atomic and cannot succeed at or after expiry.
-- Bind :id and :approved_by as parameters; approver authorization must be checked separately.
-- UPDATE business_verification_requests SET status='approved', approved_at=now(), approved_by=:approved_by
-- WHERE id=:id AND status='pending' AND now()<expires_at RETURNING *;
-- Denial: UPDATE ... SET status='denied',denied_at=now(),denial_reason=:reason
-- WHERE id=:id AND status='pending' AND now()<expires_at RETURNING *;
-- Expire: UPDATE business_verification_requests SET status='expired'
-- WHERE status='pending' AND now()>=expires_at RETURNING id;
-- Reissue challenge: use a separate hashed, one-time code table with expires_at capped by request expiry.
-- IMPORTANT: An application service must verify independent organization contact, approver identity and role;
-- a submitted code alone must never call the approval transition.
