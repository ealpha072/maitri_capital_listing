
// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
import project_maasai_banner from "../Assets/project_maasai_banner.avif"
import project_manjaro_banner from "../Assets/project_manjaro_banner.avif"
import project_bahati_banner from "../Assets/project_bahati_banner.avif"
import project_nexus_banner from "../Assets/project_nexus_banner.avif"
import project_atlas_banner from "../Assets/project_atlas_banner.avif"
import project_johari_banner from "../Assets/project_johari_banner.avif"
import project_ilora_banner from "../Assets/project_ilora_banner.avif"

const DEFAULT_LISTINGS = [
    { 
        id: "1", 
        title: "Project Maasai", 
        subtitle: "Where the wild never ends", 
        location: "Kenya, Tanzania, East Africa", 
        category: "Safari", 
        status: "Operating", 
        deal:"Full exit",
        investment: "$48M", 
        irr: "22.4%", 
        targetIrr: "", 
        rooms: "30+ Tents", 
        opening: "2021", 
        featured: true, 
        description: "A family-owned, ultra-luxury safari hospitality platform operating a curated portfolio of high-end tented camps across East Africa’s premier wildlife ecosystems.The business specializes in delivering “wild luxury” experiences, combining five-star accommodation, personalized service (including private butlers), and premium-guided wildlife experiences within exclusive or low-density conservation areas. The platform currently operates: One flagship property in Kenya’s Maasai Mara ecosystem, located within a private conservancy enabling differentiated access (e.g., off-road driving, night safaris) Two complementary properties in Tanzania’s Serengeti, including a permanent camp in the northern migration corridor and a semi-mobile camp designed to track wildlife movements seasonally.", 
        highlights: ["Exclusive wilderness destinations", "Market Leader in Luxury Tourism", "Multi-award Winner", "Highly profitable and cash flow positive"], 
        image: project_maasai_banner, 
        galleryImages: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80","https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"] 
    },
    { 
        id: "2", 
        title: "Project Manjaro", 
        subtitle: "Solitude, perfected", 
        location: "Kenya, East Africa", 
        category: "Safari", 
        status: "Operating", 
        deal:"Equity : Debt",
        investment: "$62M", 
        irr: "19.1%", 
        targetIrr: "", 
        rooms: "11 Tents", 
        opening: "2022", 
        featured: false, 
        description: "A heritage luxury safari operator with a multi-generational legacy in East Africa, the business delivers high-end, conservation-led safari experiences within a privately managed conservancy in the Maasai Mara ecosystem. The company operates a low-density, high-yield model centered on a flagship camp and private residences, offering immersive, fully guided wildlife experiences supported by strong in-house guiding expertise and personalized service. Revenue is driven by all-inclusive nightly rates targeting affluent international travelers, with differentiation anchored in its legacy brand, deep conservation integration, and community engagement, positioning the platform within the growing global demand for sustainable, purpose-driven luxury tourism.", 
        highlights: ["Phenomenal and exclusive wilderness destinations", "Market Leader in Luxury Tourism", "Dedication to Sustainability", "Highly profitable and cashflow positive"], 
        image: project_manjaro_banner, 
        galleryImages: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"] 
    },
    { 
        id: "3", 
        title: "Project Bahati", 
        subtitle: "Stylish and vibrant", 
        location: "Kenya, East Africa", 
        category: "Hotel", 
        status: "Operating", 
        deal:"Sale and Leaseback",
        investment: "$31M", 
        irr: "", 
        targetIrr: "24.0%", 
        rooms: "110+ Keys", 
        opening: "Operating", 
        featured: false, 
        description: "A boutique hospitality property located in Nairobi, the business operates as an intimate, design-led hotel catering to both business and leisure travelers seeking a quiet, upscale alternative to large-format city hotels. The property offers a limited number of well-appointed rooms, personalized service, and curated amenities, positioning itself within the mid- to upper-tier urban accommodation segment. Revenue is driven by short-stay bookings, corporate clients, and repeat domestic and international guests, with differentiation anchored in its tranquil setting, individualized guest experience, and niche positioning within Nairobi’s competitive hospitality market.", 
        highlights: ["Modern 4-star hotel with recent CAPEX investment", "Compelling real estate play with replacement-cost advantages", "Sits in a high-demand corporate and NGO corridor", "Outperforms competitors in room-night generation"], 
        image: project_bahati_banner, 
        galleryImages: [] 
    },
    { 
        id: "4", 
        title: "Project Nexus", 
        subtitle: "Executive Ease", 
        location: "Kenya, East Africa", 
        category: "Hotel", 
        status: "Operating", 
        deal:"Full exit",
        investment: "$27M", 
        irr: "17.8%", 
        targetIrr: "", 
        rooms: "160 Keys", 
        opening: "2023", 
        featured: false, 
        description: "A business-oriented urban hotel operating under the internationally affiliated Sarovar Hotels & Resorts portfolio, the property is located in Nairobi and caters primarily to corporate travelers, diplomats, and short-stay international guests. The hotel offers a full-service hospitality model, including multiple room categories, conference and meeting facilities, food and beverage outlets, and wellness amenities, positioning it within the mid- to upper-midscale segment of the city’s accommodation market. Revenue is driven by corporate bookings, conferences and events, and steady business travel demand, with differentiation anchored in its recognized brand affiliation, central location, and integrated service offering suited to Nairobi’s role as a regional commercial and diplomatic hub.", 
        highlights: [" Strategic Locations in Established Commercial Districts", "Portfolio includes two operating business hotels", "Strong financial performance with projected EBITDA margins of ~35–37%"], 
        image: project_nexus_banner, 
        galleryImages: [] 
    },
    { 
        id: "5", 
        title: "Project Atlas", 
        subtitle: "Conservation as investment thesis", 
        location: "Kenya, East Africa", 
        category: "Safari", 
        status: "Development", 
        deal:"Completion Finance",
        investment: "$38M", 
        irr: "20.5%", 
        targetIrr: "", 
        rooms: "82 Keys", 
        opening: "-", 
        featured: false, 
        description: "Project Atlas represents a hospitality development opportunity to deliver a professionally operated urban hotel within a major East African capital city. The project will deliver an 82-key mid-scale hotel and serviced apartment offering, designed to serve corporatetravelers, consultants, development agencies and international organizations operating within the city’s commercial district. An international hotel operator and brand have been identified, with discussions currently underway to finalise the management agreement. The redevelopment incorporates modern building systems and operational efficiencies designed to improve energy and water efficiency compared with traditional hospitality developments.", 
        highlights: ["Initial construction works have commenced", "Diversified Accommodation Offering", "International hotel operator and brand identified", "Cost-efficient development at approximately USD 130k per key"], 
        image: project_atlas_banner, 
        galleryImages: [] 
    },
    { 
        id: "6", 
        title: "Project Johari", 
        subtitle: "Present-day performance with clear forward momentum", 
        location: "Kenya, Coastline", 
        category: "Coastal", 
        status: "Operating", 
        deal:"Full exit",
        investment: "$48M", 
        irr: "22.4%", 
        targetIrr: "", 
        rooms: "10 Rooms", 
        opening: "2021", 
        featured: false, 
        description: "a thriving boutique beachfront hotel, renowned for its design, privacy, and sustainability. With fewer than 10 rooms, positioned within a protected marine area along Kenya's pristine coastline, this coastal gem offers rare intimacy and scale.The property combines strong present-day performance with clear forward momentum—with professionally developed expansion plans included in the sale, offering a viable pathway to scale in one of Africa's most promising luxury tourism corridors.", 
        highlights: ["Prime beachfront location", "Award-Winning Eco-Luxury", "Intimate, Expandable Concept", "Diversified Revenue Streams"], 
        image: project_johari_banner, 
        galleryImages: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80","https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"] 
    },
    { 
        id: "7", 
        title: "Project Ilora", 
        subtitle: "Maasai Mara unfolded", 
        location: "Kenya, Maasai Mara", 
        category: "Safari", 
        status: "Operating", 
        deal:"Full Exit",
        investment: "$62M", 
        irr: "19.1%", 
        targetIrr: "", 
        rooms: "14 Tents", 
        opening: "2022", 
        featured: false, 
        description: "A rare investment opportunity in a prime 30-acre property with 14 luxury tents (600+sq feet, offering 360- degree views and expansion potential. Has spa, gym, pool, sky deck, photo lounge, curio, reception, and multiple dining venues. Located just 10 minutes from the migration crossing and Olkiombo Airstrip, providing year-round, immersive wildlife experiences—closer than most competitors. Guests enjoy premium activities like star beds, stargazing, and bush movies, bush walks, 7 course meals, enhancing their connection to nature and Maasai culture.", 
        highlights: [" Direct access to the Great Migration", "Sustainability Appeal with Eco-friendly camps", " Peak migration periods bring full occupancy and potential for higher average daily rates "], 
        image: project_ilora_banner, 
        galleryImages: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"] 
    }
];

export default DEFAULT_LISTINGS