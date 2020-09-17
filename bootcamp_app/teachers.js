const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort_name = process.argv[2];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
Order by teachers.name;
`)
.then(res => {
  res.rows.forEach(assistance_requests => {
    console.log(`${assistance_requests.cohort}: ${assistance_requests.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));