SELECT assignments.id AS id, assignments.day AS day, assignments.chapter AS chapter, assignments.name AS name, count(assistance_requests.*) as total_assistances
FROM assignments
JOIN assistance_requests ON assistance_requests.assignment_id = assignments.id
GROUP BY assignments.id
ORDER BY total_assistances DESC;
