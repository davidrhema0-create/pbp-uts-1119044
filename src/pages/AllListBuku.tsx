import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import type { Buku } from "../types"; // Pastikan import Menu sudah benar
import { Title } from "../components/Title";
import { BukuListPageCard } from "./BukuListPageCard";
import { PostListPageSekeletonCard } from "./MenuListCard";
import { wait } from "../utils/wait";

export default function AllListBuku() {
  // Inisialisasi dengan array kosong untuk keamanan
  const [posts, setPosts] = useState<Buku[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function reloadPosts() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/buku');
        await wait(2000); // Penyesuaian waktu tunggu
        
        if (!response.ok) {
          return;
        }

        const data = await response.json() as Buku[];
        
        setPosts(data);
        
      } catch (error) {
        console.error("Gagal mengambil buku:", error);
      } finally {
        setIsLoading(false);
      }
    }
    reloadPosts();
  }, []);

  return (
    <Container>
      <Box py={2}>
        <Paper>
          <Stack p={2} gap={2}>
            <Box justifyContent='center' display='flex'>
              <Title>Menu</Title>
            </Box>

            {/* Skeleton Loading */}
            {isLoading && (
              <Grid container spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Grid key={i} item xs={12} md={4}>
                    <PostListPageSekeletonCard />
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Render List Menu */}
            {!isLoading && (
              <Grid container spacing={2}>
                {/* Gunakan optional chaining (?.) untuk menghindari crash jika posts undefined */}
                {posts?.map((record) => (
                  <Grid key={record.id} item xs={12} md={4}>
                    <BukuListPageCard buku={record} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}