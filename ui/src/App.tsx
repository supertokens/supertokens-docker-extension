import React from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [dbSelected, setDbSelected] = React.useState<"postgresql" | "mysql" | undefined>(undefined);
  const [connectionUri, setConnectionUri] = React.useState<string>("");
  const ddClient = useDockerDesktopClient();

  // const fetchAndDisplayResponse = async () => {
  //   const result = await ddClient.docker.cli.exec("images", [
  //     "--format",
  //     '"{{ json . }}"',
  //   ]);
  //   setResponse(result.stdout.split("\n")[2]);
  // };

  return (
    <>
      <Typography variant="h1">SuperTokens Docker extension</Typography>
      <Typography variant="h3" color="text.secondary" sx={{ mt: 2 }}>
        Select the database to use along with SuperTokens
      </Typography>
      <br />
      <label>
        <input type="checkbox" checked={dbSelected === "postgresql"} onClick={() => {
          setDbSelected("postgresql")
          setConnectionUri("")
        }} />
        PostgreSQL
      </label>
      <br /><br />
      <label>
        <input type="checkbox" checked={dbSelected === "mysql"} onClick={() => {
          setDbSelected("mysql")
          setConnectionUri("")
        }} />
        MySQL
      </label>
      <br /><br />
      {dbSelected && <DbConnectionURIInput
        dbSelected={dbSelected}
        input={connectionUri}
        onInputChange={setConnectionUri} />}
      {/* <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={fetchAndDisplayResponse}>
          Call backend
        </Button>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ''}
        />
      </Stack> */}
    </>
  );
}

function DbConnectionURIInput(props: { dbSelected: "postgresql" | "mysql", input: string, onInputChange: (input: string) => void }) {
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
