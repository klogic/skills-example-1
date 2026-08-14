import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import type { SpiceLevel } from '@repo/shared';
import SpiceLevelBadge from '@/components/ui/SpiceLevelBadge';

interface CentralThaiItem {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  spiceLevel: SpiceLevel;
  mainIngredient: string;
  servings: number;
  imageUrl: string;
}

const CENTRAL_THAI_ITEMS: CentralThaiItem[] = [
  {
    id: 'central-1',
    titleTh: 'แกงเขียวหวาน',
    titleEn: 'Green Curry',
    descriptionTh: 'แกงเขียวหวานกะทิเข้มข้น ใส่ไก่และมะเขือเปราะ รสหวานมันกลมกล่อม หอมใบมะกรูด',
    descriptionEn: 'Rich coconut green curry with chicken and Thai eggplant. Creamy, gently spiced and fragrant with kaffir lime.',
    spiceLevel: 'MEDIUM',
    mainIngredient: 'ไก่ (Chicken)',
    servings: 3,
    imageUrl: '/images/food/central-green-curry.jpg',
  },
  {
    id: 'central-2',
    titleTh: 'พะแนงหมู',
    titleEn: 'Pork Panang Curry',
    descriptionTh: 'พะแนงหมูกะทิหนา รสหวานมันเล็กน้อย หอมใบมะกรูดซอย เนื้อหมูนุ่ม เข้มข้นแต่ไม่เผ็ดจัด',
    descriptionEn: 'Thick Panang curry with tender pork in rich coconut cream. Subtly sweet and aromatic — a Bangkok classic.',
    spiceLevel: 'MILD',
    mainIngredient: 'หมู (Pork)',
    servings: 2,
    imageUrl: '/images/food/central-panang.jpg',
  },
  {
    id: 'central-3',
    titleTh: 'ต้มข่าไก่',
    titleEn: 'Chicken Galangal Coconut Soup',
    descriptionTh: 'ต้มข่าไก่กะทิหอม ใส่ข่า ตะไคร้ ใบมะกรูด เห็ด รสเปรี้ยวอ่อนๆ หวานกลมกล่อม ไม่เผ็ด',
    descriptionEn: 'Creamy coconut soup infused with galangal, lemongrass and kaffir lime. Mildly sour, lightly sweet — deeply comforting.',
    spiceLevel: 'MILD',
    mainIngredient: 'ไก่ (Chicken)',
    servings: 3,
    imageUrl: '/images/food/central-tom-kha.jpg',
  },
  {
    id: 'central-4',
    titleTh: 'แกงจืดเต้าหู้หมูสับ',
    titleEn: 'Clear Tofu and Pork Broth Soup',
    descriptionTh: 'แกงจืดน้ำใสซุปอ่อนๆ ใส่เต้าหู้ หมูสับ วุ้นเส้น ผักบุ้ง ปรุงรสเบาๆ ด้วยซีอิ๊วขาว ไม่ใส่พริก',
    descriptionEn: 'Light clear broth with silken tofu, minced pork, glass noodles and water spinach. A gentle, restorative everyday soup.',
    spiceLevel: 'NON_SPICY',
    mainIngredient: 'เต้าหู้ + หมูสับ (Tofu & Minced Pork)',
    servings: 3,
    imageUrl: '/images/food/central-clear-soup.jpg',
  },
  {
    id: 'central-5',
    titleTh: 'มัสมั่นไก่',
    titleEn: 'Chicken Massaman Curry',
    descriptionTh: 'มัสมั่นไก่กะทิข้น ใส่มันฝรั่ง ถั่วลิสง รสหวานเครื่องเทศ กลิ่นหอมอบอุ่น ไม่เผ็ด เป็นราชาของแกงไทย',
    descriptionEn: 'Slow-simmered Massaman curry with potato and peanuts in thick coconut sauce. Warmly spiced, gently sweet — often called the king of Thai curries.',
    spiceLevel: 'MILD',
    mainIngredient: 'ไก่ (Chicken)',
    servings: 4,
    imageUrl: '/images/food/central-massaman.jpg',
  },
];

export default function CentralThaiFoodPage() {
  return (
    <Box sx={{ bgcolor: 'grey.900', minHeight: '100vh' }}>
      {/* ── PAGE HEADER ── */}
      <Box sx={{ px: { xs: 3, md: 6 }, pt: { xs: 6, md: 8 }, pb: 5 }}>
        <Typography
          sx={{
            color: 'secondary.main',
            letterSpacing: 6,
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            mb: 2,
          }}
        >
          ✦ &nbsp; Central Thailand &nbsp; ✦
        </Typography>

        <Typography
          variant="h3"
          component="h1"
          sx={{ color: 'white', fontWeight: 700, lineHeight: 1.1 }}
        >
          อาหารภาคกลาง
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, mt: 0.5, mb: 3 }}
        >
          Central Thai Food
        </Typography>

        <Box sx={{ width: 48, height: 3, bgcolor: 'secondary.main', borderRadius: 1, mb: 3 }} />

        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mb: 3 }}>
          อาหารภาคกลางมีรสกลมกล่อม ออกหวานนำ เน้นกะทิเข้มข้น ไม่เผ็ดจัด
          เป็นอาหารไทยที่รู้จักกันดีทั่วโลก
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="รสกลาง" color="warning" size="small" />
          <Chip
            label="เน้นกะทิ"
            size="small"
            variant="outlined"
            sx={{ borderColor: 'secondary.main', color: 'secondary.main' }}
          />
          <Chip
            label="ออกหวานหน่อย"
            size="small"
            variant="outlined"
            sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }}
          />
        </Box>
      </Box>

      {/* ── MENU GRID ── */}
      <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 6, md: 10 } }}>
        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
          {CENTRAL_THAI_ITEMS.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  position: 'relative',
                  height: 340,
                  overflow: 'hidden',
                  borderRadius: 2,
                  bgcolor: 'grey.800',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 },
                  '&:hover .menu-img': { transform: 'scale(1.06)' },
                }}
              >
                <Box
                  className="menu-img"
                  sx={{ position: 'absolute', inset: 0, transition: 'transform 0.45s ease' }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.titleEn}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
                  }}
                />

                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5 }}>
                  <Box sx={{ mb: 1 }}>
                    <SpiceLevelBadge spiceLevel={item.spiceLevel} />
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}>
                    {item.titleEn}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'secondary.main', mt: 0.25 }}>
                    {item.titleTh}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.65)',
                      mt: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.descriptionEn}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1.5,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                      {item.mainIngredient}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                      {item.servings} servings
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
