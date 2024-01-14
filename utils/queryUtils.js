import db from "../db/postgres.js"
// Podcast queries

// Requires some query parameters for filtering
export const getAllPodcastQuery = async (search, category, date, sort, page) => {

    let query = `
    SELECT podcasts.*, COALESCE(COUNT(likes.id), 0) AS likes 
    FROM podcasts LEFT JOIN likes ON podcasts.id = likes.podcastid WHERE NOT EXISTS (
        SELECT 1 FROM account_settings WHERE account_settings.userid = podcasts.userid 
        AND account_settings.keepprivate = true
    )`;

    if (search) {
        query += ` AND title = $${paramIndex}`;
        paramIndex++;
    }

    if (category) {
        query += ` AND category = $${paramIndex}`;
        paramIndex++;
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

    const { rows: response } = await db.query(query);

    return response;

}