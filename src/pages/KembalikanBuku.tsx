import {Box,Button,Chip,Container,Paper,Stack,Typography,} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Buku } from "../types";

export default function KembalikanBuku() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buku, setBuku] = useState<Buku | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBuku() {
      try {
        const res = await fetch(`/api/buku/${id}`);
        const data = await res.json();
        setBuku(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBuku();
  }, [id]);

  async function handleReturn() {
    try {
      const res = await fetch(`/api/buku/${id}/balik`, {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/listbuku");
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading || !buku) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4" mb={3}>
        Kembalikan Buku
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={3}>
          
          <Box
            component="img"
            src={buku.imageUrl}
            alt={buku.judul}
            sx={{
              width: 200,
              height: 280,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />

          <Stack spacing={2}>
            <Typography variant="h5">{buku.judul}</Typography>

            <Chip label={buku.kategori} />

            <Typography>{buku.deskripsi}</Typography>

            {buku.peminjam && (
              <Typography>
                Dipinjam oleh: <b>{buku.peminjam.nama}</b>
              </Typography>
            )}

            <Button
              variant="contained"
              color="success"
              onClick={handleReturn}
              disabled={buku.status === "available"}
            >
              KembALIKAN BUKU
            </Button>
          </Stack>

        </Stack>
      </Paper>
    </Container>
  );
}