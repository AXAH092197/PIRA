import {STATUS} from "./policy.js";
const mapRow=r=>r&&({id:r.id,accountId:r.account_id,businessId:r.business_id,requestedRole:r.requested_role,status:r.status,issuedAt:new Date(r.issued_at).getTime(),expiresAt:new Date(r.expires_at).getTime(),approvedAt:r.approved_at?new Date(r.approved_at).getTime():null,approvedBy:r.approved_by??null});
export class PostgresVerificationStore{
 constructor(pool){if(!pool?.query)throw new TypeError("PostgreSQL pool required");this.pool=pool}
 async insert(r){
  // The database sets issuance and expiry using its own clock, not a client clock.
  const q=await this.pool.query("INSERT INTO business_verification_requests(id,account_id,business_id,requested_role,issued_at,expires_at) VALUES($1,$2,$3,$4,now(),now()+interval '72 hours') RETURNING *",[r.id,r.accountId,r.businessId,r.requestedRole]);
  return mapRow(q.rows[0]);
 }
 async get(id){
  const q=await this.pool.query("SELECT * FROM business_verification_requests WHERE id=$1",[id]);return mapRow(q.rows[0]??null);
 }
 async transition(id,{from,to,requireBeforeExpiry,approvedBy,reason}){
  if(from!==STATUS.PENDING||![STATUS.APPROVED,STATUS.DENIED,STATUS.EXPIRED].includes(to))throw new Error("Invalid transition");
  if((to===STATUS.EXPIRED&&requireBeforeExpiry)||(to!==STATUS.EXPIRED&&!requireBeforeExpiry))throw new Error("Invalid expiry guard");
  let sql,params;
  if(to===STATUS.APPROVED){if(!approvedBy)throw new Error("Approver required");sql="UPDATE business_verification_requests SET status='approved',approved_at=now(),approved_by=$2 WHERE id=$1 AND status='pending' AND now()<expires_at RETURNING id";params=[id,approvedBy]}
  else if(to===STATUS.DENIED){sql="UPDATE business_verification_requests SET status='denied',denied_at=now(),denial_reason=$2 WHERE id=$1 AND status='pending' AND now()<expires_at RETURNING id";params=[id,reason??"verification_rejected"]}
  else{sql="UPDATE business_verification_requests SET status='expired' WHERE id=$1 AND status='pending' AND now()>=expires_at RETURNING id";params=[id]}
  const q=await this.pool.query(sql,params);return q.rowCount===1;
 }
 async expireDue(){const q=await this.pool.query("UPDATE business_verification_requests SET status='expired' WHERE status='pending' AND now()>=expires_at RETURNING id");return q.rowCount}
}
