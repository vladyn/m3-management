import { map, catchError, of, Subscription } from 'rxjs';
const obj = {
    "id": "6729e8888a0d3be8cbd24bba",
    "uniqueId": 145,
    "cabinetId": "65eb102fc95c1d66efa694bb",
    "divisionIds": [
        "66c5d5777c3f5345caf81107"
    ],
    "parentId": "66c5d5777c3f5345caf81107",
    "name": "E_ValentinaY_D_2024-11-05_H_080017_393_CLID_00898869786.wav.wav",
    "uniformName": "E_ValentinaY_D_2024-11-05_H_080017_393_CLID_00898869786.wav (ID 00145).wav",
    "contentTypeId": "66c590e0ba156f2d28e84865",
    "fileContent": {
        "id": "6729e88c8a0d3be8cbd24bbe",
        "alternativeId": null
    },
    "metadata": [
        {
            "type": "text",
            "value": "E_ValentinaY_D_2024-11-05_H_080017_393_CLID_00898869786.wav.wav",
            "internalName": "Title"
        },
        {
            "type": "text",
            "value": "E_ValentinaY_D_2024-11-05_H_080017_393_CLID_00898869786.wav.wav",
            "internalName": "Name"
        },
        {
            "type": "number",
            "value": 4100396,
            "internalName": "File size"
        },
        {
            "type": "text",
            "value": "wav",
            "internalName": "Extension"
        },
        {
            "type": "text",
            "value": "Classified, Ready",
            "internalName": "Status"
        },
        {
            "type": "text",
            "value": "Conversation analysis",
            "internalName": "Content type"
        },
        {
            "type": "text",
            "value": "E_ValentinaY_D_2024-11-05_H_080017_393_CLID_00898869786.wav.wav",
            "internalName": "File name with extension"
        },
        {
            "type": "text",
            "value": "E_ValentinaY_D_2024-11-05_H_080017_393_CLID_00898869786.wav",
            "internalName": "File name without extension"
        },
        {
            "type": "date_and_time",
            "value": 1730799752,
            "internalName": "Created"
        },
        {
            "type": "people",
            "identities": [
                {
                    "id": "66f5591fae4190fcdc3a7fb8",
                    "displayName": "TestConversationAnalysis",
                    "shortDetails": "APP://4524B4CC-DE47-4CDD-B58D-32FE74EDA28A",
                    "internalName": "APP://4524B4CC-DE47-4CDD-B58D-32FE74EDA28A",
                    "type": "User"
                }
            ],
            "internalName": "Created by"
        },
        {
            "type": "date_and_time",
            "value": 1730799762,
            "internalName": "Modified"
        },
        {
            "type": "people",
            "identities": [
                {
                    "id": "65eb0a15e908f42a79233703",
                    "displayName": "System Account",
                    "shortDetails": "SYSTEM",
                    "internalName": "SYSTEM",
                    "type": "User"
                }
            ],
            "internalName": "Modified by"
        },
        {
            "type": "external_visibility",
            "externalVisibility": 0,
            "internalName": "Visibility"
        },
        {
            "type": "text",
            "value": "TestQuantumDMS\\Summer campaign",
            "internalName": "Path"
        },
        {
            "type": "text",
            "value": "Audio",
            "internalName": "File type"
        },
        {
            "type": "text",
            "value": "65eb102fc95c1d66efa694bb",
            "internalName": "Cabinet ID"
        },
        {
            "type": "choice",
            "valueId": "ready",
            "value": "Ready",
            "internalName": "processing_status"
        },
        {
            "type": "text",
            "value": "{\"results\":[{\"key\":\"Company_Introduced\",\"score\":0},{\"key\":\"Recording_Warning\",\"score\":0},{\"key\":\"Agent_Introduced\",\"score\":0},{\"key\":\"Client_Identified\",\"score\":0}],\"passRate\":0}",
            "internalName": "autoscore_result"
        }
    ]
}
// create a new subscription
const subscription = new Subscription();
subscription.add(
    of(obj).pipe(
        map((data) => data.metadata),
        map(metadata => metadata.filter((item) => item.internalName === 'path')),
        catchError((error) => of(error))
    )
    );

