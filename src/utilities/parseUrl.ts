
export function parseUrlPath(urlPath: string) {
    // Split the URL path into segments
    const urlSegments = urlPath.split('/');
    return {
        org_id: +urlSegments[2] || undefined,
        team_id: +urlSegments[4] || undefined,
        task_id: +urlSegments[6]?.replace("item-", "") || undefined
    }
}    