import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase clients
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const supabasePublic = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Storage bucket name
const BUCKET_NAME = 'make-dff980ef-media';

// Initialize storage bucket
async function initBucket() {
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      const { error } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 52428800, // 50MB
      });
      if (error) {
        console.log(`Bucket creation warning: ${error.message}`);
      } else {
        console.log(`Bucket ${BUCKET_NAME} created successfully`);
      }
    }
  } catch (error) {
    console.log(`Error initializing bucket: ${error.message}`);
  }
}

// Initialize bucket on startup
initBucket();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Middleware to verify admin access
async function verifyAdmin(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!accessToken) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }
  
  // Store user in context
  c.set('user', user);
  await next();
}

// Health check endpoint
app.get("/make-server-dff980ef/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= AUTH ROUTES =============

// Sign up endpoint
app.post("/make-server-dff980ef/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ user: data.user, message: 'User created successfully' });
  } catch (error) {
    console.log(`Sign up error: ${error.message}`);
    return c.json({ error: 'Sign up failed' }, 500);
  }
});

// ============= CONTENT MANAGEMENT ROUTES =============

// Get hero content
app.get("/make-server-dff980ef/content/hero", async (c) => {
  try {
    const hero = await kv.get('content:hero');
    return c.json({ data: hero || getDefaultHeroContent() });
  } catch (error) {
    console.log(`Get hero content error: ${error.message}`);
    return c.json({ error: 'Failed to fetch hero content' }, 500);
  }
});

// Update hero content (admin only)
app.put("/make-server-dff980ef/content/hero", verifyAdmin, async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('content:hero', body);
    return c.json({ message: 'Hero content updated successfully', data: body });
  } catch (error) {
    console.log(`Update hero content error: ${error.message}`);
    return c.json({ error: 'Failed to update hero content' }, 500);
  }
});

// Get all impact stats
app.get("/make-server-dff980ef/content/impact-stats", async (c) => {
  try {
    const stats = await kv.getByPrefix('stat:');
    return c.json({ data: stats.length > 0 ? stats : getDefaultImpactStats() });
  } catch (error) {
    console.log(`Get impact stats error: ${error.message}`);
    return c.json({ error: 'Failed to fetch impact stats' }, 500);
  }
});

// Update impact stats (admin only)
app.put("/make-server-dff980ef/content/impact-stats", verifyAdmin, async (c) => {
  try {
    const body = await c.req.json();
    const { stats } = body;
    
    if (!Array.isArray(stats)) {
      return c.json({ error: 'Stats must be an array' }, 400);
    }
    
    // Delete old stats
    const oldStats = await kv.getByPrefix('stat:');
    await kv.mdel(oldStats.map(s => s.key));
    
    // Save new stats
    const keys = stats.map((_, i) => `stat:${i}`);
    await kv.mset(keys, stats);
    
    return c.json({ message: 'Impact stats updated successfully', data: stats });
  } catch (error) {
    console.log(`Update impact stats error: ${error.message}`);
    return c.json({ error: 'Failed to update impact stats' }, 500);
  }
});

// Get all impact stories
app.get("/make-server-dff980ef/content/impact-stories", async (c) => {
  try {
    const stories = await kv.getByPrefix('story:');
    return c.json({ data: stories.length > 0 ? stories : getDefaultImpactStories() });
  } catch (error) {
    console.log(`Get impact stories error: ${error.message}`);
    return c.json({ error: 'Failed to fetch impact stories' }, 500);
  }
});

// Update impact stories (admin only)
app.put("/make-server-dff980ef/content/impact-stories", verifyAdmin, async (c) => {
  try {
    const body = await c.req.json();
    const { stories } = body;
    
    if (!Array.isArray(stories)) {
      return c.json({ error: 'Stories must be an array' }, 400);
    }
    
    // Delete old stories
    const oldStories = await kv.getByPrefix('story:');
    await kv.mdel(oldStories.map(s => s.key));
    
    // Save new stories
    const keys = stories.map((_, i) => `story:${i}`);
    await kv.mset(keys, stories);
    
    return c.json({ message: 'Impact stories updated successfully', data: stories });
  } catch (error) {
    console.log(`Update impact stories error: ${error.message}`);
    return c.json({ error: 'Failed to update impact stories' }, 500);
  }
});

// ============= MEDIA UPLOAD ROUTES =============

// Upload media file (admin only)
app.post("/make-server-dff980ef/media/upload", verifyAdmin, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: false
      });
    
    if (uploadError) {
      console.log(`Upload error: ${uploadError.message}`);
      return c.json({ error: uploadError.message }, 500);
    }
    
    // Get signed URL
    const { data: signedData, error: signedError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 31536000); // 1 year expiry
    
    if (signedError) {
      console.log(`Signed URL error: ${signedError.message}`);
      return c.json({ error: signedError.message }, 500);
    }
    
    return c.json({ 
      message: 'File uploaded successfully',
      url: signedData.signedUrl,
      path: filePath
    });
  } catch (error) {
    console.log(`Media upload error: ${error.message}`);
    return c.json({ error: 'Failed to upload media' }, 500);
  }
});

