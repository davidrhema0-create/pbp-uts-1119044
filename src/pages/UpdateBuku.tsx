import {Button,Container,Paper,Stack,TextField,Typography,RadioGroup,FormControlLabel,Radio} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Buku } from "../types";
import { Title } from "../components/Title";

export default function UpdateBuku() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buku, setBuku] = useState<Buku | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadBuku() {
      const response = await fetch(`/api/buku/${id}`);
      const data: Buku = await response.json();
      setBuku(data);
    }
    loadBuku();
  }, [id]);

  function handleChange(field: keyof Buku, value: string | number) {
    if (!buku) return;
    setBuku({
      ...buku,
      [field]: value
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!buku) return;

    setIsLoading(true);

    await fetch(`/api/buku/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(buku)
    });

    setIsLoading(false);
    navigate("/listbuku");
  }

  if (!buku) return null;

  return (
    <Container maxWidth="md">
      <Stack spacing={3} py={3}>
        <Title>Edit Buku</Title>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>

              <TextField
                label="Judul"
                value={buku.judul}
                onChange={(e) => handleChange("judul", e.target.value)}
                fullWidth
              />

              <TextField
                label="Deskripsi"
                value={buku.deskripsi}
                onChange={(e) => handleChange("deskripsi", e.target.value)}
                fullWidth
                multiline
                rows={3}
              />

              <TextField
                label="Tahun"
                type="number"
                value={buku.tahun}
                onChange={(e) => handleChange("tahun", Number(e.target.value))}
                fullWidth
              />

              <Stack>
                <Typography>Kategori</Typography>

                <RadioGroup
                  row
                  value={buku.kategori}
                  onChange={(e) => handleChange("kategori", e.target.value)}
                >
                  <FormControlLabel
                    value="komik"
                    control={<Radio />}
                    label="Komik"
                  />
                  <FormControlLabel
                    value="majalah"
                    control={<Radio />}
                    label="Majalah"
                  />
                  <FormControlLabel
                    value="novel"
                    control={<Radio />}
                    label="Novel"
                  />
                </RadioGroup>
              </Stack>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                SAVE
              </Button>

            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}