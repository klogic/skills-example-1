import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from 'next/link';

const HERO_IMAGE = '/images/food/hero-tom-yum.jpg';

const CATEGORY_CARDS = [
  {
    href: '/recipes',
    category: 'All Dishes',
    labelEn: 'Browse Recipes',
    labelTh: 'เรียกดูสูตรอาหาร',
    imageUrl: '/images/food/card-massaman.jpg',
  },
  {
    href: '/wild-food',
    category: 'Forest & Wild',
    labelEn: 'Wild Food',
    labelTh: 'อาหารป่า',
    imageUrl: '/images/food/card-larb.jpg',
  },
  {
    href: '/central-thai-food',
    category: 'Central Thailand',
    labelEn: 'Central Thai Food',
    labelTh: 'อาหารภาคกลาง',
    imageUrl: '/images/food/card-green-curry.jpg',
  },
];

export default function HomePage() {
  return (
    <Box>
      {/* ── HERO ── */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Thai Tom Yum soup"
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        {/* dark gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* hero content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            px: 3,
            maxWidth: 800,
          }}
        >
          <Typography
            sx={{
              color: 'secondary.main',
              letterSpacing: 8,
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              mb: 3,
            }}
          >
            ✦ &nbsp; Authentic Thai Cuisine &nbsp; ✦
          </Typography>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '3.5rem', sm: '5rem', md: '7rem' },
              lineHeight: 1,
              letterSpacing: -1,
            }}
          >
            Thai
          </Typography>
          <Typography
            variant="h1"
            component="span"
            sx={{
              display: 'block',
              color: 'secondary.main',
              fontWeight: 300,
              fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
              lineHeight: 1.1,
            }}
          >
            Cooking
          </Typography>

          {/* gold rule */}
          <Box
            sx={{
              width: 64,
              height: 3,
              bgcolor: 'secondary.main',
              mx: 'auto',
              my: 4,
              borderRadius: 1,
            }}
          />

          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 400,
              letterSpacing: 1,
            }}
          >
            อาหารไทย
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.65)',
              mt: 1,
              letterSpacing: 2,
              fontSize: '0.9rem',
            }}
          >
            สูตรอาหารไทยแท้ — Authentic Thai Recipes
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.35)',
              mt: 8,
              letterSpacing: 4,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
            }}
          >
            scroll to explore ↓
          </Typography>
        </Box>
      </Box>

      {/* ── CATEGORY CARDS ── */}
      <Box
        sx={{
          bgcolor: 'grey.900',
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              color: 'secondary.main',
              letterSpacing: 6,
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Explore the Menu
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: 'white', fontWeight: 600 }}
          >
            เลือกหมวดอาหาร
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
          {CATEGORY_CARDS.map((card) => (
            <Grid item xs={12} md={4} key={card.href}>
              <Link href={card.href} style={{ textDecoration: 'none', display: 'block' }}>
                <Card
                  sx={{
                    position: 'relative',
                    height: { xs: 260, md: 380 },
                    overflow: 'hidden',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 12,
                    },
                    '&:hover .hero-img': {
                      transform: 'scale(1.06)',
                    },
                  }}
                >
                  <Box
                    className="hero-img"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      transition: 'transform 0.45s ease',
                    }}
                  >
                    <Image
                      src={card.imageUrl}
                      alt={card.labelEn}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </Box>

                  {/* gradient overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
                    }}
                  />

                  {/* card text */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'secondary.main',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: 4,
                        textTransform: 'uppercase',
                        mb: 0.5,
                      }}
                    >
                      {card.category}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}
                    >
                      {card.labelEn}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}
                    >
                      {card.labelTh}
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 2,
                          bgcolor: 'secondary.main',
                          borderRadius: 1,
                          transition: 'width 0.3s ease',
                          '.MuiCard-root:hover &': { width: 40 },
                        }}
                      />
                      <Typography
                        sx={{
                          color: 'secondary.main',
                          fontSize: '0.7rem',
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        Explore
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
