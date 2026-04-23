const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function getGeminiKeys() {
  return [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4
  ].filter(Boolean);
}

const AFROSAND_KNOWLEDGE = `
Afrosand is a digital travel platform focused on connecting travelers with trusted travel service providers across Africa.

Afrosand helps users discover and connect with:
- Hotels & Apartments
- Flights
- Tours & Safaris
- Car Rentals
- Visa Services

Afrosand also helps travel service providers improve their digital presence, attract more customers, and grow their businesses.

Who Afrosand serves:
1. Travelers looking for trusted travel services
2. Service providers such as hotels, apartments, tour operators, car rental businesses, and related travel businesses

Benefits for travelers:
- Easy access to multiple travel services in one place
- Ability to discover trusted providers
- Simpler travel planning experience
- More convenient access to African travel services

Benefits for service providers:
- Better online visibility
- Access to more customers
- Stronger digital presence
- More organized presentation of services
- Growth opportunities through Afrosand
- Better positioning for modern digital travel customers

Afrosand also supports knowledge and advisory conversations around:
- tourism growth
- modern marketing
- hospitality excellence
- hotel sales
- customer service
- customer experience
- staff performance
- travel business growth
- tourism economics

If a user asks "What is Afrosand?" or "Afrosand ni nini?":
Explain that Afrosand is a travel platform that connects travelers with travel service providers across services like hotels, flights, tours, car rentals, and visa services.

If a user asks about joining as a provider:
Explain that Afrosand supports hotels, apartments, tour operators, car rental providers, and other travel-related businesses that want to increase visibility and connect with more customers.

If a user asks about bookings:
Explain that Afrosand helps users discover and connect with travel services, and supports providers in presenting their services digitally.

If a user asks why they should use Afrosand:
Explain the practical benefits clearly, based on whether they are a traveler or service provider.

Afrosand tone:
- Professional
- Warm
- Helpful
- Clear
- Trustworthy
- Premium
`;

const HOTEL_DASHBOARD_KNOWLEDGE = `
Afrosand Hotel / Apartment Provider Dashboard Guide

The dashboard helps hotel and apartment owners manage bookings, rooms, staff, reports, profile settings, and subscriptions.

1. Dashboard / New Bookings
Swahili:
Ili kuona booking mpya au booking zijazo, nenda kwenye Dashboard. Utaona taarifa za bookings mpya pamoja na upcoming bookings.

English:
To view new or upcoming bookings, go to the Dashboard. You will see recent bookings and upcoming reservations.

2. My Property / Edit Hotel or Apartment
Swahili:
Ili kuhariri taarifa za hotel au apartment yako, nenda kwenye My Property. Unaweza kubadilisha location, description, contact details, images, na taarifa nyingine muhimu.

English:
To edit your hotel or apartment details, go to My Property. You can update location, description, contact details, images, and other important information.

3. Rooms & Prices / Add Room
Swahili:
Ili kuongeza chumba kipya, nenda kwenye Rooms & Prices. Chagua property yako, kisha bonyeza Add Room upande wa juu kulia. Weka jina la chumba, bei, idadi ya watu, description, amenities, picha, kisha Save Room.

English:
To add a new room, go to Rooms & Prices. Select your property, then click Add Room at the top right. Enter room name, price, occupancy, description, amenities, images, then click Save Room.

4. Bookings / Create Booking
Swahili:
Ili kufanya booking mpya, nenda kwenye Bookings. Jaza taarifa za mteja, chagua chumba, tarehe ya kuingia na kutoka, kisha bonyeza Register & Allocate.

English:
To create a booking, go to Bookings. Enter customer details, choose a room, select check-in and check-out dates, then click Register & Allocate.

5. Reservations / Confirm Booking
Swahili:
Ili kuthibitisha booking, nenda kwenye Reservations. Chagua booking husika, kisha confirm baada ya kupokea malipo.

English:
To confirm a booking, go to Reservations. Select the reservation, then confirm it once payment has been received.

6. Reservations / Manage Bookings
Swahili:
Kupitia Reservations unaweza kuona bookings zote, kuconfirm, kucancel, au kufuta booking.

English:
Through Reservations, you can view all bookings, confirm, cancel, or delete reservations.

7. Staff / Add or View Staff
Swahili:
Nenda kwenye Staff ili kuongeza wafanyakazi wapya, kuona waliopo, au kuwaondoa kwa urahisi.

English:
Go to Staff to add new employees, view current staff, or remove staff members easily.

8. Reporting / Business Reports
Swahili:
Nenda kwenye Reporting kuona mwenendo wa biashara yako kupitia graph. Pia unaweza kuona na kudownload reports za siku, wiki, mwezi, au mwaka.

English:
Go to Reporting to track business performance through graphs. You can also view and download daily, weekly, monthly, or yearly reports.

9. Notifications
Swahili:
Kwenye Notifications utaona taarifa za bookings mpya, upcoming bookings, na updates nyingine muhimu.

English:
Under Notifications, you can view new bookings, upcoming reservations, and important updates.

10. Settings / Company Profile & Subscription
Swahili:
Nenda kwenye Settings kuupdate profile ya kampuni, kuweka documents mpya au zilizokwisha muda kwenye KYB, na kulipia subscription kupitia Subscription section.

English:
Go to Settings to update your company profile, upload renewed KYB documents, and manage your subscription by choosing a suitable package.
`;

