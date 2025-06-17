// TODO: Add the necessary imports
import api, {route} from "@forge/api";

export async function run(event, context) {

    console.log(event);

    // TODO: Call the add comment rest api
    let bodyData = `{
		"body": "Hello Caterina"
	}`;

    const response = await api.asApp().requestJira(route`/rest/api/2/issue/${event.issue.key}/comment`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyData
    });

    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());
}