import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import type { SpiceLevel } from '@repo/shared';
import SpiceLevelBadge from '@/components/ui/SpiceLevelBadge';

interface WildFoodItem {
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

const WILD_FOOD_ITEMS: WildFoodItem[] = [
  {
    id: 'wild-1',
    titleTh: 'ผัดเผ็ดหมูป่า',
    titleEn: 'Spicy Stir-fried Wild Boar',
    descriptionTh: 'หมูป่าผัดกับเครื่องแกงป่ารสจัด ใส่ใบมะกรูดและพริกชี้ฟ้า กลิ่นหอมฉุน รสเผ็ดร้อนเข้มข้น',
    descriptionEn: 'Wild boar stir-fried with bold forest curry paste, kaffir lime leaves and spur chillies. Intensely aromatic and fiery.',
    spiceLevel: 'HOT',
    mainIngredient: 'หมูป่า (Wild Boar)',
    servings: 2,
    imageUrl: '/images/food/wild-stir-fry.jpg',
  },
  {
    id: 'wild-2',
    titleTh: 'กบทอดกระเทียม',
    titleEn: 'Garlic Fried Frog',
    descriptionTh: 'กบหมักกระเทียมและพริกไทย ทอดน้ำมันร้อนจนกรอบนอกนุ่มใน เสิร์ฟพร้อมซอสพริกรสเผ็ด',
    descriptionEn: 'Frog marinated in garlic and black pepper, deep-fried until crispy outside and tender inside. Served with spicy chilli sauce.',
    spiceLevel: 'HOT',
    mainIngredient: 'กบ (Frog)',
    servings: 2,
    imageUrl: '/images/food/wild-frog.jpg',
  },
  {
    id: 'wild-3',
    titleTh: 'แกงป่าไก่บ้าน',
    titleEn: 'Village Chicken Forest Curry',
    descriptionTh: 'แกงป่าไม่ใส่กะทิ ใช้ไก่บ้านเนื้อแน่น ใส่หน่อไม้และผักป่า รสเผ็ดจัดจ้านแบบอาหารป่าแท้',
    descriptionEn: 'Coconut-free forest curry with firm free-range chicken, bamboo shoots and wild greens. Authentically fierce and bold.',
    spiceLevel: 'THAI_HOT',
    mainIngredient: 'ไก่บ้าน (Free-range Chicken)',
    servings: 3,
    imageUrl: '/images/food/wild-forest-curry.jpg',
  },
  {
    id: 'wild-4',
    titleTh: 'ต้มยำเห็ดป่า',
    titleEn: 'Wild Mushroom Tom Yum',
    descriptionTh: 'ต้มยำเห็ดป่าหลากชนิด รสเปรี้ยวเผ็ดจัด กลิ่นหอมตะไคร้ ใบมะกรูด และน้ำปลาปรุงรสเข้มข้น',
    descriptionEn: 'Tom yum with a medley of foraged wild mushrooms. Sharp, spicy and aromatic with lemongrass and kaffir lime.',
    spiceLevel: 'HOT',
    mainIngredient: 'เห็ดป่า (Wild Mushrooms)',
    servings: 2,
    imageUrl: '/images/food/wild-tom-yum.jpg',
  },
  {
    id: 'wild-5',
    titleTh: 'ลาบหมูป่า',
    titleEn: 'Wild Boar Larb',
    descriptionTh: 'ลาบหมูป่าสับละเอียด คลุกข้าวคั่ว พริกป่น มะนาว สมุนไพรป่า รสเผ็ดร้อนจัดจ้าน เอกลักษณ์อาหารป่า',
    descriptionEn: 'Minced wild boar larb tossed with toasted rice powder, chilli flakes, lime and wild herbs. The definitive forest dish.',
    spiceLevel: 'THAI_HOT',
    mainIngredient: 'หมูป่า (Wild Boar)',
    servings: 2,
    imageUrl: '/images/food/wild-larb.jpg',
  },
];

export default function WildFoodPage() {
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
          ✦ &nbsp; Forest &amp; Wild &nbsp; ✦
        </Typography>

        <Typography
          variant="h3"
          component="h1"
          sx={{ color: 'white', fontWeight: 700, lineHeight: 1.1 }}
        >
          อาหารป่า
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, mt: 0.5, mb: 3 }}
        >
          Wild &amp; Forest Thai Food
        </Typography>

        <Box sx={{ width: 48, height: 3, bgcolor: 'secondary.main', borderRadius: 1, mb: 3 }} />

        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mb: 3 }}>
          อาหารป่าใช้วัตถุดิบจากธรรมชาติและป่า รสชาติจัดจ้าน เผ็ดร้อนเข้มข้น
          เป็นเอกลักษณ์ของอาหารพื้นบ้านไทยแท้ดั้งเดิม
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="รสจัด" color="error" size="small" />
          <Chip
            label="วัตถุดิบจากป่า"
            size="small"
            variant="outlined"
            sx={{ borderColor: 'secondary.main', color: 'secondary.main' }}
          />
          <Chip
            label="ไม่ใส่กะทิ"
            size="small"
            variant="outlined"
            sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }}
          />
        </Box>
      </Box>

      {/* ── MENU GRID ── */}
      <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 6, md: 10 } }}>
        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
          {WILD_FOOD_ITEMS.map((item) => (
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
