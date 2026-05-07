
// ─── BANNER IMAGES ─────────────────────────────────────────────────────────────
import project_maasai_banner from "../assets/project_maasai_banner.avif"
import project_asili_banner from "../assets/project_manjaro_banner.avif"
import project_bahati_banner from "../assets/project_bahati_banner.avif"
import project_nexus_banner from "../assets/project_nexus_banner.avif"
import project_atlas_banner from "../assets/project_atlas_banner.avif"
import project_johari_banner from "../assets/project_johari_banner.avif"
import project_fursa_banner from "../assets/project_ilora_banner.avif"
import project_serengeti_banner from "../assets/project_serengeti_banner.avif"
import project_nigiri_banner from "../assets/project_nigiri_banner.avif"

// ─── GALLERY IMAGES ─────────────────────────────────────────────────────────────
import maasai_mara_001 from "../assets/maasai_mara_001.avif"
import maasai_mara_002 from "../assets/maasai_mara_002.avif"
import maasai_mara_003 from "../assets/maasai_mara_003.avif"
import serengeti_001 from "../assets/serengeti_001.avif"
import serengeti_002 from "../assets/serengeti_002.avif"
import serengeti_003 from "../assets/serengeti_003.avif"
import nairobi_001 from "../assets/nairobi_001.avif"
import nairobi_002 from "../assets/nairobi_002.avif"
import incomplete_001 from "../assets/incomplete_001.avif"
import beach_001 from "../assets/beach_001.avif"
import beach_002 from "../assets/beach_002.avif"
import restaurant_001 from "../assets/restaurant_001.avif"
import restaurant_002 from "../assets/restaurant_002.avif"

