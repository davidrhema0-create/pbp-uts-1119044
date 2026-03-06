import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import type { Buku } from "../types";
import { Delete, Edit, EditAttributes, EditDocument, Visibility } from '@mui/icons-material';
import { Link, useNavigate } from "react-router";
import Chip from "@mui/material/Chip";

type BukuListPageCardProps = {
  buku: Buku;
}

export function BukuListPageCard(props: BukuListPageCardProps) {
  const { buku } = props;
  const navigate = useNavigate();
  return <Card >
    <CardHeader
    avatar={
    <img
      src={buku.imageUrl}
      alt={buku.judul}
      className="w-12 h-12 rounded-md object-cover"
    />
    }
      title={buku.judul}
    />
    <CardContent sx={{ height: 80, overflow: 'auto' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {buku.deskripsi}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <Link to={
        buku.status === "available"
        ? `/listbuku/${buku.id}/pinjam`
        : `/listbuku/${buku.id}/balik`
        }>
        <IconButton aria-label="visit">
          <Visibility />
        </IconButton>
      </Link>
      <Link to={`/listbuku/${buku.id}/update`}>
        <IconButton aria-label="Edit">
          <EditDocument />
        </IconButton>
      </Link>
      <Chip
        label={buku.status === "available" ? "Available" : "Borrowed"}
        color={buku.status === "available" ? "success" : "warning"}
        size="small"
      />
    </CardActions>
  </Card>
}