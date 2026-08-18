import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useSystemsData } from "../api/systemsApi";
import { formatStars, getCategoryColor } from "../utils/systemUtils";

export default function SystemDetailPage() {
  const { systemId = "" } = useParams<{ systemId: string }>();
  const navigate = useNavigate();
  const { data: systems = [], isLoading } = useSystemsData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [systemId]);

  const system = useMemo(() => {
    const target = systemId.trim().toLowerCase();
    if (!target) return null;
    return systems.find((s) => s.id.toLowerCase() === target) || null;
  }, [systems, systemId]);

  const relatedSystems = useMemo(() => {
    if (!system) return [];
    return systems
      .filter((s) => s.id !== system.id && s.category === system.category)
      .slice(0, 4);
  }, [systems, system]);

  if (isLoading && systems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 8,
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "rgba(30, 41, 59, 0.3)",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress color="primary" />
            <Typography color="text.secondary">
              Loading system details...
            </Typography>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!system) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<ArrowBackIcon />}
              variant="outlined"
            >
              Back to Catalog
            </Button>
          </Box>

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
              <Typography sx={{ fontSize: "3.5rem" }}>📦</Typography>
              <Typography variant="h4" component="h2">
                System Not Found
              </Typography>
              <Typography color="text.secondary">
                We couldn&apos;t find a system or library matching &ldquo;
                {systemId}&rdquo;.
              </Typography>
              <Button variant="contained" onClick={() => navigate("/")}>
                Browse All Systems
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2.5, sm: 4 } }}>
      <Stack spacing={3}>
        {/* Navigation Bar */}
        <Box>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{
              px: 2.5,
              py: 1,
              backgroundColor: "rgba(30, 41, 59, 0.7)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(99, 102, 241, 0.15)",
              },
            }}
          >
            Back to Catalog
          </Button>
        </Box>

        {/* Hero Card */}
        <Card
          variant="outlined"
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
            p: { xs: 2.5, sm: 4 },
          }}
        >
          <Stack spacing={2.5}>
            {/* Header row */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              gap={2}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography sx={{ fontSize: "3rem", lineHeight: 1 }}>
                  {system.iconEmoji || "⚙️"}
                </Typography>
                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 800 }}
                  >
                    {system.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {system.tagline}
                  </Typography>
                </Box>
              </Stack>

              {system.stars !== undefined && (
                <Chip
                  icon={
                    <StarIcon
                      sx={{
                        fontSize: "1rem !important",
                        color: "#f59e0b !important",
                      }}
                    />
                  }
                  label={`${formatStars(system.stars)} GitHub Stars`}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    py: 2,
                    px: 1,
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    color: "#fbbf24",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    borderRadius: 2,
                  }}
                />
              )}
            </Stack>

            {/* Badges / metadata */}
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip
                label={system.category}
                color={getCategoryColor(system.category)}
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
              <Chip
                label={`License: ${system.license}`}
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              {system.languages.map((lang) => (
                <Chip
                  key={lang}
                  label={lang}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(148, 163, 184, 0.15)",
                    color: "#e2e8f0",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Action Buttons */}
            <Stack direction="row" flexWrap="wrap" gap={1.5}>
              {system.websiteUrl && (
                <Button
                  component="a"
                  href={system.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  color="primary"
                  startIcon={<LanguageIcon />}
                  size="small"
                >
                  Official Website ↗
                </Button>
              )}
              {system.documentationUrl && (
                <Button
                  component="a"
                  href={system.documentationUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<MenuBookIcon />}
                  size="small"
                >
                  Documentation ↗
                </Button>
              )}
              {system.githubUrl && (
                <Button
                  component="a"
                  href={system.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  size="small"
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  GitHub Repository ↗
                </Button>
              )}
            </Stack>
          </Stack>
        </Card>

        {/* Detailed Information Grid */}
        <Grid container spacing={2.5}>
          {/* Overview & Description */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card variant="outlined" sx={{ height: "100%", p: 1 }}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 700 }}
                >
                  📖 Overview
                </Typography>
                <Divider />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {system.description}
                </Typography>

                {system.architectureNotes && (
                  <>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, mt: 1 }}
                    >
                      🏗️ Architecture & Internal Design
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        p: 1.5,
                        backgroundColor: "rgba(15, 23, 42, 0.6)",
                        borderRadius: 2,
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {system.architectureNotes}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Key Features & Tags */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined" sx={{ height: "100%", p: 1 }}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 700 }}
                >
                  ✨ Key Features
                </Typography>
                <Divider />
                {system.keyFeatures && system.keyFeatures.length > 0 ? (
                  <Stack spacing={1}>
                    {system.keyFeatures.map((feat, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <CodeIcon
                          sx={{
                            fontSize: "1.1rem",
                            color: "primary.light",
                            mt: 0.3,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {feat}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography color="text.secondary">
                    No features specified.
                  </Typography>
                )}

                {system.tags && system.tags.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, mt: 1 }}
                    >
                      🏷️ Tags
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.8}>
                      {system.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={`#${tag}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.75rem",
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          }}
                        />
                      ))}
                    </Stack>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Related Systems */}
          {relatedSystems.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Card variant="outlined" sx={{ p: 1 }}>
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 700 }}
                  >
                    🔗 Related in {system.category}
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                      },
                      gap: 1.5,
                    }}
                  >
                    {relatedSystems.map((item) => (
                      <Card
                        key={item.id}
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          backgroundColor: "rgba(15, 23, 42, 0.6)",
                          borderColor: "rgba(255, 255, 255, 0.08)",
                          "&:hover": {
                            borderColor: "primary.light",
                          },
                        }}
                      >
                        <CardActionArea
                          onClick={() => navigate(`/system/${item.id}`)}
                          sx={{ p: 1.5 }}
                        >
                          <Stack spacing={0.5}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Typography sx={{ fontSize: "1.2rem" }}>
                                {item.iconEmoji || "📦"}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700 }}
                              >
                                {item.name}
                              </Typography>
                            </Stack>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {item.tagline}
                            </Typography>
                          </Stack>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Container>
  );
}
