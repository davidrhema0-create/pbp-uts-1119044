import { Box, Button, Container, Paper, Stack } from "@mui/material";
import { Title } from "../components/Title";
import { Link } from "react-router";

export default function HomePage() {
  return <Container>
    <Stack alignItems='center' height='100%'>
      <Box p={2} width='100%'>
        <Paper >
          <Stack p={2} gap={2} alignItems='center'>
            <Title>UTS</Title>
            <Link to='/listbuku'>
              <Button>Go To All List Buku</Button>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  </Container>
}