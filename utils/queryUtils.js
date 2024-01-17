import db from "../db/postgres.js"
// Podcast queries

// Requires some query parameters for filtering
export const getAllPodcastQuery = async (search, category, date, sort, page) => {

    let paramIndex = 1;
    const values = [];

    let query = `
    SELECT podcasts.*, COALESCE(COUNT(likes.id), 0) AS likes 
    FROM podcasts LEFT JOIN likes ON podcasts.id = likes.podcastid WHERE NOT EXISTS (
        SELECT 1 FROM account_settings WHERE account_settings.userid = podcasts.userid 
        AND account_settings.keepprivate = true
    )`;

    if (search) {
        query += ` AND title ILIKE $${paramIndex}`;
        paramIndex++;
        values.push('%' + search + '%');
    }

    if (category) {
        query += ` AND category = $${paramIndex}`;
        paramIndex++;
        values.push(category);
    }

    if (date) {

    }

    query += ' GROUP BY podcasts.id'; // Needs to be done before sorting

    // Sorting logic
    switch (sort) {
        case 'trending':
            query += ' ORDER BY likes'
            break;

        case 'mostpopular':
            query += ' ORDER BY views'
            break;

        case 'dateposted':
            query += ' ORDER BY dateposted'
            break;
    }

    // Default page if omitted
    if (!page) {
        page = 1;
    }

    const offset = (page - 1) * 15; // Pagination logic
    query += ` LIMIT 15 OFFSET ${offset}`;

    const { rows: response } = await db.query(query, values);

    return response;

}

export const getSinglePodcastQuery = async (podcastId, userId) => {

    let query;
    let values = [];

    if (userId !== undefined) {
        query = `
    SELECT podcasts.*, COUNT(likes.id) AS likes, 
    CASE WHEN EXISTS (SELECT * FROM likes WHERE userid = $1 AND podcastid = $2) THEN True ELSE False END AS isLiked
    FROM podcasts
    LEFT JOIN likes ON podcasts.id = likes.podcastid
    WHERE podcasts.id = $3 
    GROUP BY podcasts.id`
        values.push(userId, podcastId, podcastId);
    }

    if (!userId) {
        query = `
        SELECT podcasts.*, COUNT(likes.id) AS likes
        FROM podcasts
        LEFT JOIN likes ON podcasts.id = likes.podcastid
        WHERE podcasts.id = $1 
        GROUP BY podcasts.id`
        values.push(podcastId);
    }
    const { rows: response } = await db.query(query, values);

    if (response.length < 1) {
        return false;
    }

    return response[0];
}