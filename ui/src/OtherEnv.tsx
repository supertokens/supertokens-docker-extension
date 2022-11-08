import { Typography } from '@mui/material';

export default function OtherEnv(props: {
    dbSelected: "postgresql" | "mysql",
    input: { key: string, value: string }[],
    onInputChange: (index: number, key: string, value: string) => void,
    addNewField: () => void
}) {
    return (
        <div>
            <Typography variant="h3" color="text.secondary" sx={{ mt: 2 }}>
                Other env vars
            </Typography>
            <Typography style={{
                width: "800px"
            }} color="text.secondary" sx={{ mt: 2 }}>
                Please add other additional env variables to provide to SuperTokens. You can see a full list of them on {props.dbSelected === "mysql" ? "https://github.com/supertokens/supertokens-docker-mysql#configuration" : "https://github.com/supertokens/supertokens-docker-postgresql#configuration"}
            </Typography>
            {props.input.map((obj, i) => {
                if (obj.key === "" && obj.value === "" && i !== props.input.length - 1) {
                    return null;
                }
                return <KeyValueUI onInputChange={(key: string, value: string) => {
                    props.onInputChange(i, key, value);
                }} fieldKey={obj.key} value={obj.value} key={i} />
            })}
            <br />
            <button onClick={props.addNewField}>Add new env var</button>
        </div>
    )
}

function KeyValueUI(props: { fieldKey: string, value: string, onInputChange: (key: string, value: string) => void, }) {
    return (
        <div style={{
            marginTop: "20px"
        }}>
            <input
                onChange={(event) => {
                    props.onInputChange(event.target.value, props.value)
                }}
                value={props.fieldKey} placeholder="API_KEYS (Optional)" style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginRight: "10px",
                    height: "30px",
                }} />
            <input
                onChange={(event) => {
                    props.onInputChange(props.fieldKey, event.target.value)
                }}
                value={props.value} placeholder='AK7Ugig58908cbi3s....' style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginLeft: "10px",
                    height: "30px",
                }} />
        </div>
    )
}