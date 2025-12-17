export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return Response.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const airtableResponse = await fetch(
            `https://api.airtable.com/v0/appITRc0fXCObK11r/tbloOC0FREUZzDJ2C`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.AIRTABLE_API}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    records: [
                        {
                            fields: {
                                fldgNG4UY79DZGz5a: email,
                                fldD3Z5xBWgWf7eeJ: new Date().toISOString().split('T')[0],
                                fldIrilOKjUUa4faZ: 'MujerTech Workshop',
                            },
                        },
                    ],
                }),
            }
        );

        if (!airtableResponse.ok) {
            const errorData = await airtableResponse.json();
            console.error('Airtable error:', errorData);
            return Response.json(
                { error: 'Failed to save to Airtable' },
                { status: 500 }
            );
        }

        const data = await airtableResponse.json();
        return Response.json({ success: true, record: data.records[0] });

    } catch (error) {
        console.error('API error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}