import { Typography } from '@mui/material';

export default function OtherEnv(props: {
    dbSelected: "postgresql" | "mysql",
    input: { [key: string]: string; }
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
            {Object.keys(props.input).map(key => {
                let value = props.input[key];
                return <KeyValueUI key={key} value={value} id={key} />
            })}
            <KeyValueUI key={""} value={""} id={"default"} />
            {/* <input
                value={props.input}
                onChange={(event) => {
                    props.onInputChange(event.target.value)
                }}
                style={{
                    marginTop: "10px",
                    width: "400px",
                    height: "30px",
                    paddingLeft: "10px",
                    paddingRight: "10px"
                }} placeholder={props.dbSelected === "mysql" ? "mysql://username:pass@host/dbName (Optional)" : "postgresql://username:pass@host/dbName (Optional)"} /> */}
        </div>
    )
}

function KeyValueUI(props: { key: string, value: string, id: string }) {
    // TODO:...
    return null;
}