import test from "node:test";import assert from "node:assert/strict";
import {interpretQuery,answerDemoQuery} from "../src/client/copilot/query-intelligence.js";
test("paraphrases for sales revenue",()=>{for(const q of ["What were sales today?","How much revenue today?","How much did we make today?"]){const r=interpretQuery(q);assert.equal(r.metric,"revenue");assert.equal(r.period,"today")}});
test("sales grouping and followup",()=>{const first=interpretQuery("Show sales by category this month");assert.equal(first.groupBy,"category");assert.equal(first.period,"this_month");const next=interpretQuery("How about last month?",first);assert.equal(next.metric,"revenue");assert.equal(next.period,"last_month");assert.equal(next.groupBy,"category")});
test("distinguishes profit and inventory worth",()=>{assert.equal(interpretQuery("What was our profit?").metric,"profit");assert.equal(interpretQuery("How much is our inventory worth?").metric,"inventory_value")});
test("ambiguous amount requires clarification",()=>assert.equal(interpretQuery("How much?").intent,"clarify"));
test("low stock inventory answer",()=>{const p=interpretQuery("What should we reorder?");const a=answerDemoQuery(p,[{name:"Paper",qty:2,min:5}]);assert.match(a.text,/Paper: 2 remaining/)});
test("no invented sales totals",()=>{const a=answerDemoQuery(interpretQuery("What were sales today?"));assert.equal(a.kind,"unavailable")});
