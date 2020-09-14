SELECT name, email, id, cohort_id
FROM students
WHERE phone IS NULL and email NOT LIKE '%gmail.com'
ORDER BY name;