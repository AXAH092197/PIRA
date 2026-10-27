export const APPROVAL_WINDOW_MS=72*60*60*1000;
export const CODE_LIFETIME_MS=10*60*1000;
export const MAX_CODE_ATTEMPTS=5;
export const STATUS=Object.freeze({PENDING:"pending",APPROVED:"approved",EXPIRED:"expired",DENIED:"denied"});
export function createVerificationRequest({id,accountId,businessId,requestedRole,now=Date.now()}){
 if(!id||!accountId||!businessId||!requestedRole)throw new TypeError("Missing verification identity");
 if(!Number.isFinite(now))throw new TypeError("Invalid timestamp");
 return {id,accountId,businessId,requestedRole,status:STATUS.PENDING,issuedAt:now,expiresAt:now+APPROVAL_WINDOW_MS,approvedAt:null,deniedAt:null};
}
export function effectiveStatus(request,now=Date.now()){
 if(!request)throw new TypeError("Missing request");
 if(request.status!==STATUS.PENDING)return request.status;
 return now>=request.expiresAt?STATUS.EXPIRED:STATUS.PENDING;
}
export function remainingMs(request,now=Date.now()){return Math.max(0,request.expiresAt-now)}
export function issueCodeMetadata(request,now=Date.now()){
 if(effectiveStatus(request,now)!==STATUS.PENDING)throw new Error("Verification request is not active");
 return {requestId:request.id,expiresAt:Math.min(request.expiresAt,now+CODE_LIFETIME_MS),maxAttempts:MAX_CODE_ATTEMPTS};
}
export function canGrantBusinessAccess(request,now=Date.now()){return Boolean(request&&request.status===STATUS.APPROVED&&request.approvedAt!==null&&request.approvedAt<request.expiresAt&&request.approvedAt<=now)}