// Get signed URL for media (admin only)
app.post("/make-server-dff980ef/media/signed-url", verifyAdmin, async (c) => {
  try {
    const body = await c.req.json();
    const { path } = body;
    
    if (!path) {
      return c.json({ error: 'Path is required' }, 400);
    }
    
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUrl(path, 31536000); // 1 year expiry
    
    if (error) {
      console.log(`Signed URL error: ${error.message}`);
      return c.json({ error: error.message }, 500);
    }
    
    return c.json({ url: data.signedUrl });
  } catch (error) {
    console.log(`Get signed URL error: ${error.message}`);
    return c.json({ error: 'Failed to get signed URL' }, 500);
  }
});

// ============= CONTACT FORM ROUTES =============

// Submit contact form
app.post("/make-server-dff980ef/contact/submit", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, message } = body;
    
    if (!name || !email || !message) {
      return c.json({ error: 'Name, email, and message are required' }, 400);
    }
    
    const contactId = `contact:${Date.now()}:${crypto.randomUUID()}`;
    const contact = {
      id: contactId,
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    await kv.set(contactId, contact);
    
    return c.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.log(`Contact form submission error: ${error.message}`);
    return c.json({ error: 'Failed to submit contact form' }, 500);
  }
});

// Get all contact submissions (admin only)
app.get("/make-server-dff980ef/contact/all", verifyAdmin, async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact:');
    // Sort by timestamp (newest first)
    contacts.sort((a, b) => new Date(b.value.timestamp) - new Date(a.value.timestamp));
    return c.json({ data: contacts });
  } catch (error) {
    console.log(`Get contacts error: ${error.message}`);
    return c.json({ error: 'Failed to fetch contacts' }, 500);
  }
});

// ============= NEWSLETTER ROUTES =============

// Subscribe to newsletter
app.post("/make-server-dff980ef/newsletter/subscribe", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;
    
    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }
    
    // Check if already subscribed
    const existingKey = `newsletter:${email}`;
    const existing = await kv.get(existingKey);
    
    if (existing) {
      return c.json({ message: 'Email already subscribed' });
    }
    
    const subscription = {
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };
    
    await kv.set(existingKey, subscription);
    
    return c.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.log(`Newsletter subscription error: ${error.message}`);
    return c.json({ error: 'Failed to subscribe to newsletter' }, 500);
  }
});

// Get all newsletter subscribers (admin only)
app.get("/make-server-dff980ef/newsletter/subscribers", verifyAdmin, async (c) => {
  try {
    const subscribers = await kv.getByPrefix('newsletter:');
    return c.json({ data: subscribers, count: subscribers.length });
  } catch (error) {
    console.log(`Get subscribers error: ${error.message}`);
    return c.json({ error: 'Failed to fetch subscribers' }, 500);
  }
});

// ============= DEFAULT CONTENT FUNCTIONS =============

function getDefaultHeroContent() {
  return {
    badge: "Transforming Lives Since 2009",
    title: "Serving Hope To",
    highlightText: "Rural Communities",
    subtitle: "of India",
    description: "Empowering vulnerable communities through education, healthcare, and sustainable development. Together, we're building a brighter future.",
    mainImage: "https://images.unsplash.com/photo-1759738098462-90ffac98c554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBydXJhbCUyMGRldmVsb3BtZW50JTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjcxMjI5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    backgroundImage: "https://images.unsplash.com/photo-1761365361648-3968a6b588a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMEluZGlhbiUyMGNoaWxkcmVuJTIwcGxheWluZyUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyNzEyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  };
}

function getDefaultImpactStats() {
  return [
    { id: 1, number: "2,500+", label: "Volunteers", icon: "users" },
    { id: 2, number: "50,000+", label: "Lives Impacted", icon: "heart" },
    { id: 3, number: "15+", label: "Years Service", icon: "trending" },
    { id: 4, number: "62", label: "Communities Served", icon: "home" },
    { id: 5, number: "150+", label: "Active Projects", icon: "briefcase" },
    { id: 6, number: "1,000+", label: "Children Educated", icon: "book" },
    { id: 7, number: "500+", label: "Women Empowered", icon: "award" },
    { id: 8, number: "200+", label: "Health Camps", icon: "activity" },
    { id: 9, number: "75+", label: "Villages Reached", icon: "map" },
    { id: 10, number: "300+", label: "Skill Training Programs", icon: "target" },
    { id: 11, number: "100%", label: "Transparency", icon: "shield" }
  ];
}

function getDefaultImpactStories() {
  return [
    {
      id: 1,
      title: "Education Transforms Villages",
      description: "Through our literacy programs, we've helped over 1,000 children gain access to quality education in remote areas.",
      image: "https://images.unsplash.com/photo-1497375628663-0401985f6df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzI3MTIyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Education",
      impact: "1,000+ Children"
    },
    {
      id: 2,
      title: "Healthcare for All",
      description: "Our mobile health clinics have provided medical care to thousands of families in underserved communities.",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBoZWFsdGhjYXJlJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjcxMjI5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Healthcare",
      impact: "200+ Health Camps"
    },
    {
      id: 3,
      title: "Women Empowerment",
      description: "Skill training programs have enabled 500+ women to achieve financial independence and support their families.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21lbiUyMGVtcG93ZXJtZW50fGVufDF8fHx8MTc3MjcxMjI5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Empowerment",
      impact: "500+ Women"
    }
  ];
}

Deno.serve(app.fetch);