const SALES_KNOWLEDGE = `
You are highly knowledgeable in tourism and hospitality sales.

Key sales expertise:
- increasing bookings
- lead conversion
- follow-up systems
- upselling
- cross-selling
- customer retention
- repeat business
- premium positioning
- closing strategies

Useful sales guidance:
- Hotels should respond quickly to inquiries
- Fast response increases trust and booking chances
- Upsell by offering upgrades, airport pickup, breakfast, tours, or premium rooms
- Tour operators should package experiences clearly and professionally
- Trust, clarity, and speed improve conversion
- Good photos and clear offers improve inquiries
- WhatsApp follow-up can improve sales when done professionally
- Repeat customers are valuable and should be nurtured

If users ask how to increase sales:
Give practical step-by-step advice.

If users ask how to increase bookings:
Suggest better visibility, faster response times, stronger offers, better content, clearer pricing, and improved guest trust.
`;

const MARKETING_KNOWLEDGE = `
You are highly knowledgeable in modern tourism and hospitality marketing.

Marketing expertise includes:
- Instagram marketing
- TikTok marketing
- content strategy
- Google Business Profile
- local SEO
- travel branding
- influencer partnerships
- paid advertising
- short-form video marketing
- storytelling for travel businesses
- trust-building marketing

Useful marketing guidance:
- Hotels should post room visuals, guest experiences, food, location benefits, and trust signals
- Tour operators should showcase experiences, destinations, itineraries, and emotional value
- Travel businesses should use video, before/after content, reviews, and FAQs
- Good branding builds trust
- Consistency matters more than random posting
- Customer testimonials increase conversion
- Clear call-to-actions help turn views into leads
- Strong digital presence improves customer confidence

If users ask about modern marketing:
Give 2026-style practical advice using social media, content, branding, and trust-building.
`;

const HOSPITALITY_KNOWLEDGE = `
You are highly knowledgeable in hotels, hospitality, and guest experience.

Expertise includes:
- guest experience
- room pricing
- service quality
- hotel positioning
- hospitality excellence
- complaint recovery
- review management
- front office quality
- operational professionalism

Useful hospitality guidance:
- Great hospitality is built on speed, warmth, professionalism, and consistency
- Guests remember service quality more than promises
- Hotels should train staff to greet, listen, solve, and follow through
- Reviews matter and should be managed professionally
- Guest complaints should be handled quickly and calmly
- A premium guest experience increases repeat business and referrals
- Small touches can create strong customer loyalty

If users ask how to improve hotel performance:
Address service, visibility, pricing, operations, and customer experience.
`;

