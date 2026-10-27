/**
 * LOCAL-ONLY TEST HARNESS. No real login, company identity verification or persistence.
 * Never expose publicly or use as a production authentication service.
 * Run: npm run demo:verification
 */
import http from "node:http";
import {readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {randomUUID} from "node:crypto";
import {BusinessVerificationService} from "./service.js";
import {STATUS} from "./policy.js";
const host="127.0.0.1",port=Number(process.env.PIRA_DEMO_PORT||4173);
const demoAccount="00000000-0000-4000-8000-000000000001";
const demoBusiness="00000000-0000-4000-8000-000000000002";
class MemoryStore{
 records=new Map();
 async insert(r){if(this.records.has(r.id))throw Error("Duplicate");this.records.set(r.id,{...r});return r}
 async get(id){const r=this.records.get(id);return r?{...r}:null}
 async transition(id,{from,to,now,requireBeforeExpiry,approvedBy,reason}){
  const r=this.records.get(id);
  if(!r||r.status!==from||(requireBeforeExpiry&&now>=r.expiresAt)||(to===STATUS.EXPIRED&&now<r.expiresAt))return false;
  r.status=to;
  if(to===STATUS.APPROVED){r.approvedAt=now;r.approvedBy=approvedBy}
  if(to===STATUS.DENIED){r.deniedAt=now;r.reason=reason}
  return true;
 }
}
const service=new BusinessVerificationService({store:new MemoryStore()});
const send=(res,code,body)=>{res.writeHead(code,{"content-type":"application/json","cache-control":"no-store","x-content-type-options":"nosniff"});res.end(JSON.stringify(body))};
const read=async(req)=>{let s="";for await(const chunk of req){s+=chunk;if(s.length>2048)throw Error("Too large")}return JSON.parse(s||"{}")};
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,"http://localhost");
  if(req.method==="GET"&&url.pathname==="/"){
   const html=await readFile(fileURLToPath(new URL("./demo.html",import.meta.url)));
   res.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store","content-security-policy":"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'","x-content-type-options":"nosniff"});res.end(html);return;
  }
  if(req.method==="POST"&&url.pathname==="/demo/request"){
   const r=await service.start({id:randomUUID(),accountId:demoAccount,businessId:demoBusiness,requestedRole:"employee"});
   return send(res,201,{id:r.id,status:r.status,issuedAt:r.issuedAt,expiresAt:r.expiresAt});
  }
  const match=url.pathname.match(/^\/demo\/request\/([a-f0-9-]{36})(?:\/(approve|deny|expire))?$/i);
  if(!match)return send(res,404,{error:"Not found"});
  const id=match[1],action=match[2];
  if(req.method==="GET"&&!action){const r=await service.status(id);return r?send(res,200,r):send(res,404,{error:"Not found"})}
  if(req.method==="POST"&&action){
   if(action==="approve")return send(res,200,await service.approve(id,{authorizedApproverId:"LOCAL-DEMO-ONLY",verifiedOrganizationContact:true}));
   if(action==="deny")return send(res,200,await service.deny(id));
   if(action==="expire"){
    // Test-only time travel: mutate issued/expiry to simulate a deadline that passed.
    const r=service.store.records.get(id);if(!r)return send(res,404,{error:"Not found"});
    if(r.status!==STATUS.PENDING)return send(res,409,{error:"Only pending requests can expire"});
    r.expiresAt=Date.now()-1;
    return send(res,200,await service.status(id));
   }
  }
  return send(res,405,{error:"Method not allowed"});
 }catch(e){return send(res,400,{error:"Invalid demo request"})}
});
if(!Number.isInteger(port)||port<1024||port>65535)throw Error("Invalid port");
server.listen(port,host,()=>console.log(`PIRA LOCAL TEST ONLY: http://${host}:${port}\nPress Ctrl+C to stop. No real business verification is performed.`));
