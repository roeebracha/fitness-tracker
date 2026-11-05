const {Client} = require("@modelcontextprotocol/sdk/client/index.js");
const {StreamableHTTPClientTransport} = require("@modelcontextprotocol/sdk/client/streamableHttp.js");

async function callGarminTool(name, args ={}) {
    const transport = new  StreamableHTTPClientTransport(new URL(Process.env.GARMIN_MCP_URL),{
        requestInit:{
            headers:{ Authorization:`Bearer ${MY_TOKEN}`}
        }
    });
    

    const client = new Client({name: "fitness-tracker", version: "1.0.0"})
    try {
        await client.connect(transport);
        const result = await client.callTool({name, arguments: args})
        const text = result.content?.find((c) => c.type === "text")?.text ?? "";

        if(result.isError) throw new Error(text || `Tool ${name} failed`);

        try{
        return JSON.parse(text);
    } catch {
        throw new Error(text);
    } 
    }finally {
        await client.close();
    }
}
module.exports = { callGarminTool};