const STAFF_KNOWLEDGE = `
You are highly knowledgeable in staff management and service culture.

Expertise includes:
- hiring
- onboarding
- training
- KPIs
- staff discipline
- motivation
- accountability
- hospitality service culture

Useful staff guidance:
- Staff should know service standards clearly
- Training should be practical and repeated
- Good teams need accountability and leadership
- Staff should understand customer expectations
- Motivation grows when expectations and recognition are both clear
- Team culture affects guest experience directly
- Weak staff systems reduce service quality and damage the brand

If users ask about staff problems:
Give practical leadership, training, and systems-based advice.
`;

const TOURISM_ECONOMIC_KNOWLEDGE = `
You are highly knowledgeable in tourism business growth and economic thinking.

Expertise includes:
- tourism trends
- tourism business opportunities
- business growth
- cost control
- profitability
- pricing logic
- business expansion
- competitive advantage
- tourism economics
- investment thinking for hospitality and travel businesses

Useful business and economic guidance:
- Travel businesses should balance growth with operational discipline
- Profit is not only about more sales; it is also about better systems
- Businesses should monitor costs, conversion, and customer value
- Good pricing strategy matters
- Strong service quality improves long-term profit
- Better marketing without operational quality creates weak retention
- Sustainable growth needs both visibility and execution

If users ask about business growth, economics, or profitability:
Answer strategically and practically.
`;

const SYSTEM_PROMPT = `
You are Afrosand Executive Intelligence Advisor in Premium Sales Mode.

${AFROSAND_KNOWLEDGE}

${HOTEL_DASHBOARD_KNOWLEDGE}

${SALES_KNOWLEDGE}

${MARKETING_KNOWLEDGE}

${HOSPITALITY_KNOWLEDGE}

${STAFF_KNOWLEDGE}

${TOURISM_ECONOMIC_KNOWLEDGE}

Always reply in the same language used by the user:
- If the user writes in Kiswahili, reply in fluent, natural, professional Kiswahili.
- If the user writes in English, reply in clear professional English.
- Never switch language unless the user does.

You are not just a chatbot.
You are:
- a tourism strategist
- a hospitality consultant
- a hotel revenue advisor
- a modern sales expert
- a marketing strategist
- a customer experience advisor
- a staff performance coach
- a business growth consultant
- an economic advisor for tourism and hospitality businesses

Your role is to:
- educate
- build trust
- identify needs
- guide the visitor
- help move them toward action
- give useful practical advice
- think like a high-level consultant

Your mission:
- help travelers understand Afrosand
- help service providers see the value of Afrosand
- help users improve their businesses
- help visitors take the next step confidently

Rules:
- Be helpful first
- Sell through value, not pressure
- Answer business and growth questions like a strategic consultant
- If user asks about account-specific issues, say:
"For account-specific assistance, please contact the Afrosand team directly."
- Do not invent fake prices, bookings, statistics, or private account details
- Tone: confident, premium, warm, intelligent, strategic, professional
`;

