import {createVerificationRequest,issueCodeMetadata,STATUS} from "./policy.js";
/**
 * Server-side orchestration; store MUST implement atomic conditional writes.
 * Never trust a browser-supplied time, status, role, approver, or organization.
 */
export class BusinessVerificationService{
 constructor({store,clock=()=>Date.now(),audit=async()=>{}}){
  if(!store||typeof store.insert!=="function"||typeof store.get!=="function"||typeof store.transition!=="function")throw new TypeError("Atomic store required");
  this.store=store;this.clock=clock;this.audit=audit;
 }
 async start({id,accountId,businessId,requestedRole}){
  const request=createVerificationRequest({id,accountId,businessId,requestedRole,now:this.clock()});
  await this.store.insert(request);
  await this.audit({event:"business_verification_started",requestId:id,accountId,businessId});
  return request;
 }
 async status(id){
  const r=await this.store.get(id);if(!r)return null;
  const now=this.clock();
  if(r.status===STATUS.PENDING&&now>=r.expiresAt){
   await this.store.transition(id,{from:STATUS.PENDING,to:STATUS.EXPIRED,now,requireBeforeExpiry:false});
   return this.store.get(id);
  }
  return r;
 }
 async codeWindow(id){
  const r=await this.status(id);
  if(!r)throw new Error("Unknown verification request");
  return issueCodeMetadata(r,this.clock());
 }
 async approve(id,{authorizedApproverId,verifiedOrganizationContact}={}){
  if(!authorizedApproverId||!verifiedOrganizationContact)throw new TypeError("Verified organization approval required");
  const now=this.clock();
  const changed=await this.store.transition(id,{from:STATUS.PENDING,to:STATUS.APPROVED,now,requireBeforeExpiry:true,approvedBy:authorizedApproverId});
  if(!changed){await this.status(id);return {approved:false,status:(await this.store.get(id))?.status??"missing"}}
  await this.audit({event:"business_verification_approved",requestId:id,approverId:authorizedApproverId});
  return {approved:true,status:STATUS.APPROVED};
 }
 async deny(id,{reason="verification_rejected"}={}){
  const now=this.clock();
  const changed=await this.store.transition(id,{from:STATUS.PENDING,to:STATUS.DENIED,now,requireBeforeExpiry:true,reason});
  if(!changed){await this.status(id);return {denied:false,status:(await this.store.get(id))?.status??"missing"}}
  await this.audit({event:"business_verification_denied",requestId:id,reason});
  return {denied:true,status:STATUS.DENIED};
 }
}
