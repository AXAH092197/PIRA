import {randomUUID} from "node:crypto";
import {BusinessVerificationService} from "./service.js";
import {PostgresVerificationStore} from "./postgres-store.js";
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const send=(res,status,data)=>{res.writeHead(status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"});res.end(JSON.stringify(data))};
const readBody=async req=>{let raw="";for await(const chunk of req){raw+=chunk;if(raw.length>8192)throw new Error("Request too large")}return JSON.parse(raw||"{}")};
/**
 * Mount behind HTTPS, authenticated session middleware, CSRF defenses and rate limiting.
 * identity(req) MUST validate server-side login and return {accountId,accountType,emailVerified}.
 * authorizeStart MUST check business membership/organization request eligibility.
 * authorizeApproval MUST independently verify organization representative and permissions.
 * Never expose this handler directly to the public without these dependencies.
 */
export function createBusinessVerificationHandler({pool,identity,authorizeStart,authorizeApproval,audit}){
 if(!pool||!identity||!authorizeStart||!authorizeApproval||!audit)throw new TypeError("Authentication, authorization and audit dependencies required");
 const service=new BusinessVerificationService({store:new PostgresVerificationStore(pool),audit});
 return async(req,res)=>{
  try{
   const user=await identity(req);
   if(!user?.accountId||user.accountType!=="business"||!user.emailVerified)return send(res,401,{error:"Authentication required"});
   const url=new URL(req.url,"http://internal.invalid");
   if(req.method==="POST"&&url.pathname==="/api/business-verification"){
    const body=await readBody(req);
    if(!uuid.test(body.businessId??"")||!["owner","admin","employee","representative"].includes(body.requestedRole))return send(res,400,{error:"Invalid request"});
    if(!await authorizeStart({user,businessId:body.businessId,requestedRole:body.requestedRole}))return send(res,403,{error:"Not authorized"});
    const record=await service.start({id:randomUUID(),accountId:user.accountId,businessId:body.businessId,requestedRole:body.requestedRole});
    return send(res,201,{id:record.id,status:record.status});
   }
   const match=url.pathname.match(/^\/api\/business-verification\/([0-9a-f-]{36})(?:\/(approve|deny))?$/i);
   if(!match||!uuid.test(match[1]))return send(res,404,{error:"Not found"});
   const id=match[1];const record=await service.status(id);
   if(!record)return send(res,404,{error:"Not found"});
   const owner=record.accountId===user.accountId;
   if(req.method==="GET"&&!match[2]){
    if(!owner)return send(res,404,{error:"Not found"});
    return send(res,200,{id:record.id,status:record.status,issuedAt:new Date(record.issuedAt).toISOString(),expiresAt:new Date(record.expiresAt).toISOString(),remainingMs:Math.max(0,record.expiresAt-Date.now()),requestedRole:record.requestedRole});
   }
   if(req.method==="POST"&&match[2]){
    // A verified company approver is not necessarily the applicant.
    const permission=await authorizeApproval({user,record,action:match[2]});
    if(!permission?.verifiedOrganizationContact||!permission?.authorizedApproverId)return send(res,403,{error:"Organization approval required"});
    const result=match[2]==="approve"?await service.approve(id,permission):await service.deny(id,{reason:"organization_rejected"});
    return send(res,result.approved||result.denied?200:409,result);
   }
   return send(res,405,{error:"Method not allowed"});
  }catch(e){await audit({event:"business_verification_request_error",errorType:e?.name??"Error"}).catch(()=>{});return send(res,400,{error:"Unable to process request"})}
 };
}