function getUnavailableReply(message) {
  return /[a-zA-Z]/.test(message || "")
    ? "Sorry, AI is not available right now. Please try again."
    : "Samahani, AI haijapatikana kwa sasa. Tafadhali jaribu tena.";
}

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Afrosand widget backend is live"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Message is required."
      });
    }

    function getHybridFallbackReply(msg) {
      const text = msg.toLowerCase();

      if (text.includes("afrosand ni nini")) {
        return "Afrosand ni jukwaa la kidijitali la usafiri linalowaunganisha wasafiri na watoa huduma wanaoaminika barani Afrika, ikiwemo Hotels & Apartments, Flights, Tours & Safaris, Car Rentals, na Visa Services.";
      }

      if (text.includes("mnatoa huduma gani") || text.includes("huduma gani")) {
        return "Afrosand inahusisha Hotels & Apartments, Flights, Tours & Safaris, Car Rentals, na Visa Services. Pia inasaidia service providers kuongeza visibility, bookings, na ukuaji wa kidijitali.";
      }

      if (text.includes("ninawezaje kujiunga") || text.includes("kujiunga")) {
        return "Unaweza kujiunga na Afrosand kama una hotel, apartment, kampuni ya tours, car rental, au huduma nyingine za usafiri. Afrosand inakusaidia kuongeza visibility, kufikia wateja wengi zaidi, na kukuza biashara yako kidijitali.";
      }

      if (text.includes("afrosand itanisaidiaje")) {
        return "Afrosand inaweza kukusaidia kwa kuongeza visibility ya biashara yako, kuwafikia wateja wengi zaidi, kuboresha digital presence, na kuonesha huduma zako kwa mtindo wa kitaalamu unaojenga trust.";
      }

      if (text.includes("booking mpya") || text.includes("nazionaje booking") || text.includes("booking zijazo")) {
        return "Ili kuona booking mpya au booking zijazo, nenda kwenye Dashboard. Utaona taarifa za bookings mpya pamoja na upcoming bookings.";
      }

      if (text.includes("my property") || text.includes("kuedit hotel") || text.includes("kuhariri hotel") || text.includes("kuhariri apartment")) {
        return "Ili kuhariri taarifa za hotel au apartment yako, nenda kwenye My Property. Unaweza kubadilisha location, maelezo, taarifa za mawasiliano, picha, na taarifa nyingine muhimu.";
      }

      if (text.includes("ongeza chumba") || text.includes("naongeza chumba") || text.includes("rooms & prices") || text.includes("add room")) {
        return "Ili kuongeza chumba kipya, nenda kwenye Rooms & Prices, chagua property yako, kisha bonyeza Add Room upande wa juu kulia. Weka jina la chumba, bei, idadi ya watu, maelezo, amenities, picha, kisha Save Room.";
      }

      if (text.includes("booking") && text.includes("fanya")) {
        return "Ili kufanya booking mpya, nenda kwenye Bookings. Jaza taarifa za mteja, chagua chumba, weka tarehe ya kuingia na kutoka, kisha bonyeza Register & Allocate.";
      }

      if (text.includes("confirm booking") || text.includes("kuthibitisha booking") || text.includes("reservation")) {
        return "Ili kuthibitisha booking, nenda kwenye Reservations. Chagua booking husika, kisha confirm baada ya kupokea malipo. Pia unaweza kuview, kucancel, au kufuta reservation hapo.";
      }

      if (text.includes("staff") || text.includes("wafanyakazi")) {
        return "Nenda kwenye Staff ili kuongeza wafanyakazi wapya, kuona waliopo, kuwa-assign, au kuwaondoa kwa urahisi.";
      }

      if (text.includes("report") || text.includes("reporting")) {
        return "Nenda kwenye Reporting ili kuona graphs za mwenendo wa biashara yako. Pia unaweza kuona na kudownload reports za siku, wiki, mwezi, au mwaka.";
      }

      if (text.includes("notification") || text.includes("notifications")) {
        return "Kwenye Notifications utaona taarifa za bookings mpya, bookings zijazo, na updates nyingine muhimu.";
      }

      if (text.includes("settings") || text.includes("subscription") || text.includes("kyb")) {
        return "Nenda kwenye Settings kuupdate profile ya kampuni, kuweka documents mpya au zilizokwisha muda kwenye KYB, na kulipia subscription kupitia Subscription section kwa kuchagua package inayokufaa.";
      }

      if (text.includes("ongeza bookings") || text.includes("ongeza mauzo")) {
        return "Ili kuongeza bookings na mauzo, hakikisha una profile nzuri, picha bora, response ya haraka kwa wateja, maelezo yanayoeleweka, reviews nzuri, na marketing ya kisasa kupitia social media na trust-building content. Afrosand pia inaweza kusaidia kuongeza visibility ya biashara yako.";
      }

      if (text.includes("marketing") || text.includes("masoko")) {
        return "Marketing ya kisasa kwa hotel, apartment, au tour business inahitaji video fupi, picha nzuri, reviews, Google Business Profile, Instagram/TikTok consistency, na clear call-to-action. Content inapaswa kujenga trust na kuonesha thamani ya huduma zako.";
      }

      if (text.includes("staff hawafanyi vizuri") || text.includes("staff hawana morale") || text.includes("staff management")) {
        return "Kuboresha staff kunahitaji expectations wazi, training ya vitendo, accountability, na recognition. Timu yenye nidhamu na service culture nzuri huongeza customer satisfaction na repeat business.";
      }

      if (text.includes("customer service") || text.includes("customer experience")) {
        return "Customer service nzuri inahitaji speed, professionalism, warmth, na consistency. Customer experience bora hujengwa kwa communication nzuri, complaint handling ya haraka, na huduma yenye kujali mteja.";
      }

      if (text.includes("faida") || text.includes("profit") || text.includes("gharama")) {
        return "Ukuaji wa faida unatokana na kuongeza bookings, kuboresha conversion, kudhibiti gharama, na kuboresha service quality. Biashara za tourism zinahitaji balance kati ya visibility, operations, na profitability.";
      }

      if (text.includes("tour") || text.includes("safari")) {
        return "Kwa biashara ya tours na safaris, mafanikio yanategemea package wazi, picha na video nzuri, itinerary inayovutia, response ya haraka, reviews, na branding inayoonesha trust na experience halisi.";
      }

      if (text.includes("car rental") || text.includes("kukodisha gari")) {
        return "Kwa car rental, ni muhimu kuonesha magari kwa picha nzuri, bei zilizo wazi, masharti yanayoeleweka, na mawasiliano ya haraka. Visibility na trust ni vitu muhimu sana.";
      }

      if (text.includes("visa")) {
        return "Afrosand pia inahusisha Visa Services. Unaweza kuelekeza users kupata msaada wa visa kupitia huduma zinazopatikana kwenye jukwaa.";
      }

      if (text.includes("what is afrosand")) {
        return "Afrosand is a digital travel platform that connects travelers with trusted service providers across Africa, including Hotels & Apartments, Flights, Tours & Safaris, Car Rentals, and Visa Services.";
      }

      if (text.includes("what services") || text.includes("services do you offer")) {
        return "Afrosand supports Hotels & Apartments, Flights, Tours & Safaris, Car Rentals, and Visa Services. It also helps service providers improve visibility, attract customers, and grow digitally.";
      }

      if (text.includes("how can i join") || text.includes("join as a provider")) {
        return "You can join Afrosand as a provider if you run a hotel, apartment, tour business, car rental business, or another travel-related service. Afrosand helps providers gain visibility, attract customers, and grow digitally.";
      }

      if (text.includes("why should i use afrosand")) {
        return "Afrosand helps travelers access trusted travel services more easily, and helps service providers improve visibility, digital presence, and business growth.";
      }

      if (text.includes("how can afrosand help my hotel grow")) {
        return "Afrosand can help your hotel grow by increasing visibility, improving digital presence, helping more customers discover your property, and supporting a stronger professional presentation of your services.";
      }

      if (text.includes("new bookings") || text.includes("upcoming bookings")) {
        return "To view new or upcoming bookings, go to the Dashboard. You will find recent bookings and upcoming reservations there.";
      }

      if (text.includes("edit my property") || text.includes("my property")) {
        return "To edit your hotel or apartment details, go to My Property. You can update location, description, contact details, images, and other important information.";
      }

      if (text.includes("add room") || text.includes("rooms & prices")) {
        return "To add a room, go to Rooms & Prices, select your property, click Add Room at the top right, then enter room details, pricing, amenities, images, and save.";
      }

      if (text.includes("create booking") || text.includes("make booking")) {
        return "To create a booking, go to Bookings. Enter customer details, choose a room, select check-in and check-out dates, then click Register & Allocate.";
      }

      if (text.includes("confirm booking") || text.includes("confirm reservation") || text.includes("reservations")) {
        return "Go to Reservations to view bookings, confirm them after payment is received, cancel, or delete reservations.";
      }

      if (text.includes("staff")) {
        return "Use the Staff section to add new employees, view current staff, assign them, or remove them easily.";
      }

      if (text.includes("report") || text.includes("reporting")) {
        return "Go to Reporting to view business performance graphs and download daily, weekly, monthly, or yearly reports.";
      }

      if (text.includes("notifications")) {
        return "Under Notifications, you can view new bookings, upcoming reservations, and important updates.";
      }

      if (text.includes("settings") || text.includes("subscription") || text.includes("kyb")) {
        return "Go to Settings to update your company profile, upload renewed KYB documents, and manage your subscription by choosing a suitable package.";
      }

      if (text.includes("increase bookings") || text.includes("increase sales")) {
        return "To increase bookings and sales, improve your profile quality, use strong visuals, respond quickly to inquiries, present clear offers, build trust with reviews, and apply modern digital marketing consistently.";
      }

      if (text.includes("marketing strategy") || text.includes("modern marketing")) {
        return "A modern marketing strategy for hospitality or tourism businesses should include strong visuals, short-form video, customer reviews, trust-building content, Google presence, clear offers, and consistent social media activity.";
      }

      if (text.includes("customer service") || text.includes("customer experience")) {
        return "Strong customer service depends on speed, warmth, professionalism, and consistency. Great customer experience improves reviews, repeat business, and referrals.";
      }

      if (text.includes("profit") || text.includes("cost") || text.includes("business growth")) {
        return "Business growth in tourism and hospitality depends on balancing visibility, service quality, conversion, and cost control. Better systems often improve profit more sustainably than price cutting.";
      }

      if (text.includes("tour") || text.includes("safari")) {
        return "For tours and safaris, success depends on clear packages, strong visuals, attractive itineraries, fast response times, good reviews, and trust-building branding.";
      }

      if (text.includes("car rental")) {
        return "For car rental businesses, it is important to show vehicles clearly, keep pricing transparent, explain terms simply, and respond quickly to customers.";
      }

      if (text.includes("visa")) {
        return "Afrosand also includes Visa Services, helping users access support related to travel documentation needs through available services on the platform.";
      }

      return /[a-zA-Z]/.test(msg)
        ? "Afrosand helps travelers access trusted travel services and helps providers grow visibility, bookings, and digital presence. Are you asking as a traveler or as a service provider?"
        : "Afrosand inasaidia wasafiri kupata huduma za usafiri zinazoaminika, na pia inasaidia service providers kuongeza visibility, bookings, na ukuaji wa kidijitali. Je, unauliza kama traveler au kama service provider?";
    }

    const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
    const keys = getGeminiKeys();

    if (keys.length === 0) {
      return res.json({
        reply: getUnavailableReply(message)
      });
    }

    async function tryModel(apiKey, modelName, retries = 2, delay = 1500) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\nUser message: ${message}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (response.ok && !data.error) {
        return data;
      }

      const errorMessage =
        data?.error?.message || data?.message || "Unknown Gemini API error";

      console.error(`Gemini error from ${modelName}:`, JSON.stringify(data, null, 2));

      const temporaryError =
        response.status === 429 ||
        response.status === 500 ||
        response.status === 503 ||
        /high demand|overloaded|temporar|quota|exceeded|depleted/i.test(errorMessage);

      if (temporaryError && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return tryModel(apiKey, modelName, retries - 1, delay * 2);
      }

      throw new Error(`${modelName}: ${errorMessage}`);
    }

    let data = null;
    let lastError = null;

    outerLoop:
    for (const apiKey of keys) {
      for (const model of models) {
        try {
          data = await tryModel(apiKey, model, 2, 1500);
          if (data) break outerLoop;
        } catch (err) {
          lastError = err;
          console.log("Rotation skip:", err.message);
        }
      }
    }

    if (!data) {
      console.error("All keys/models failed.", lastError);
      return res.json({
        reply: getUnavailableReply(message)
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join(" ")
        .trim() ||
      getHybridFallbackReply(message);

    return res.json({ reply });

  } catch (error) {
    console.error("Chat error full:", error);

    return res.json({
      reply: getUnavailableReply(req.body.message || "")
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Afrosand backend running on ${PORT}`);
});
