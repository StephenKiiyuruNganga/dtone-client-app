import { Paper, Stack, Typography } from "@mui/material"

const PageWrapper = ({ title, children }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        width: { xs: "100vw", md: "30vw" },
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h6">{title}</Typography>
        {children}
      </Stack>
    </Paper>
  )
}

export default PageWrapper
