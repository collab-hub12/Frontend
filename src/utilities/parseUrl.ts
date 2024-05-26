
interface URLParams {
    org_id?: number;
    team_name?: string;
}

export function parseUrlPath(urlPath: string) {
    // Split the URL path into segments
    const urlSegments = urlPath.split('/');
    return {
        org_id: urlSegments[2] || undefined,
        team_name: urlSegments[4] || undefined,
        task_id: urlSegments[6]?.replace("item-", "") || undefined
    }
}    