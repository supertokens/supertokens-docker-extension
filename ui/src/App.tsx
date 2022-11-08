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
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  const fetchAndDisplayResponse = async () => {
    const result = await ddClient.docker.cli.exec("images", [
      "--format",
      '"{{ json . }}"',
    ]);
    setResponse(result.stdout.split("\n")[2]);
  };

  return (
    <>
      <Typography variant="h1">SuperTokens Docker extension</Typography>
      <Typography variant="h3" color="text.secondary" sx={{ mt: 2 }}>
        Select the database to use along with SuperTokens
      </Typography>
      <br />
      <label>
        <input type="checkbox" />
        PostgreSQL
      </label>
      <br /><br />
      <label>
        <input type="checkbox" />
        MySQL
      </label>
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
