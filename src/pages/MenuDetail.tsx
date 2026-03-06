import { Card, CardActions, CardContent, CardHeader, Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Buku, PostResponse } from "../types";
import { useParams } from "react-router";
import { formatDate } from "../utils/formatDate";

export default function PostDetailPage() {
  const [buku, setBuku] = useState<Buku>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  // const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function reloadPosts() {
      // setHasError(false);
      setIsLoading(true);
      try {
        const response = await fetch(`/api/buku/${id}`);
        if (!response.ok) {
          // setHasError(true);
          return;
        }
        const data = await response.json() as PostResponse;
        setBuku (data);
        // setPostInfo(data.info);
      } catch {
        // setHasError(true);
      }
      setIsLoading(false);
    }
    reloadPosts();
  }, [id])


  return <Container>
    <Stack py={2}>
      <Paper>
        <Stack alignItems='center' p={2}>
          {buku && <Card>
             <CardHeader
              avatar={
              <img
              src={buku.imageUrl}
              alt={buku.judul}
              className="w-12 h-12 rounded-md object-cover"
              />
              }
              title={buku.judul}
              subheader={`${buku.deskripsi} ${formatDate(buku.createdAt)}`}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {buku.deskripsi}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>}
        </Stack>
      </Paper>
    </Stack>
  </Container>
}