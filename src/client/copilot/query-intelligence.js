/** PIRA deterministic query interpreter. No network access, no SQL and no claim of full NLP. */
const words = s => String(s ?? "").toLowerCase().replace(/[’]/g,"'").trim();
const includesAny=(s,a)=>a.some(x=>s.includes(x));
const patterns=[
  ["profit",/\b(profit|margin|earnings)\b/],
  ["inventory_value",/\b(inventory value|stock value|inventory worth|stock worth|worth of (our |my )?(stock|inventory))\b/],
  ["revenue",/\b(revenue|sales|sold|made|turnover|income)\b/],
  ["quantity",/\b(how many|quantity|quantities|count|units|on.hand|in stock|remaining|available|stock levels?|total items?)\b/],
  ["reorder",/\b(reorder|restock|running low|low.stock|purchase next|need to buy)\b/],
  ["location",/\b(where|location|located|stored|find)\b/],
  ["movement",/\b(last receiv|last deliver|last shipment|movement|received|adjustment)\b/]
];
export function interpretQuery(input, context={}) {
  const s=words(input);
  if(!s) return {intent:"clarify",question:"What would you like to know?"};
  const matched=patterns.filter(([,rx])=>rx.test(s)).map(([key])=>key);
  let metric=matched[0]||null;
  if(matched.includes("reorder") && !includesAny(s,["sales","revenue","profit"]))metric="reorder";
  const period=/\blast month\b/.test(s)?"last_month":/\blast week\b/.test(s)?"last_week":/\b(yesterday)\b/.test(s)?"yesterday":/\b(this month|month to date)\b/.test(s)?"this_month":/\b(this week)\b/.test(s)?"this_week":/\b(today)\b/.test(s)?"today":null;
  const groupBy=/\b(by category|per category|each category)\b/.test(s)?"category":/\b(by (day|date)|daily)\b/.test(s)?"day":/\b(by (item|product|sku)|per (item|product))\b/.test(s)?"item":null;
  const comparison=/\b(compare|versus|vs\.?|difference|change from|compared to)\b/.test(s);
  const ranking=/\b(top|most|highest|best.sell|fastest)\b/.test(s)?"highest":/\b(bottom|least|lowest|slowest)\b/.test(s)?"lowest":null;
  const followup=/^(and |what about |how about |for |by |compared to |versus |vs\b)/.test(s);
  if(!metric && followup && context.metric)metric=context.metric;
  if(!metric && /\b(how much|total|amount|sum)\b/.test(s))return {intent:"clarify",question:"Do you mean sales revenue, inventory value, quantity, or profit?"};
  if(!metric)return {intent:"clarify",question:"Are you asking about inventory, sales, reordering, or another business metric?"};
  return {intent:"query",metric,period:period||(followup?context.period:null),groupBy:groupBy||(followup?context.groupBy:null),comparison,ranking,query:s};
}
export function answerDemoQuery(plan, items=[], context={}) {
  if(plan.intent==="clarify")return {text:plan.question,kind:"clarification"};
  if(plan.metric==="reorder") {const low=items.filter(i=>i.qty<i.min);return {text:low.length?low.map(i=>i.name+": "+i.qty+" remaining (minimum "+i.min+")").join("; "):"No items are below their minimum.",kind:"inventory",source:"sample inventory"};}
  if(plan.metric==="quantity"){const total=items.reduce((n,i)=>n+i.qty,0);return {text:items.length+" item types; "+total+" units on hand in sample inventory.",kind:"inventory",source:"sample inventory"};}
  if(plan.metric==="location")return {text:items.map(i=>i.name+": "+i.location).join("; ")||"No inventory records available.",kind:"inventory",source:"sample inventory"};
  if(plan.metric==="revenue")return {text:"Sales analytics require dated, authorized transaction records. The staging preview has only illustrative sales figures; no verified "+(plan.period||"requested")+" revenue total is available.",kind:"unavailable",source:"sample preview only"};
  if(plan.metric==="profit")return {text:"Profit cannot be calculated without relevant cost and sales records. Revenue alone is not profit.",kind:"unavailable"};
  if(plan.metric==="inventory_value")return {text:"Inventory value requires per-item cost records, which are not present in this preview.",kind:"unavailable"};
  return {text:"That question requires transaction or movement history not connected in this preview.",kind:"unavailable"};
}
