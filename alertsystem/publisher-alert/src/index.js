import {appEvents} from '@forge/events';

export async function listenIssueCreated(event, context) {
    const issue = event.issue;
    console.log('event: ' + JSON.stringify(event, null, 2));

    if (issue.fields.status?.name === 'To Do' && !issue.fields.assignee) {
        // 이벤트 발행
        const response = await appEvents.publish({'key': 'alert-highest-issue-unassigned'});
        if (response.type === 'success') {
            console.log('Alert published');
            console.log(response);
        } else {
            console.log('Alert not published');
            console.log(`${response.errorType} - ${response.errorMessage}`);
        }
    }
}
