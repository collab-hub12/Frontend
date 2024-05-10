interface URLParams {
    org_id: number;
    team_id?: number;
    role_id?: number;
}

export function parseUrlPath(urlPath: string): URLParams | null {
    const regex = /\/orgs\/(\d+)(?:\/team\/(\d+))?(?:\/roles\/(\d+))?/;
    const matches = urlPath.match(regex);
    if (matches) {
        let result: URLParams = {org_id: parseInt(matches[1])};
        if (matches[2]) {
            result.team_id = parseInt(matches[2]);
        }
        if (matches[3]) {
            result.role_id = parseInt(matches[3]);
        }
        return result;
    } else {
        return null;
    }
}    