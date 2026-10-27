import test from "node:test";import assert from "node:assert/strict";
import {APPROVAL_WINDOW_MS,CODE_LIFETIME_MS,STATUS,createVerificationRequest,effectiveStatus,remainingMs,issueCodeMetadata,canGrantBusinessAccess} from "../src/server/business-verification/policy.js";
import {BusinessVerificationService} from "../src/server/business-verification/service.js";
class Store{
 data=new Map();
 async insert(r){if(this.data.has(r.id))throw new Error("duplicate");this.data.set(r.id,{...r})}
 async get(id){const r=this.data.get(id);return r?{...r}:null}
 async transition(id,{from,to,now,requireBeforeExpiry,approvedBy,reason}){
  const r=this.data.get(id);
  if(!r||r.status!==from||(requireBeforeExpiry&&now>=r.expiresAt))return false;
  r.status=to;
  if(to===STATUS.APPROVED){r.approvedAt=now;r.approvedBy=approvedBy}
  if(to===STATUS.DENIED){r.deniedAt=now;r.reason=reason}
  return true;
 }
}
test("exact 72 hour deadline and remaining time",()=>{const r=createVerificationRequest({id:"r",accountId:"a",businessId:"b",requestedRole:"employee",now:1000});assert.equal(r.expiresAt-1000,APPROVAL_WINDOW_MS);assert.equal(effectiveStatus(r,r.expiresAt-1),"pending");assert.equal(effectiveStatus(r,r.expiresAt),"expired");assert.equal(remainingMs(r,r.expiresAt+1),0)});
test("short code never extends approval window",()=>{const r=createVerificationRequest({id:"r",accountId:"a",businessId:"b",requestedRole:"employee",now:0});assert.equal(issueCodeMetadata(r,100).expiresAt,100+CODE_LIFETIME_MS);assert.equal(issueCodeMetadata(r,r.expiresAt-1000).expiresAt,r.expiresAt);assert.throws(()=>issueCodeMetadata(r,r.expiresAt))});
test("approve before deadline grants access",async()=>{let now=10;const store=new Store();const service=new BusinessVerificationService({store,clock:()=>now});await service.start({id:"r",accountId:"a",businessId:"b",requestedRole:"employee"});now+=1000;assert.deepEqual(await service.approve("r",{authorizedApproverId:"v",verifiedOrganizationContact:true}),{approved:true,status:"approved"});assert.equal(canGrantBusinessAccess(await service.status("r"),now),true)});
test("cannot approve at deadline or after expiry",async()=>{let now=0;const store=new Store();const service=new BusinessVerificationService({store,clock:()=>now});await service.start({id:"r",accountId:"a",businessId:"b",requestedRole:"employee"});now=APPROVAL_WINDOW_MS;assert.equal((await service.approve("r",{authorizedApproverId:"v",verifiedOrganizationContact:true})).approved,false);assert.equal((await service.status("r")).status,"expired")});
test("cannot approve without verified organization contact",async()=>{const service=new BusinessVerificationService({store:new Store()});await service.start({id:"r",accountId:"a",businessId:"b",requestedRole:"employee"});await assert.rejects(()=>service.approve("r",{authorizedApproverId:"v"}))});
test("denied request cannot later be approved",async()=>{let now=0;const service=new BusinessVerificationService({store:new Store(),clock:()=>now});await service.start({id:"r",accountId:"a",businessId:"b",requestedRole:"employee"});assert.equal((await service.deny("r")).denied,true);assert.equal((await service.approve("r",{authorizedApproverId:"v",verifiedOrganizationContact:true})).approved,false)});
