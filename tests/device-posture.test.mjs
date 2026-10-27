import test from "node:test";
import assert from "node:assert/strict";
import {evaluateDevicePosture,readBrowserCapabilities,POSTURE} from "../src/client/security/device-posture.js";

test("unknown OS patch level is never treated as verified",()=>{
  const result=evaluateDevicePosture({isSecureContext:true,hasCrypto:true,cookieEnabled:true,online:true});
  assert.equal(result.status,POSTURE.UNKNOWN);
  assert.ok(result.notices.some(n=>n.code==="patch-unknown"));
});
test("insecure context triggers critical advisory",()=>{
  const result=evaluateDevicePosture({isSecureContext:false});
  assert.equal(result.status,POSTURE.REVIEW);
  assert.equal(result.notices[0].severity,"critical");
});
test("offline does not imply compromised device",()=>{
  const result=evaluateDevicePosture({isSecureContext:true,online:false});
  assert.equal(result.status,POSTURE.UNKNOWN);
  assert.ok(result.notices.some(n=>n.code==="offline"));
});
test("capability detection does not need a browser or hardware identifier",()=>{
  const caps=readBrowserCapabilities({isSecureContext:true,navigator:{onLine:true,cookieEnabled:true},crypto:{subtle:{}}});
  assert.deepEqual(caps,{isSecureContext:true,cookieEnabled:true,online:true,hasCrypto:true});
});
