import React from 'react';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { TextField, Typography } from '@mui/material';
import DbConnectionURIInput from "./DbConnectionURIInput";
import OtherEnv from "./OtherEnv";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [dbSelected, setDbSelected] = React.useState<"postgresql" | "mysql" | undefined>(undefined);
  const [connectionUri, setConnectionUri] = React.useState<string>("");
  const [envVars, setEnvVars] = React.useState<{ key: string, value: string }[]>([{ key: "", value: "" }]);
  const [stdResponse, setStdResponse] = React.useState<string>("");
  const [errorResponse, setErrorResponse] = React.useState<string>("");

  const ddClient = useDockerDesktopClient();

  const startContainer = async () => {
    setStdResponse("");
    setErrorResponse("");
    let currStdOutput = "";
    let currErrorOutput = "";
    let args = ["-p", "3567:3567", "-d"];

    envVars.forEach(obj => {
      if (obj.key === "" || obj.value === "") {
        return;
      }
      args.push("-e");
      args.push(obj.key + "=" + obj.value)
    });

    if (dbSelected === "mysql") {
      if (connectionUri !== "") {
        args.push("-e");
        args.push("MYSQL_CONNECTION_URI=" + connectionUri)
      }
      args.push("registry.supertokens.io/supertokens/supertokens-mysql")
    } else {
      if (connectionUri !== "") {
        args.push("-e");
        args.push("POSTGRESQL_CONNECTION_URI=" + connectionUri)
      }
      args.push("registry.supertokens.io/supertokens/supertokens-postgresql")
    }

    await ddClient.docker.cli.exec("run", args, {
      stream: {
        onOutput(data) {
          if (data.stdout) {
            currStdOutput += data.stdout + "\n"
            setStdResponse(currStdOutput);
          } else {
            currErrorOutput += data.stderr + "\n"
            setErrorResponse(currErrorOutput);
          }
        },
        onError(error) {
          currErrorOutput += error + "\n"
          setErrorResponse(currErrorOutput);
        },
        onClose(exitCode) {
          if (exitCode === 0) {
            return;
          }
          currErrorOutput += "Exited with status code: " + exitCode + "\n"
          setErrorResponse(currErrorOutput);
        },
        splitOutputLines: true,
      },
    });
  }

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
          setStdResponse("");
          setErrorResponse("");
        }} />
        PostgreSQL
      </label>
      <br /><br />
      <label>
        <input type="checkbox" checked={dbSelected === "mysql"} onClick={() => {
          setDbSelected("mysql")
          setConnectionUri("")
          setStdResponse("");
          setErrorResponse("");
        }} />
        MySQL
      </label>
      <br /><br />
      {dbSelected && <DbConnectionURIInput
        dbSelected={dbSelected}
        input={connectionUri}
        onInputChange={setConnectionUri} />}
      <br /><br />
      {dbSelected && <OtherEnv
        dbSelected={dbSelected}
        input={envVars}
        onInputChange={(index: number, key: string, value: string) => {
          let newEnvVars = [...envVars]
          newEnvVars[index] = {
            key, value
          }
          setEnvVars(newEnvVars)
        }}
        addNewField={() => {
          let newEnvVars = [...envVars, {
            key: "", value: ""
          }];
          setEnvVars(newEnvVars)
        }} />}
      <br /><br />
      {dbSelected && <ShowDockerRunCommand
        dbSelected={dbSelected}
        connectionUri={connectionUri}
        envVars={envVars} />}
      <br />
      {dbSelected && <button
        onClick={startContainer}
        style={{
          height: "40px",
          width: "250px",
          borderRadius: "9px",
          fontSize: "17px",
          cursor: "pointer"
        }}>
        Start docker container
      </button>}
      <br /><br />
      {dbSelected && <div>
        <TextField
          style={{
            marginRight: "10px"
          }}
          sx={{ width: 350 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={stdResponse}
        />
        <TextField
          sx={{ width: 350 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={errorResponse}
        />
      </div>}
      <br /><br /><br />
    </>
  );
}

function ShowDockerRunCommand(props: {
  dbSelected: "postgresql" | "mysql",
  connectionUri: string,
  envVars: { key: string, value: string }[]
}) {
  let result = "docker run -p 3567:3567 \\";

  props.envVars.forEach(obj => {
    if (obj.key === "" || obj.value === "") {
      return;
    }
    result += "\n-e " + obj.key + "=" + obj.value + " \\"
  })

  if (props.dbSelected === "mysql") {
    if (props.connectionUri !== "") {
      result += "\n-e MYSQL_CONNECTION_URI=\"" + props.connectionUri + "\" \\"
    }
    result += "\n-d registry.supertokens.io/supertokens/supertokens-mysql"
  } else {
    if (props.connectionUri !== "") {
      result += "\n-e POSTGRESQL_CONNECTION_URI=\"" + props.connectionUri + "\" \\"
    }
    result += "\n-d registry.supertokens.io/supertokens/supertokens-postgresql"
  }
  return (
    <div>
      <Typography variant="h2" color="text.secondary" sx={{ mt: 2 }}>
        Docker run command
      </Typography>
      <TextField
        sx={{ width: 800 }}
        disabled
        multiline
        variant="outlined"
        minRows={3}
        value={result}
      />
    </div>
  )
}