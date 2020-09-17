const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1
Order by teachers.name;
`;

const cohortName = process.argv[2] || 'JUL02';
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`];


pool.query(queryString, values)
.then(res => {
  res.rows.forEach(assistance_requests => {
    console.log(`${assistance_requests.cohort}: ${assistance_requests.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));