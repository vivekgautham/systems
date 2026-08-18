import ClearIcon from "@mui/icons-material/Clear";
import GitHubIcon from "@mui/icons-material/GitHub";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSystemsData } from "../api/systemsApi";
import { SystemCategory, SystemItem } from "../types/system";
import { formatStars, getCategoryColor } from "../utils/systemUtils";

const CATEGORIES: ("All" | SystemCategory)[] = [
  "All",
  "Databases",
  "Message Brokers",
  "Compute & Orchestration",
  "Networking",
  "Observability",
  "Storage",
  "Distributed Systems",
  "Frameworks & Runtimes",
  "Security",
];

export default function SystemListPage() {
  const { data: systems = [], isLoading } = useSystemsData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | SystemCategory
  >("All");

  const filteredSystems = useMemo(() => {
    let result: SystemItem[] = [...systems];

    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.tagline.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.languages.some((l) => l.toLowerCase().includes(query)) ||
          item.tags?.some((t) => t.toLowerCase().includes(query)),
      );
    }

    // Sort alphabetically by name
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [systems, searchTerm, selectedCategory]);

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 1600,
        py: { xs: 2.5, sm: 4 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      {/* Header Section */}
      <Box component="header" sx={{ mb: 4, textAlign: "center" }}>
        <Stack spacing={2} alignItems="center">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              fontSize: { xs: "2rem", sm: "2.75rem" },
            }}
          >
            <Box component="span" sx={{ fontSize: "1.1em", lineHeight: 1 }}>
              ⚙️
            </Box>
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Systems Catalog
            </Box>
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 640 }}
          >
            Curated catalog of open source systems, distributed databases,
            message brokers, and core infrastructure libraries.
          </Typography>

          {/* Search Bar */}
          <Box sx={{ width: "100%", maxWidth: 840, pt: 1 }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search systems, databases, frameworks, languages, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Clear search"
                        onClick={() => setSearchTerm("")}
                        edge="end"
                        size="small"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  sx: {
                    borderRadius: 3.5,
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    backdropFilter: "blur(12px)",
                    fontSize: "0.95rem",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.12)",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.light",
                    },
                  },
                }}
              />

              {/* Category Filter Chips */}
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                gap={1}
              >
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <Chip
                      key={cat}
                      label={cat}
                      clickable
                      onClick={() => setSelectedCategory(cat)}
                      color={isActive ? "primary" : "default"}
                      variant={isActive ? "filled" : "outlined"}
                      sx={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        py: 2,
                        px: 0.5,
                        borderRadius: 2.5,
                        borderColor: isActive
                          ? "primary.main"
                          : "rgba(255, 255, 255, 0.1)",
                        backgroundColor: isActive
                          ? "primary.main"
                          : "rgba(30, 41, 59, 0.5)",
                        "&:hover": {
                          backgroundColor: isActive
                            ? "primary.dark"
                            : "rgba(30, 41, 59, 0.8)",
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Main Content Grid */}
      <Box component="main" sx={{ width: "100%" }}>
        {isLoading && systems.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "rgba(30, 41, 59, 0.3)",
              borderStyle: "dashed",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <CircularProgress color="primary" />
              <Typography color="text.secondary">
                Loading systems catalog...
              </Typography>
            </Stack>
          </Paper>
        ) : filteredSystems.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "rgba(30, 41, 59, 0.3)",
              borderStyle: "dashed",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography sx={{ fontSize: "3rem" }}>🔍</Typography>
              <Typography variant="h5" component="h2">
                No matching systems found
              </Typography>
              <Typography color="text.secondary">
                Try adjusting your search query or category filter.
              </Typography>
              <Button
                variant="contained"
                startIcon={<ReplayIcon />}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {filteredSystems.map((system) => (
              <Card
                key={system.id}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s, border-color 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "primary.light",
                    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.35)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/system/${system.id}`)}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                    p: 2.5,
                  }}
                >
                  <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                    {/* Top Row: Icon + Category + Stars */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 1.5 }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ fontSize: "1.75rem", lineHeight: 1 }}>
                          {system.iconEmoji || "📦"}
                        </Typography>
                        <Chip
                          size="small"
                          label={system.category}
                          color={getCategoryColor(system.category)}
                          variant="outlined"
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            borderRadius: 1.5,
                          }}
                        />
                      </Stack>

                      {system.stars !== undefined && (
                        <Chip
                          icon={
                            <StarIcon
                              sx={{
                                fontSize: "0.9rem !important",
                                color: "#f59e0b !important",
                              }}
                            />
                          }
                          size="small"
                          label={formatStars(system.stars)}
                          sx={{
                            height: 22,
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            backgroundColor: "rgba(245, 158, 11, 0.12)",
                            color: "#fbbf24",
                            border: "1px solid rgba(245, 158, 11, 0.25)",
                          }}
                        />
                      )}
                    </Stack>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        lineHeight: 1.3,
                        mb: 0.5,
                      }}
                    >
                      {system.name}
                    </Typography>

                    {/* Tagline */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.82rem",
                        lineHeight: 1.4,
                        mb: 2,
                        minHeight: 44,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {system.tagline}
                    </Typography>

                    {/* Languages & License footer */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      gap={0.5}
                      sx={{
                        pt: 1,
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {system.languages.map((lang) => (
                          <Chip
                            key={lang}
                            size="small"
                            label={lang}
                            sx={{
                              height: 20,
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              backgroundColor: "rgba(148, 163, 184, 0.12)",
                              color: "#cbd5e1",
                            }}
                          />
                        ))}
                      </Stack>

                      {system.githubUrl && (
                        <GitHubIcon
                          sx={{
                            fontSize: "1rem",
                            color: "text.secondary",
                            opacity: 0.8,
                          }}
                        />
                      )}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
