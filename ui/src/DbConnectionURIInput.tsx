import { Typography } from '@mui/material';

export default function DbConnectionURIInput(props: { dbSelected: "postgresql" | "mysql", input: string, onInputChange: (input: string) => void }) {
    return (
        <div>
            <Typography variant="h3" color="text.secondary" sx={{ mt: 2 }}>
                Please enter your {props.dbSelected === "postgresql" ? "PostgreSQL" : "MySQL"} database connection URI
            </Typography>
            <Typography style={{
                width: "800px"
            }} color="text.secondary" sx={{ mt: 2 }}>
                SuperTokens will use this connection URI to connect to the database. Please make sure that you have already created a database for SuperTokens to write to.
            </Typography>
            <Typography style={{
                width: "800px"
            }} color="text.secondary" sx={{ mt: 2 }}>
                If you don't provide one, then SuperTokens will run with an in memory database.
            </Typography>
            <input
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
                }} placeholder={props.dbSelected === "mysql" ? "mysql://username:pass@host/dbName (Optional)" : "postgresql://username:pass@host/dbName (Optional)"} />
        </div>
    )
}