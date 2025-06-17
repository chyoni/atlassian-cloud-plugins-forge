import api, {route} from "@forge/api"

interface Issue {
    key: string;
}

interface JiraApiIssue {
    fields: {
        assignee?: {
            accountId: string;
            displayName: string;
        } | null;
    };
}

export const run = async ({issue}: { issue: Issue }) => {
    const {key: issueKey} = issue;
    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}`);
    const issueJson: JiraApiIssue = await response.json();

    return {
        result: !!issueJson.fields.assignee,
        errorMessage: "The issue must have an assignee before transitioning !!!!"
    }
}
