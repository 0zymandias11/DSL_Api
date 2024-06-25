// import http from 'k6/http';
// import { check, sleep } from 'k6';
// import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

// export let options = {
//     scenarios: {
//         contacts: {
//           executor: 'ramping-vus',
//           startVUs: 0,
//           stages: [
//             { duration: '30s', target: 10 },
//             { duration: '1m', target: 30 },
//             {duration: '10s', target: 0}
//           ],
//         },
//       },
//   };

// const BASE_URL = 'http://localhost:3000';

// export default function () {
//   let uniqueEmail = `${uuidv4()}@example.com`;

//   // User registration
//   let registerRes = http.post(`${BASE_URL}/api/dsl_proj/register`, JSON.stringify({
//     name: 'Test User',
//     email: uniqueEmail,
//     password: 'password123'
//   }), {
//     headers: { 'Content-Type': 'application/json' }
//   });
//   check(registerRes, { 'register status was 200': (r) => r.status === 200 });

//   if (!registerRes.body) {
//     console.error(`Registration failed. Status: ${registerRes.status}, Body: ${registerRes.body}`);
//     return;
//   }
// //   console.log(`Registration response: ${registerRes.body}`);

//   // User login
//   let loginRes = http.post(`${BASE_URL}/api/dsl_proj/login`, JSON.stringify({
//     email: uniqueEmail,
//     password: 'password123'
//   }), {
//     headers: { 'Content-Type': 'application/json' }
//   });
//   check(loginRes, { 'login status was 200': (r) => r.status === 200 });

//   if (!loginRes.body) {
//     console.error(`Login failed. Status: ${loginRes.status}, Body: ${loginRes.body}`);
//     return;
//   }
// //   console.log(`Login response: ${loginRes.body}`);
//   let authToken = loginRes.json('token');

//   // Rule creation
//   let ruleRes = http.post(`${BASE_URL}/api/rules`, JSON.stringify({
//     rule: "IF temperature > 30 THEN category = 'hot'"
//   }), {
//     headers: { 'Content-Type': 'application/json', 'x-auth-token': authToken }
//   });
//   check(ruleRes, { 'create rule status was 200': (r) => r.status === 200 });

//   if (!ruleRes.body) {
//     console.error(`Rule creation failed. Status: ${ruleRes.status}, Body: ${ruleRes.body}`);
//     return;
//   }
// //   console.log(`Rule creation response: ${ruleRes.body}`);

//   sleep(1);
// }