const DEFAULT_LISTINGS = [
    // ─── Project Maasai ─────────────────────────────────────────────────────────────
    {
        id: "1",
        title: "Project Maasai",
        subtitle: "Where the wild never ends",
        location: "Kenya, Tanzania, East Africa",
        category: "Safari",
        status: "Operating",
        deal:"Full exit",
        investment:"xx",
        revenue: "$9.18M",
        revenue_year:"Revenue (2025E)",
        rooms: "40",
        legacy: "20+",
        featured: true,
        description: "Across two of East Africa’s most protected and sought-after wildlife ecosystems, a small collection of ultra-luxury safari camps has been built over several decades into one of the region’s most respected hospitality brands. The access to landscape and wildlife is exceptional—rare, deeply established, and increasingly impossible to replicate. Operating across Kenya and Tanzania, the platform is intentionally small and meticulously curated, delivering an ultra-luxury guest experience comparable to the world’s leading safari operators, with exceptional design, service, and privileged access to extraordinary landscapes and wildlife.",
        highlights: ["Access That Cannot Be Replicated", "Market Leader in Luxury Tourism", "A Brand Earned, Not Built", "Consistent and Growing Financial Performance", "Long-Term Site Security", "Conservation & Community — Built In, Not Bolted On"],
        image: project_maasai_banner,
        galleryImages: [maasai_mara_001, serengeti_001]
    },
    // ─── Project Asili ─────────────────────────────────────────────────────────────
    {
        id: "2",
        title: "Project Asili",
        subtitle: "Solitude, perfected",
        location: "Kenya, East Africa",
        category: "Safari",
        status: "Operating",
        deal:"Equity : Debt",
        investment: "xx",
        rooms: "11",
        legacy: "90+",
        featured: false,
        description: "A heritage luxury safari operator with a multi-generational legacy in East Africa, the business delivers high-end, conservation-led safari experiences within a privately managed conservancy in the Maasai Mara ecosystem. The company operates a low-density, high-yield model centered on a flagship camp and private residences, offering immersive, fully guided wildlife experiences supported by strong in-house guiding expertise and personalized service. Revenue is driven by all-inclusive nightly rates targeting affluent international travelers, with differentiation anchored in its legacy brand, deep conservation integration, and community engagement, positioning the platform within the growing global demand for sustainable, purpose-driven luxury tourism.",
        highlights: ["Rare, phenomenal and exclusive wilderness destinations", "Market Leader in Luxury Tourism", "Dedication to Sustainability", "Highly profitable and cashflow positive", "Customer-Centric Approach"],
        image: project_asili_banner,
        galleryImages: [maasai_mara_002, maasai_mara_003]
    },
    // ─── Project Bahati ─────────────────────────────────────────────────────────────
    {
        id: "3",
        title: "Project Bahati",
        subtitle: "Stylish and vibrant",
        location: "Nairobi, Kenya",
        category: "Hotel",
        status: "Operating",
        deal:"Sale and Leaseback",
        investment: "xx",
        floors: "6",
        rental_yield: "~7.3%",
        zone: "UN",
        mgt_exp: "15+",
        opening: "Operating",
        featured: false,
        description: "A rare opportunity to invest in a fully completed and operational hospitality asset in the heart of Westlands, Nairobi, one of the city’s most sought-after commercial and residential districts. Situated in one of Kenya's most sought-after commercial and lifestyle corridors, this property is surrounded by Grade A corporate offices and NGO headquarters, with world-class retail within walking distance. Location within UN-approved and Blue Zone designation further strengthens the tenant pool, a consistent stream of international professionals and organizations requiring quality furnished accommodation. The asset comprises a curated mix of fully furnished studio and one-bedroom serviced apartments, designed to deliver both lifestyle appeal and stable recurring income.",
        highlights: ["Fully completed and operational hospitality asset", " Situated in one of Kenya's most sought-after commercial and lifestyle corridors", "Location within UN-approved and Blue Zone designation", " Rental distributions are shared across the pool", "Experienced operator with 15+ years of hospitality and serviced apartment management expertise"],
        image: project_bahati_banner,
        galleryImages: [nairobi_001, nairobi_002]
    },
    // ─── Project Nexus ─────────────────────────────────────────────────────────────
    {
        id: "4",
        title: "Project Nexus",
        subtitle: "Executive Ease",
        location: "Nairobi, Kenya",
        category: "Hotel",
        status: "Operating",
        deal:"Full exit",
        investment: "$27M",
        portfolio: "2",
        rooms: "160+",
        revenue: "$2.08M",
        revenue_year: "Revenue 2025",
        featured: false,
        description: "An opportunity to acquire a portfolio of two operating business hotels located in the core commercial districts of East Africa’s leading diplomatic and commercial capital. The hotels benefit from proximity to multinational corporations, diplomatic missions and international organizations, supporting resilient demand from corporate and long-stay business travelers. The hotels benefit from established corporate relationships with multinational companies, development institutions and diplomatic missions operating in the city. The assets comprise ~160 keys across two operating properties, generating revenue from rooms, food & beverage outlets, conferencing facilities and long-stay accommodation. The investment represents a rare opportunity to acquire a profitable business-hotel platform in one of Africa’s most important commercial and diplomatic gateway cities.",
        highlights: [" Strategic Locations in Established Commercial Districts", "Portfolio includes two operating business hotels", "Strong financial performance with projected EBITDA margins of ~35–37%"],
        image: project_nexus_banner,
        galleryImages: [nairobi_002, nairobi_001]
    },
    // ─── Project Atlas ─────────────────────────────────────────────────────────────
    {
        id: "5",
        title: "Project Atlas",
        subtitle: "",
        location: "Nairobi, Kenya",
        category: "Safari",
        status: "Development",
        deal:"Completion Finance",
        investment: "xx",
        rooms: "82+",
        opening: "",
        revenue: "$10.6M",
        revenue_year: "~ Development Cost",
        occupancy: "65%",
        featured: false,
        description: "Project Atlas represents a hospitality development opportunity to deliver a professionally operated urban hotel within a major East African capital city. The project will deliver an 82-key mid-scale hotel and serviced apartment offering, designed to serve corporatetravelers, consultants, development agencies and international organizations operating within the city’s commercial district. An international hotel operator and brand have been identified, with discussions currently underway to finalise the management agreement. The redevelopment incorporates modern building systems and operational efficiencies designed to improve energy and water efficiency compared with traditional hospitality developments.",
        highlights: ["Initial construction works have commenced", "Located within a mature commercial district", "Diversified Accommodation Offering", "International hotel operator and brand identified", "Cost-efficient development at approximately USD 130k per key"],
        image: project_atlas_banner,
        galleryImages: [incomplete_001]
    },
    // ─── Project Johari ─────────────────────────────────────────────────────────────
    {
        id: "6",
        title: "Project Johari",
        subtitle: "Present-day performance with clear forward momentum",
        location: "Kenya, Coastline",
        category: "Coastal",
        status: "Operating",
        deal:"Full exit",
        investment: "",
        rating: "5",
        legacy: "20+",
        rating_source: "Tripadvisor Rating",
        rooms: "10",
        featured: false,
        description: "An exclusive opportunity to acquire a thriving boutique beachfront hotel, renowned for its design, privacy, and sustainability. With fewer than 10 rooms, positioned within a protected marine area along Kenya's pristine coastline, this coastal gem offers rare intimacy and scale. The property combines strong present-day performance with clear forward momentum—with professionally developed expansion plans included in the sale, offering a viable pathway to scale in one of Africa's most promising luxury tourism corridors.",
        highlights: ["Prime beachfront location within a protected marine area along Kenya's unspoilt coastline", "Award-Winning eco-Luxury, consistently ranked among Kenya's top boutique hotels", "Intimate, expandable concept with a personalized Swahili-coastal experience", "Diversified revenue streams beyond accommodation"],
        image: project_johari_banner,
        galleryImages: [beach_001, beach_002]
    },
    // ─── Project Fursa ─────────────────────────────────────────────────────────────
    {
        id: "7",
        title: "Project Fursa",
        subtitle: "Maasai Mara unfolded",
        location: "Maasai Mara, Kenya",
        category: "Safari",
        status: "Operating",
        deal:"Full Exit",
        investment: "xx",
        rooms: "14",
        solar_power: "100%",
        legacy: "15+",
        featured: false,
        description: "An exclusive opportunity to acquire a fast-growing luxury safari retreat redefining immersive wilderness hospitality within Kenya’s iconic Maasai Mara ecosystem. The business blends high-end experiential travel, wellness, and conservation-led tourism to deliver a differentiated guest experience in one of Africa’s most sought-after safari destinations. The business operates a boutique luxury tented retreat strategically located within the greater Maasai Mara ecosystem, offering curated safari experiences, wellness-driven hospitality, and personalized guest services tailored to affluent international travelers. The property has established a strong reputation for exceptional service, intimate guest experiences, and thoughtfully designed accommodations that immerse visitors in the natural landscape while maintaining premium hospitality standards.",
        highlights: [" Direct access to the Great Migration", "Sustainability Appeal with Eco-friendly camps", " Peak migration periods bring full occupancy and potential for higher average daily rates "],
        image: project_fursa_banner,
        galleryImages: [maasai_mara_002, maasai_mara_003]
    },
    // ─── Project Serengeti ─────────────────────────────────────────────────────────────
    {
        id: "8",
        title: "Project Serengeti",
        subtitle: "Untamed Luxury in the Heart of Africa",
        location: "Serengeti, Tanzania",
        category: "Safari",
        status: "Development",
        deal:"Acquisition",
        investment: "xx",
        featured: false,
        description: "An opportunity to develop an exclusive luxury tented camp within a secluded and breathtaking setting in the greater Serengeti ecosystem — one of Africa’s most iconic and globally celebrated safari destinations. Strategically positioned near key wildlife migration routes and river crossing points, the proposed camp locations offer unparalleled access to the region’s most spectacular natural events, including dramatic river crossings, predator-prey encounters, and year-round game viewing experiences. The development presents the opportunity to create a high-end, intimate safari retreat tailored to affluent global travelers seeking privacy, authenticity, and immersive wilderness experiences. Combining luxury hospitality with one of the world’s most extraordinary natural landscapes, the camp is uniquely positioned to deliver unforgettable once-in-a-lifetime safari experiences at the heart of the action.",
        highlights: ["Proximity to Key Wildlife Activity Areas", "Unparalleled Night Skies and Serenity with zero light pollution", "Supported by a reliable road network, water access, and solar energy potential", "Sustainable luxury tourism supported by  Tanzania’s high-value, low-volume model ensuring exclusive experiences"],
        image: project_serengeti_banner,
        galleryImages: [serengeti_002, serengeti_003]
    },
    // ─── Project Nigiri ─────────────────────────────────────────────────────────────
    {
        id: "9",
        title: "Project Nigiri",
        subtitle: "Redefining Dining. Unlocking Opportunity",
        location: "Nairobi, Kenya",
        category: "Food & Bevarage",
        status: "Opearting",
        deal:"Full Exit",
        investment: "xx",
        revenue: "KES 228M",
        revenue_year: "AVG ANNUAL REVENUE PRE-PANDEMIC",
        rating: "Top 5%",
        legacy: "10+",
        rating_source: "TRIPADVISOR RANKED",
        featured: false,
        description: "An exclusive opportunity to acquire a scalable, award-winning dining concept redefining the culinary landscape in Nairobi's vibrant metropolitan hub. The business operates a flagship, high-end dining destination located within a prime mixed-use commercial development in Westlands, Nairobi. It is built around a distinctive multi-kitchen “gourmet gallery” concept, combining several curated culinary experiences under one roof, including Asian, Indian, international café-style dining, dessert offerings, and a signature bar.",
        highlights: ["Proven industry expertise with over a decade of successful operation", "Prime Location in a vibrant and bustling metropolitan hub", "Prestigious Recognition Ranked in the top 5% of all Nairobi restaurants on TripAdvisor", "Diverse & Highly Rated Menu offering a true multi-cuisine concept "],
        image: project_nigiri_banner,
        galleryImages: [restaurant_001, restaurant_002]
    }
];

export default DEFAULT_LISTINGS