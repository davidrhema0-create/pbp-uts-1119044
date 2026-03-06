import {Box,Button,Chip,Container,Paper,Stack,TextField,Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Buku } from "../types";

export default function PinjamBuku() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buku, setBuku] = useState<Buku | null>(null);
  const [peminjam, setPeminjam] = useState("");
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

  async function handlePinjam() {
    if (!peminjam) return;

    try {
      const res = await fetch(`/api/buku/${id}/pinjam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          peminjam: {
            nama: peminjam
          }
        })
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
      <Typography variant="h4" sx={{ mb: 3 }}>
        Detail Buku
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
              borderRadius: 2
            }}
          />

          <Stack spacing={2} sx={{ flex: 1 }}>
            <Typography variant="h5">{buku.judul}</Typography>

            <Chip label={buku.kategori} sx={{ width: "fit-content" }} />

            <Typography color="text.secondary">
              {buku.deskripsi}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <TextField
                label="Peminjam"
                value={peminjam}
                onChange={(e) => setPeminjam(e.target.value)}
                sx={{ width: 300 }}
              />

              <Button
                variant="contained"
                disabled={!peminjam || buku.status === "borrowed"}
                onClick={handlePinjam}
              >
                PINJAMKAN!
              </Button>
            </Stack>

          </Stack>

        </Stack>
      </Paper>
    </Container>
  );
}